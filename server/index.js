const express = require('express');
const app = express();
const port = 3100;
const router = require('./router')
const cors = require('cors')

app.use(cors())


app.use(express.json())
app.use(router)

app.listen((process.env.PORT || port), () => {
    console.log(`listening in port ${(process.env.PORT || port)}`)
})


module.exports = app; 