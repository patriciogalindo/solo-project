const { Schema } = require('mongoose');
const mongoose = require('../db');

const User = new mongoose.Schema({
    avatar: {
        type: String,
        default: 'avatar_x1djuh'
    },
    username: {
    type: String,
    unique: true, 
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