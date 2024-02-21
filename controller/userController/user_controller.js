// const express = require('express');
// const mongoose = require('mongoose');
const UserProfile=require("../../Models/profile_schema");


const updateProfile = (req, res) => {
    const { username, email, address, bio, phone, dob, avatar } = req.body;

    // Create a new instance of the UserProfile model with the request body
    const userProfile = new UserProfile({
        username,
        email,
        address,
        bio,
        phone,
        dob,
        avatar
    });

    // Save the userProfile instance to the database
    userProfile.save()
        .then(savedProfile => {
            console.log('Profile saved successfully:', savedProfile);
            res.status(200).json(savedProfile);
        })
        .catch(error => {
            console.error('Error saving profile:', error);
            res.status(500).json({ error: 'An error occurred while saving profile' });
        });
}

module.exports={
    updateProfile,
}