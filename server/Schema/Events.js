const mongoose = require('../db');
const { Schema } = require('mongoose');

const Event = new mongoose.Schema({
    date: Date,
    ename : String,
    picture: String,
    owner:{   
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    guests: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
    ], 
    winner:[
        {
        type: Schema.Types.ObjectId,
        ref: "Recomendation"
        }
    ]
})

module.exports = mongoose.model('Event', Event)


