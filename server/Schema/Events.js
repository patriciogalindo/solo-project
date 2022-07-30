const mongoose = require('../db');
const { Schema } = require('mongoose');

const Event = new mongoose.Schema({
    date: Date,
    owner:{   
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    guests: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
    ]
})

module.exports = mongoose.model('Event', Event)


