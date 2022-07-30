const User = require('../Schema/User');
const Event = require('../Schema/Events');
const Recomendation = require('../Schema/Recomendations')
const Vote = require('../Schema/Votes')


async function getAllUsers(req, res){
    try{
        const users = await User.find();
        console.log(users)
        res.status(200) 
        res.send(users)       
      } catch(err){
        res.sendStatus(500)
      }
}

async function getUser(req, res){
  try{
      const user = await User.findById(req.params.id);
      console.log(user)
      res.status(200) 
      res.send(user)       
    } catch(err){
      res.sendStatus(500)
    }
}

async function addUser(req, res){
    try{
      console.log(req.body)
        const user = req.body
        const newUser =  await User.create(user)
         res.send(newUser)
    } catch(error){
        res.sendStatus(500)
    }
}

async function getAllEvents(req, res){
  try{
      const events = await Event.find().populate('guests').populate('owner');
      res.status(200) 
      res.send(events)       
    } catch(err){
      console.log(err)
      res.sendStatus(500)
    }
}

async function getEventbyUserIdOfGuest(req, res){
  try{
      const events = await Event.find({"guests._id": req.params.id});
      res.status(200) 
      res.send(events)       
    } catch(err){
      res.sendStatus(500)
    }
}

async function addEvent(req, res){
  try{
      const event = req.body
      const newEvent =  await Event.create(event)
       res.send(newEvent)
  } catch(error){
      res.sendStatus(500)
  }
}

async function getEvent(req, res){
  try{
    console.log(req.params)
      const event = await Event.findById(req.params.eventid);
      res.status(200) 
      res.send(event)       
    } catch(err){
      res.sendStatus(500)
    }
}

async function addRecomendation(req, res){
  try{
      const newRecomendation =  await Recomendation.create(req.body)
       res.send(newRecomendation)
  } catch(error){
      res.sendStatus(500)
  }
}

async function getRecomendationsbyEventId(req, res){
  try{
      const events = await Recomendation.find({"event": req.params.eventid});
      res.status(200) 
      res.send(events)       
    } catch(err){
      res.sendStatus(500)
    }
}

async function addVote(req, res){
  try{
      const vote = req.body
      const newVote =  await Vote.create(vote)
       res.send(newVote)
  } catch(error){
      res.sendStatus(500)
  }
}
  
  async function getVotesbyEvent(req, res){
    try{
        const votes = await Vote.find({"event": req.params.eventid});
        res.status(200) 
        res.send(votes)       
      } catch(err){
        res.sendStatus(500)
      }
  }


module.exports =  {
addUser, getAllUsers, getAllEvents, addEvent, getUser, getEvent, getEventbyUserIdOfGuest, 
addRecomendation, getRecomendationsbyEventId, addVote, getVotesbyEvent
};