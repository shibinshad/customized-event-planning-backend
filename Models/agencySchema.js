const mongoose=require('mongoose');
const agencyForms =new mongoose.Schema({
  Name: String,
  Description: String,
  price: String,
  image: String,

});
module.exports = mongoose.model('agencyForms', agencyForms );
