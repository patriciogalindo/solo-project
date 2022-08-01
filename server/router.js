
const express = require('express')
const router = express.Router()
const controller = require('./controllers/controllers')
const { authMiddleware } = require('./middleware/Authmiddleware')

router.get('/users', controller.getAllUsers) //WORKS 
router.post('/users', controller.addUser) // WORKS
router.get('/events', controller.getAllEvents) // WORKS
router.post('/events', controller.addEvent) // WORKS
router.get('/user/:id', controller.getUser) //WORKS
router.get('/event/:eventid', controller.getEvent)  //WORKS
router.get('/eventU', authMiddleware, controller.getEventbyUserIdOfGuest) // WORKS
router.post('/event/addRecomendation', authMiddleware, controller.addRecomendation) //WORKS
router.get('/event/recomendations/:eventid', controller.getRecomendationsbyEventId) //WORKS
router.post('/event/recomendation/addVote', controller.addVote) // WORKS
router.get('/event/votes/:eventid', controller.getVotesbyEvent) //Works
router.post('/login', controller.login) 
router.get('/login', authMiddleware,  controller.me)


module.exports = router;