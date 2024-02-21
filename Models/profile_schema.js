const mongoose=require('mongoose');
const userProfile=new mongoose.Schema({
    username: String,
    email: String,
    address: String,
    bio: String,
    phone: String,
    dob: Date,
    avatar: String
})

module.exports = mongoose.model("UserProfile",userProfile);