if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

//requiring libraries
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

//require models
const User = require('./models/user')
const Product = require('./models/product')
const Order = require('./models/order')

//require middleware
const { isLoggedIn } = require('./middleware');
const { isAdmin } = require('./middleware')

const port = process.env.NODE_ENV != "production" ? 3000 : 8888;

//initialize express
const app = express();

//initialize mongodb
const dbURL = process.env.DB_URL
console.log('db url is: ', dbURL)
async function main() {
    await mongoose.connect(dbURL)
}

main()
    .then(() => {
        console.log('database connected')
    })
    .catch((err) => {
        console.log('failed to connect')
        console.log(err)
    })

//configuring mongostore for sessions
const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: {
        secret: process.env.SECRET
    }
})

//defining sessionConfig
const sessionConfig = {
    store: store, //storing session info
    secret: process.env.SECRET, //required parameter
    name: process.env.SESSION_NAME, //this is to change the default connectsid, so people cannot see what is the session name on the console. 
    resave: false, //set to false if we are not using session.touch()
    saveUninitialized: true, //set to true if want to track session id
    cookie: {
        httpOnly: process.env.NODE_ENV != "production" ? false : true,
        secure: process.env.NODE_ENV != "production" ? false : true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7), //session save for 1 week.
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite:'none'
    }
}

//defining uses
app.set('trust proxy', 1); //for reverse proxy hosts
app.use(session(sessionConfig));
app.use(express.json());

//initialize passport 
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//setting up cors
app.use(cors({
    origin: process.env.NODE_ENV != "production" ? true : process.env.FRONT_END,
    credentials: true //to persist session when using different domains 
}))


//Product Routes
app.get('/productDetail', isLoggedIn, async (req, res) => {
    const products = await Product.find({})
    const statusCode = res.statusCode
    const userDetails = req.user
    res.json({ code: statusCode, products, userDetails })
})


//User Routes 
app.post('/register', async (req, res) => {
    try {
        const { username, password, email, firstName, lastName } = req.body.formData
        const newUser = await new User({ username, email, firstName, lastName, isAdmin: false })
        await User.register(newUser, password)
        res.json('success')
    } catch (e) {
        res.json(e)
    }
})

app.post('/login', passport.authenticate('local'), async (req, res) => {
    res.json('success')
})

app.post('/logout', (req, res) => {
    req.session.destroy()
    console.log('logged out')
})

app.get('/currentuser', isLoggedIn, (req, res) => {
    const currentUser = req.user
    const statusCode = res.statusCode
    res.json({ currentUser, statusCode })
})

//cart Route
app.post('/addcart', async (req, res) => {
    const { quantity, product, totalPrice } = { ...req.body.cartItem };
    const lineItems = { productId: product._id, quantity, productName: product.name, productPrice: product.price, totalPrice };
    console.log(req.user._id)
    const userid = req.user._id;
    const foundUser = await User.findById(userid);
    foundUser.cart.push(lineItems);
    await User.findByIdAndUpdate(userid, { ...foundUser })
})

//order Route
app.post('/checkout', isLoggedIn, async (req, res) => {
    const { lineItems, user } = req.body.order
    const newOrder = new Order({ lineItems, user, fulfilled:false})
    const savedOrder = await newOrder.save()
    let userData = await User.findById(user)
    userData.cart = []
    await userData.save()
    lineItems.map(async (item) => {
        const itemId = item.productId;
        const foundProduct = await Product.findById(itemId)
        foundProduct.stock = foundProduct.stock - item.quantity
        await foundProduct.save()
    })
    res.json(savedOrder._id)
})

//Admin Route
app.get('/adminboard', isLoggedIn, isAdmin, async (req, res) => {
    const orderList = await Order.find({})
    console.log(orderList)
    res.json({ user: req.user, statusCode: res.statusCode, order: orderList })
})

//Default Route

app.get('/', (req, res) => {
    res.send('hello')
})


app.listen(port, () => {
    console.log(`running on port ${port}`)
})