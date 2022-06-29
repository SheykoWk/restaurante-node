const router = require('express').Router();
const userHttpHandler = require('./user.http')
const passport = require('passport');
require('../tools/auth')(passport)


router.route('/')
    .get(
         //passport.authenticate('jwt', {session: false}) ,
         userHttpHandler.getAllUsers)



module.exports = {
    router
}