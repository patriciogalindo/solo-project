const { Schema } = require('mongoose');
const mongoose = require('../db');

const User = new mongoose.Schema({
    username: {
    type: String,
    unique: true
    }, 
    password: String,
    friends: [
        {   
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

module.exports = mongoose.model('User', User)