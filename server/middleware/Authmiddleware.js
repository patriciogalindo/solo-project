const jwt = require('jsonwebtoken')
const User = require('../Schema/User')

async function authMiddleware(req, res, next){
    try{
        const header = req.headers.authorization
        const token= header
        const check = jwt.verify(token, 'secret')        
        const user = await User.findById(check._id)
        console.log(user)
        if(!user) return res.sendStatus(401)
        req.user = user
        next()
    }catch{
        res.status(500)
    }
}

module.exports = {
    authMiddleware
}