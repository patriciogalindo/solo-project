const mongoose = require('../db');
const { Schema } = require('mongoose');

const Invitation = new mongoose.Schema({
    owner:{   
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    invitee: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
})

module.exports = mongoose.model('Invitation', Invitation)