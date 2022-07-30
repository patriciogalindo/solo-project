const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://pato1:pato1@cluster0.kewac.mongodb.net/solo', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected!!!!')
})

let db = mongoose

module.exports = db