const mongoose = require('mongoose');
const services = new mongoose.Schema({
  name: String,
  Description: String,
  Image: String,
  price: Number,
  Type: String,
  category: String,
});
module.exports = mongoose.model('services', services);
