const express=require('express')
const route=express.Router()
const common=require('../controller/userController/common_Controller')
const user=require('../controller/userController/user_controller')

route.post('/signup', common.signup)
route.post('/verify-otp',common.verifyotp)
route.post('/profile',user.updateProfile)


module.exports=route;

