const express = require('express');
// eslint-disable-next-line new-cap
const route = express.Router();
const upload = require('../middleware/multer');
const agency = require('../controller/agencyController/agencyContoller');


route.post('/catering', upload.single('image'), agency.cateringForm);
route.post('/Decoration', upload.single('image'), agency.DecorationForm);
route.post('/Location', upload.single('image'), agency.locationForm);
route.post('/MediaForm', upload.single('image'), agency.mediaForm);
route.delete('/deleteService/:id', agency.deleteService);
route.get('/getFormDetails/:id', agency.getDetails);

module.exports = route;


