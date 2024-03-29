const User = require('../Schema/User');
const Event = require('../Schema/Events');
const Recomendation = require('../Schema/Recomendations')
const Invitation = require("../Schema/Invitation")
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
      const user = await User.findById(req.user._id).populate('friends');
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
      const events = await Event.find().populate('guests').populate('owner')
      res.status(200) 
      res.send(events)       
    } catch(err){

      res.sendStatus(500)
    }
}

async function getEventbyUserIdOfGuest(req, res){
  try{

      const events = await Event.find({ guests : { $all : [req.user._id] }}).populate('recomendation').populate('vote')
      .populate('guests').populate('owner').sort({date: 'asc'}).exec()
      res.status(200) 
      res.send(events)       
    } catch(err){
      res.sendStatus(500)
    }
}

async function getInvitationsbyId(req, res){
  try {
    const invitations = await Invitation.find({invitee: {$all : [req.user._id]}}).populate('owner');
      res.status(200)
      res.send(invitations)
       }catch(err){
        res.sendStatus(500)
      }
}

async function addEvent(req, res){
  try{
      const event = {
      "owner": req.user._id,
      "date": req.body.date, 
      "guests": req.body.guests,
      "ename": req.body.ename,
      "picture": req.body.picture,
      "sinopsis": req.body.sinopsis
      }
      const newEvent =  await Event.create(event)
       res.send(newEvent)
  } catch(error){
      res.sendStatus(500)
  }
}

async function sendInvitation(req, res){
  try{
    const data = {
      "owner": req.user._id,
      "invitee": req.body.invitee
    }
    const newInvitation = await Invitation.create(data)
    res.send(newInvitation)
  } catch(error){
    res.sendStatus(500)
  }
}

async function getEvent(req, res){
  try{
      const event = await Event.findById(req.params.eventid).populate('guests').populate('owner').populate('recomendation');
      res.status(200) 
      res.send(event)       
    } catch(err){
      res.sendStatus(500)
    }
}

async function addRecomendation(req, res){
  try{
      const newRecomendation =  await Event.findOneAndUpdate(
        {_id: req.body.event},
        {
          $push: {
          "recomendation":{
          "owner": req.user._id,
          "venue": req.body.venue
         }}
        }
      )
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
     const newVote =  await Event.findByIdAndUpdate( 
        {_id:req.body.event},
        {$push: {
          "vote":{
            "owner" : req.user._id,
            "recomendationID": req.body.recomendation,
            "venue": req.body.venue
          }
          }}
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

async function deleteInvitation(req, res){
  try{
    const invitation = await Invitation.deleteOne(
      {_id: req.body.id}
      )
    res.send(invitation)
  }catch{
    res.sendStatus(500)
  }
} 

async function acceptInvitation(req, res){
  try{
    const addFriend = await User.findOneAndUpdate(
      {_id: req.user._id}, 
      {$push: {friends: req.body.id}}
      )
    const addFriend2 = await User.findOneAndUpdate(
      {_id: req.body.id}, 
      {$push: {friends:req.user._id}}
    )
      res.send(addFriend2)
      res.status(200)
  }catch{
    res.sendStatus(500)
  }
}

async function votesByEventId(req, res){
  try{
    const votes = await Vote.find({"event": req.params.id})
    res.send(votes)
    res.status(200)
   }catch{
    res.status(500)
   }
}

async function addWinner(req, res){
  try{
    const newWinner = await Event.findOneAndUpdate(
      {_id: req.body.id}, 
      {$set: {winner:req.body.winner}}
      )
      res.send(newWinner)
      res.status(200)
  }catch{
    res.status(500)
  }
}

async function addAvatar(req, res){
  try{
    const avatarAdded = await User.findOneAndUpdate(
      {_id: req.user._id}, 
      {$set: {avatar:req.body.avatar}}
      )
      res.send(avatarAdded)
      res.status(200)
  }catch{
    res.status(500)
  }
}


module.exports =  {
addUser, getAllUsers, getAllEvents, addEvent, getUser, getEvent, getEventbyUserIdOfGuest, 
addRecomendation, getRecomendationsbyEventId, addVote, getVotesbyUserId, login, me, addVotetoRec, sendInvitation,
getInvitationsbyId, deleteInvitation, acceptInvitation, votesByEventId, addWinner, addAvatar
}