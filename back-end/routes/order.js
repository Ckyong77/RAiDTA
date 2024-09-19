const express = require('express')
const router = express.Router()
const { isLoggedIn, isAdmin } = require('../middleware')
const User = require('../models/user')
const Order = require('../models/order')
const Product = require('../models/product')
const addOnCart = require('../utils/addOnCart')


router.post('/addcart', async (req, res) => {
    const { quantity, product, totalPrice } = { ...req.body.cartItem };
    const cartItemDetails = { productId: product._id, quantity, productName: product.name, productPrice: product.price, totalPrice };
    const userid = req.body.currentUser
    const foundUser = await User.findById(userid);
    let userCart = foundUser.cart
    userCart = addOnCart(userCart, cartItemDetails)
    await User.findByIdAndUpdate(userid, { ...foundUser });
})

router.delete('/deleteCartItem', isLoggedIn, async (req, res) => {
    const productId = req.body.cartItem
    const currentUserId = req.body.currentUser
    const foundUser = await User.findById(currentUserId)
    const cart = foundUser.cart
    const filteredCart = cart.filter((eachCartLine) => eachCartLine.productId != productId)
    foundUser.cart = filteredCart
    await foundUser.save()
    res.json(foundUser.cart)
})


router.post('/checkout', isLoggedIn, async (req, res) => {
    const { lineItems, user } = req.body.order
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    const currentDate = new Date().toLocaleDateString(undefined, dateOptions);
    const newOrder = new Order({ lineItems, user, fulfilled: false, date: currentDate })
    const savedOrder = await newOrder.save()
    let userData = await User.findById(user)
    userData.cart = []
    await userData.save()
    lineItems.map(async (item) => {
        const itemId = item.productId;
        const foundProduct = await Product.findById(itemId)
        foundProduct.stock = (foundProduct.stock - item.quantity) <= 0 ? 0 : (foundProduct.stock - item.quantity)
        await foundProduct.save()
    })
    res.json(savedOrder._id)
})

router.post('/reorder', isLoggedIn, async (req, res) => {
    const orderId = req.body.orderId
    const foundOrder = await Order.findById(orderId)
    const foundUser = await User.findById(foundOrder.user)
    let lineItems = foundOrder.lineItems
    lineItems.map((item) => {
        let userCart = foundUser.cart
        addOnCart(userCart, item)
    })
    await User.findByIdAndUpdate(foundUser._id, foundUser)
})

router.post('/orderfulfil', isLoggedIn, isAdmin, async (req, res) => {
    const { orderId, fulfilled } = req.body;
    const foundOrder = await Order.findById(orderId)
    foundOrder.fulfilled = fulfilled
    await foundOrder.save()
    res.json(foundOrder)
})

//Admin Route
router.get('/adminboard', isLoggedIn, isAdmin, async (req, res) => {
    const orderList = await Order.find({})
    res.json({ user: req.user, statusCode: res.statusCode, order: orderList })
})

//Customer Route
router.get('/customerBoard', isLoggedIn, async (req, res) => {
    const currentUser = req.user._id
    const cusOrder = await Order.find({ user: currentUser })
    res.json({ statusCode: res.statusCode, order: cusOrder })
})

module.exports = router