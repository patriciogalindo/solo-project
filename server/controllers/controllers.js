const User = require('../Schema/User');
const Event = require('../Schema/Events');
const Recomendation = require('../Schema/Recomendations')
const Vote = require('../Schema/Votes')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function getAllUsers(req, res){
    try{
        const users = await User.find();
        res.status(200) 
        res.send(users)       
      } catch(err){
        res.sendStatus(500)
      }
}

async function getUser(req, res){
  try{
      const user = await User.findById(req.user._id);
      res.status(200) 
      res.send(user)       
    } catch(err){
      res.sendStatus(500)
    }
}



async function addUser(req, res){
    try{
      bcrypt.hash(req.body.password, 10,  async (err, hash) => { 
        const newUser = await User.create({
          username: req.body.username,
          password: hash
        })
        res.send(newUser)
       }); 

    } catch(error){
        res.sendStatus(500)
    }
}


async function login(req, res){
  try{
    const {username, password} = req.body;
    const newFind = await User.findOne({username})
    const isValid = await bcrypt.compare(password, newFind.password)
    if(!isValid) return res.send(alert("error!"))
    const token = jwt.sign({
      _id: newFind._id
    }, "secret")
    res.send({token: token})
  }catch(error){
    res.status(500)
  }
}

async function me(req, res){
  try{
    const user = req.user
    return res.send({user})
  }catch(error){
    res.status(500)
  }
}

async function getAllEvents(req, res){
  try{
      const events = await Event.find().populate('guests').populate('owner');
      res.status(200) 
      res.send(events)       
    } catch(err){

      res.sendStatus(500)
    }
}

async function getEventbyUserIdOfGuest(req, res){
  try{

      const events = await Event.find({ guests : { $all : [req.user._id] }}).populate('guests').populate('owner').sort({date: 'asc'}).exec()
      res.status(200) 
      res.send(events)       
    } catch(err){
      res.sendStatus(500)
    }
}

async function addEvent(req, res){
  try{
      const event = {
      "owner": req.user._id,
      "date": req.body.date, 
      "guests": req.body.guests
      }
      const newEvent =  await Event.create(event)
       res.send(newEvent)
  } catch(error){
      res.sendStatus(500)
  }
}

async function getEvent(req, res){
  try{
      const event = await Event.findById(req.params.eventid);
      res.status(200) 
      res.send(event)       
    } catch(err){
      res.sendStatus(500)
    }
}

async function addRecomendation(req, res){
  try{
      const data = {
        "owner": req.user._id,
        "event": req.body.event, 
        "venue": req.body.venue,
        "votes": req.body.votes
      }
      const newRecomendation =  await Recomendation.create(data)
       res.send(newRecomendation)
  } catch(error){
      res.sendStatus(500)
  }
}

async function getRecomendationsbyEventId(req, res){
  try{
      const events = await Recomendation.find({"event": req.params.eventid}).sort({"votes": "desc"}).exec();
      res.status(200) 
      res.send(events)       
    } catch(err){
      res.sendStatus(500)
    }
}

async function addVote(req, res){
  try{
    const data = {
      "owner": req.user._id,
      "event": req.body.event, 
      "recomendation": req.body.recomendation
    }
      const newVote =  await Vote.create(data)
      await Recomendation.findByIdAndUpdate( 
        {_id:req.body.recomendation},
        {$inc: {votes:1}},
        {new: true}
        )
       res.send(newVote)
  } catch(error){
      res.sendStatus(500)
  }
}

  
  async function getVotesbyUserId(req, res){
    try{
        const votes = await Vote.find({"owner": req.user._id});
        res.status(200) 
        res.send(votes)       
      } catch(err){
        res.sendStatus(500)
      }
  }

  async function addVotetoRec(req, res){
    try{
    const vote = await Recomendation.findOneAndUpdate(
      {_id:req.params.id},
      {$inc: {votes:1}},
      {new: true}
      )
      res.send(vote)
      return res.sendStatus(200)
  } catch(err){
    res.sendStatus(500)
  }
}


module.exports =  {
addUser, getAllUsers, getAllEvents, addEvent, getUser, getEvent, getEventbyUserIdOfGuest, 
addRecomendation, getRecomendationsbyEventId, addVote, getVotesbyUserId, login, me, addVotetoRec
};