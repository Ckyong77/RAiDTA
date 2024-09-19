const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    lineItems: Array,
    fulfilled: Boolean,
    date: String,
    user: {
        type:Schema.Types.ObjectId, 
        ref:'User'
    }
})


module.exports = mongoose.model('Order', orderSchema)