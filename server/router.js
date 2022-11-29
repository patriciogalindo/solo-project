
const express = require('express')
const router = express.Router()
const controller = require('./controllers/controllers')
const { authMiddleware } = require('./middleware/Authmiddleware')

router.get('/users', controller.getAllUsers) //WORKS 
router.post('/users', controller.addUser) // WORKS
router.get('/events',authMiddleware, controller.getAllEvents) // WORKS
router.post('/events', authMiddleware,  controller.addEvent) // WORKS
router.post('/invitation', authMiddleware, controller.sendInvitation)// WORKS
router.get('/invitation', authMiddleware, controller.getInvitationsbyId)// WORKS
router.delete('/invitation', controller.deleteInvitation)// WORKS
router.patch('/invitation', authMiddleware, controller.acceptInvitation)

/////////

router.get('/user/getbyId',authMiddleware, controller.getUser) //WORKS



router.get('/event/:eventid', controller.getEvent)  //WORKS

router.get('/eventU', authMiddleware, controller.getEventbyUserIdOfGuest) // WORKS


router.post('/event/addRecomendation', authMiddleware, controller.addRecomendation) //WORKS


router.get('/event/recomendations/:eventid', controller.getRecomendationsbyEventId) //WORKS
router.post('/event/recomendation/addVote', authMiddleware, controller.addVote) // WORKS


// ------------------------------------here---------------------------
router.put('/addvote/recomendation', controller.addVotetoRec)
// ------------------------------------here---------------------------

router.get('/event/votes/userId', authMiddleware,  controller.getVotesbyUserId) 
router.get('/vote/:id', controller.votesByEventId)

router.post('/login', controller.login) 
router.get('/login', authMiddleware,  controller.me)




module.exports = router;