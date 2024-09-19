const express = require('express')
const router = express.Router()
const { isLoggedIn, isAdmin } = require('../middleware')
const User = require('../models/user')
const Product = require('../models/product')

//Product Routes
router.get('/productDetail', isLoggedIn, async (req, res) => {
    const products = await Product.find({})
    const statusCode = res.statusCode
    const user = req.user
    const userDetails = await User.findById(user)
    res.json({ code: statusCode, products, userDetails })
})

router.post('/updateStock', isLoggedIn, isAdmin, async (req, res) => {
    const product = req.body.product
    await Product.findByIdAndUpdate(product._id, { ...product })
})

router.post('/addnew', isLoggedIn, isAdmin, async (req, res) => {
    const { name, price, stock, image } = req.body.newProduct
    const newProduct = await new Product({ name: name, price: parseFloat(price), stock: parseInt(stock), image: image })
    await newProduct.save()
})

router.delete('/deleteproduct', isLoggedIn, isAdmin, async (req, res) => {
    const deleteProduct = req.body.product
    await Product.findByIdAndDelete(deleteProduct)
})

module.exports = router