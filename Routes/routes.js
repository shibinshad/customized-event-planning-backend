const express=require('express')
const route=express.Router()
const {signup}=require('../controller/userController/signupController')

route.post('/signup',signup)


module.exports=route;

