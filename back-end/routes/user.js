const express = require('express')
const router = express.Router()
const {isLoggedIn, isAdmin} = require('../middleware')
const passport = require('passport');
const User = require('../models/user')



//User Routes 
router.post('/register', async (req, res) => {
    try {
        const { username, password, firstName, lastName } = req.body.formData
        const newUser = await new User({ username, firstName, lastName, isAdmin: false })
        const registereduser = await User.register(newUser, password)
        res.json('success')
    } catch (e) {
        res.status(e.statusCode || 500).json({message:e.message}); //raise this so that front end can catch it as an error
    }
})

router.post('/login', passport.authenticate('local'), async (req, res) => {
    res.json('success')
})

router.post('/logout', (req, res, next) => {
    if (req.sessionID) {
        req.logout(function (err) {
            if (err) { return next(err) }
        })
    }
})

router.get('/currentuser', isLoggedIn, (req, res) => {
    const currentUser = req.user
    const statusCode = res.statusCode
    res.json({ currentUser, statusCode })
})

module.exports = router;