const express=require('express');
// eslint-disable-next-line new-cap
const route=express.Router();
const user=require('../controller/userController/user_controller');
route.post('/profile', user.updateProfile);
module.exports=route;
