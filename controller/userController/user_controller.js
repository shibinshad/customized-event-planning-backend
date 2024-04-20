/* eslint-disable no-unused-vars */
// const express = require('express'); (assumed to be imported elsewhere)
const mongoose = require('mongoose');
const UserProfile = require('../../Models/profile_schema');
const User = require('../../Models/Users');
const service = require('../../Models/serviceSchema');
const Cart = require('../../Models/cartSchema');
const updateProfile = async (req, res) => {
  // Validate input data (consider using a validation library)
  if (!mongoose.Types.ObjectId.isValid(req.tockens.id)) {
    return res.status(400).json({error: 'Invalid user ID'});
  }

  // eslint-disable-next-line new-cap
  const userId = new mongoose.Types.ObjectId(req.tockens.id);
  const {username, email, phone, address, bio, dob} = req.body;

  try {
    // Update User document
    const updatedUser = await User.findOneAndUpdate(
        {_id: userId},
        {username, email, phone}, // Only update specified fields
        {upsert: true, new: true}, // Create if not found, return updated doc
    );

    if (!updatedUser) {
      return res.status(404).json({error: 'User not found'});
    }

    // Update UserProfile document (if it exists)
    const updatedProfile = await UserProfile.findOneAndUpdate(
        {userId},
        // eslint-disable-next-line max-len
        {username, email, phone, address, bio, dob, avatar: req.file?.location}, // Only update if file exists
        {upsert: true, new: true}, // Create if not found, return updated doc
    );

    res.status(200).json({message: 'Profile updated successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while updating profile'});
  }
};

const show = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.tockens.id);

    // Perform aggregation with proper error handling
    const user = await User.aggregate([
      {
        $match: {_id: userId},
      },
      {
        $lookup: {
          from: 'userprofiles',
          localField: '_id',
          foreignField: 'userId',
          as: 'userprofile',
        },
      },
    ]);

    if (!user.length) {
      return res.status(404).json({error: 'User not found'});
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'An error occurred while fetching profile'});
  }
};

const getLocations = async (req, res) => {
  try {
    const location = await service.find({category: 'Location'});
    res.json({location});
  } catch (err) {
    console.log(err);
  }
};
const getcatering = async (req, res) => {
  try {
    const catering = await service.find({category: 'catering'});
    res.json({catering});
  } catch (err) {
    console.log(err);
  }
};
const getmedia = async (req, res) => {
  try {
    const media = await service.find({category: 'media'});
    res.json({media});
  } catch (err) {
    console.log(err);
  }
};
const getdecorations = async (req, res) => {
  try {
    const decorations = await service.find({category: 'Decoration'});
    res.json({decorations});
  } catch (err) {
    console.log(err);
  }
};
const addToCart = async (req, res) => {
  try {
    const userId = req.tockens.id;
    const id = req.body.data;

    // Check if the item is already in the cart
    const isAlreadyInCart = await Cart.findOne({
      userId: userId,
      selectedId: id,
    });

    // If the item is already in the cart, remove it
    if (isAlreadyInCart) {
      const updatedCart = await Cart.findOneAndUpdate(
          {userId: userId},
          {$pull: {selectedId: id}},
          {new: true},
      );
      console.log(updatedCart);
      return res
          .status(200)
          .json({message: 'Item removed from cart successfully', updatedCart});
    }

    // If the item is not in the cart, add it
    const updatedCart = await Cart.findOneAndUpdate(
        {userId: userId},
        {$addToSet: {selectedId: id}},
        {upsert: true, new: true},
    );
    console.log(updatedCart);
    res
        .status(200)
        .json({message: 'Item added to cart successfully', updatedCart});
  } catch (error) {
    console.error('Error adding/removing item to/from cart:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const orders = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.tockens.id);
  const orders = await Cart.aggregate([
    {$match: {userId: userId}},
    // {
    //   $lookup: {
    //     from: 'users',
    //     localField: 'userId',
    //     foreignField: '_id',
    //     as: 'users',
    //   },
    // },
    {
      $lookup: {
        from: 'services',
        localField: 'selectedId',
        foreignField: '_id',
        as: 'products',
      },
    },
  ]);
  res.json({orders});
};

module.exports = {
  updateProfile,
  show,
  getLocations,
  getcatering,
  getmedia,
  getdecorations,
  addToCart,
  orders,
};
