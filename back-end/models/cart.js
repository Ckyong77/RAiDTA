const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('./product')

const cartSchema = new Schema({
    totalCost: Number,
    lineItems: Array,
    user: {
        type:Schema.Types.ObjectId, 
        ref:'User'
    }
})


module.exports = mongoose.model('Cart', cartSchema)