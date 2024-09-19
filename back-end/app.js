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

//require Routes
const userRoutes = require('./routes/user')
const orderRoutes = require('./routes/order')
const productRoutes = require('./routes/product')

const port = process.env.NODE_ENV != "production" ? 3000 : 8888;

//initialize express
const app = express();

//initialize mongodb
const dbURL = process.env.NODE_ENV != "production" ? "mongodb://localhost:27017/RAiDTA" : process.env.DB_URL
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
        sameSite: process.env.NODE_ENV != "production" ? false : 'none'
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


//Routes middleware
app.use('/', userRoutes)
app.use('/', orderRoutes)
app.use('/', productRoutes)

const addOnCart = (userCart, item) => {
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


//polling route
app.get('/stayawake', (req, res) => {
    res.send('awake?')
})

//Default Route

app.get('/', (req, res) => {
    res.send('hello')
})


app.listen(port, () => {
    console.log(`running on port ${port}`)
})