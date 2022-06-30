//! Auth
// todo
// ? /auth/login
// ? /auth/signin
// ? /auth/reset-password
// ? /auth/verify-account
// ? /auth/deactived-account
const router = require('express').Router()
const authHttpHandler = require('./auth.http')

router.route('/login')
    .post(authHttpHandler.loginUser)


module.exports = {
    router
}



