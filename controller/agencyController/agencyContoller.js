const Services = require('../../Models/serviceSchema');
const Service = require('../../Models/serviceSchema');
const mongoose = require('mongoose');
const User = require('../../Models/Users');
const agency= require('../../Models/agencySchema');

const addProfile = async (req, res) => {
  const file = req?.file?.location;
  const userId = req.tockens.id;
  console.log(req.body);
  const {username, email, bio, phone, location} = req.body;
  const newProfile = new AgencyProfile({
    userId,
    location,
    Description: bio,
    image: file,
  });
  await User.updateOne({_id: userId}, {$set: {username, email, phone}});
  await newProfile.save();
};
const cateringForm = async (req, res) => {
  try {
    const file = req?.file?.location;
    const {Name, Discription, price, type, category} = req?.body;
    const newService = new Services({
      name: Name,
      Description: Discription,
      price: price,
      Image: file,
      Type: type,
      category,
    });
    await newService.save();
    res.json({success: true});
  } catch (err) {
    console.log('Error in catch block', err);
    res.json({success: false});
  }
};

const DecorationForm = async (req, res) => {
  try {
    const file = req?.file?.location;
    const {Name, Discription, price, Type, category} = req?.body;
    const newService = new Services({
      name: Name,
      Description: Discription,
      price: price,
      Image: file,
      Type: Type,
      category,
    });
    await newService.save();
    res.json({success: true});
  } catch (err) {
    console.log('Error in catch block', err);
    res.json({success: false});
  }
};

const locationForm = async (req, res) => {
  try {
    const file = req?.file?.location;
    const {Name, Description, price, type, category} = req?.body;
    const newService = new Services({
      name: Name,
      Description,
      price: price,
      Image: file,
      Type: type,
      category,
    });
    await newService.save();
    res.json({success: true});
  } catch (err) {
    console.log('Error in catch block', err);
    res.json({success: false});
  }
};

const mediaForm = async (req, res) => {
  try {
    const file = req?.file?.location;
    console.log(file);
    console.log(req.body);
    console.log(req.body, file);
    const {Name, Description, price, type, category} = req?.body;
    const newService = new Services({
      name: Name,
      Description,
      price: price,
      Image: file,
      Type: type,
      category,
    });
    await newService.save();
    res.json({success: true});
  } catch (err) {
    console.log('Error in catch block');
    res.json({success: false});
  }
};

const deleteService = async (req, res) => {
  try {
    const id = req.params.id;
    await Services.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
};

const updateMedia = async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const image = req?.file?.location;
  const {Name, Description, price, cateringType} = req?.body;
  const service = await Service.updateOne(
      {_id: id},
      {
        $set: {
          name: Name,
          Description,
          price,
          Image: image,
          Type: cateringType,
        },
      },
  );
  if (service) {
    res.json({message: 'updated successfull'});
  }
};

const getDetails = async (req, res) => {
  try {
    console.log(req.params.id);
    const id = new mongoose.Types.ObjectId(req.params.id);
    console.log(id);
    const user = await Service.findById(id);
    res.json(user);
  } catch (error) {
    console.log('sudais');
    console.log('Error in getting details', error);
  }
};

const getProfile = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.tockens.id);
  console.log(userId);
  const profile = await agency.findOne({userId: userId});
  console.log(profile);
  // const profile = await User.aggregate([
  //   {
  //     $match: {_id: userId, role: 'agency'},
  //   },
  //   {
  //     $lookup: {
  //       from: 'agencyforms',
  //       localField: '_id',
  //       foreignField: 'userId',
  //       as: 'AgencyProfile',
  //     },
  //   },
  // ]);
  res.json({profile});
};

const updateProfile = async (req, res) => {
  const file = req?.file?.location;
  const userId = req.tockens.id;
  console.log(file);
  console.log(userId);
  const {username, email, bio, phone, location} = req.body;
  console.log(username);
  console.log(req.body);
  // const user = await User.findOneAndUpdate(
  //     {_id: userId},
  //     {$set: {username, email, mobileNumber: phone}},
  //     {new: true},
  // )
  await agency.updateOne(
      {userId: userId},
      {$set: {Description: bio, email,
        location, image: file, name: username, phone, userId: userId}},
      {upsert: true},
  );
};
module.exports = {
  cateringForm,
  DecorationForm,
  locationForm,
  mediaForm,
  deleteService,
  updateMedia,
  addProfile,
  getDetails,
  getProfile,
  updateProfile,
};
