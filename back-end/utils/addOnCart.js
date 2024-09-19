module.exports = (userCart, item) => {
    if (userCart.length > 0) {
        let available = false;
        for (let cartItem of userCart) {
            if (cartItem.productId === item.productId) {
                available = true
                cartItem.quantity = cartItem.quantity + item.quantity
                cartItem.totalPrice = cartItem.totalPrice + item.totalPrice
                break
            }
        }
        if (!available) {
            return userCart.push(item)
        }
    } else {
        return userCart.push(item)
    }
}