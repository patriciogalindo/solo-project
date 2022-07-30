const mongoose = require('../db');
const { Schema } = require('mongoose');

const Recomendation = new mongoose.Schema({
    owner:{   
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    event:{   
        type: Schema.Types.ObjectId,
        ref: "Event"
    },
            venue:String,
            votes: Number
})

module.exports = mongoose.model('Recomendation', Recomendation)