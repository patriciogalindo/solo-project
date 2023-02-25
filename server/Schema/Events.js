const mongoose = require('../db');
const { Schema } = require('mongoose');

const Event = new mongoose.Schema({
    date: Date,
    ename : String,
    picture: String,
    sinopsis: String,
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
    winner: {
        type: Boolean,
        default: false
    }, 
    recomendation:[{
            venue: String,
            owner:{
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }],
    vote:[{
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }, 
        recomendationID:{
            type: Schema.Types.ObjectId, 
            ref: "Recomendation"
        }, 
        venue: String
    }]

})

module.exports = mongoose.model('Event', Event)


