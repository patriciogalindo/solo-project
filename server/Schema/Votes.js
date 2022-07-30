const mongoose = require('../db');
const { Schema } = require('mongoose');

const Vote = new mongoose.Schema({
    owner:{   
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    recomendation:{   
        type: Schema.Types.ObjectId,
        ref: "Recomendation"
    },
    event:{   
        type: Schema.Types.ObjectId,
        ref: "Event"
    }
})

module.exports = mongoose.model('Vote', Vote)