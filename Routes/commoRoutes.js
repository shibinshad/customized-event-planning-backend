const express=require('express');
// eslint-disable-next-line new-cap
const route=express.Router();
const common=require('../controller/userController/common_Controller');


route.post('/signup', common.signup);
route.post('/verify-otp', common.verifyotp);
route.post('/login', common.login);


module.exports=route;

