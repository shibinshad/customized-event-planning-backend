const express = require('express');
// eslint-disable-next-line new-cap
const route = express.Router();
// const upload = require('../middleware/multer');
const admin = require('../controller/adminController/adminController');

route.get('/usersList', admin.getUsers);
route.get('/agencyList', admin.getAgency);
route.patch('/block', admin.blockUser);
route.delete('/RemoveUser/:id', admin.RemoveUser);


module.exports=route;
