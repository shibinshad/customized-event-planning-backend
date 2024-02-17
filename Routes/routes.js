const express=require('express')
const route=express.Router()
const user=require('../controller/userController/signupController')

route.post('/signup', user.signup)
route.post('/verify-otp',user.verifyotp)


module.exports=route;

