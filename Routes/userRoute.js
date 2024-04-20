const express = require('express');
// eslint-disable-next-line new-cap
const route = express.Router();
const user = require('../controller/userController/user_controller');
const upload = require('../middleware/multer');
const userid = require('../middleware/GetUserId');

route.post('/profile', userid, upload.single('avatar'), user.updateProfile);
route.get('/showProfile', userid, user.show);
route.get('/locations', userid, user.getLocations);
route.get('/catering', userid, user.getcatering);
route.get('/media', userid, user.getmedia);
route.get('/decorations', userid, user.getdecorations);
route.post('/addToCart', userid, user.addToCart);
route.get('/orders', userid, user.orders);

module.exports = route;

