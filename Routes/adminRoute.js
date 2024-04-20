const express = require('express');
// eslint-disable-next-line new-cap
const route = express.Router();
// const upload = require('../middleware/multer');
const admin = require('../controller/adminController/adminController');

route.get('/usersList', admin.getUsers);
route.get('/agencyList', admin.getAgency);
route.get('/getPending', admin.getPending);
route.patch('/block', admin.blockUser);
route.delete('/RemoveUser/:id', admin.RemoveUser);
route.patch('/approveUser', admin.approveUser);


module.exports=route;
