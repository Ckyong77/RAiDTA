module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(206)
    }
    next()
}

module.exports.isAdmin = (req, res, next) => {
    if (req.user) {
        if (!req.user.isAdmin) {
            res.status(401)
        }
    }
    next()
}