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
        await User.register(newUser, password)
        res.json('Registered')
    } catch (e) {
        res.json(e)
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