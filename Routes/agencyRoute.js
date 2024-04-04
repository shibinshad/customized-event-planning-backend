const express = require('express');
// eslint-disable-next-line new-cap
const route = express.Router();
const upload = require('../middleware/multer');
const agency = require('../controller/agencyController/agencyContoller');
const userId = require('../middleware/GetUserId');

route.post('/catering', upload.single('image'), agency.cateringForm);
route.post('/Decoration', upload.single('image'), agency.DecorationForm);
route.post('/Location', upload.single('image'), agency.locationForm);
route.post('/MediaForm', upload.single('image'), agency.mediaForm);
route.patch('/updateMediaForm/:id', upload.single('image'), agency.updateMedia);
route.delete('/deleteService/:id', agency.deleteService);
route.get('/getFormDetails/:id', agency.getDetails);
route.post('/profile', userId, upload.single('avatar'), agency.addProfile);
route.get('/agencyProfile', userId, agency.getProfile);
route.patch(
    '/updateProfile',
    userId,
    upload.single('avatar'),
    agency.updateProfile,
);

module.exports = route;
