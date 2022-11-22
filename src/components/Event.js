import React, { useEffect, useState,useContext } from 'react';
import {fetchRecomendations, addVote, votesByUserId} from '../services/services'
import './Event.css'
import moment from "moment";
import SuggestionForm from './SuggestionForm';
import { mainContext, eventContext, navContext } from '../helper/Context'
import Card from '@mui/material/Card';
import { Paper } from '@mui/material';
import { Button } from '@mui/material';
import { shadows } from '@mui/system';


function Event(props) {
  const [loadedRecomendations, setLoadedRecomendations] = useState([])
  const [loadedVotes, setLoadedVotes] = useState([])
  const {userContext} = useContext(mainContext)
  const {selectedEventContext, setSelectedEventContext} = useContext(eventContext)
  const {selectedNavContext, setSelectedNavContext} = useContext(navContext)

  const getRecomendations = async () => {
    const recomendations = await fetchRecomendations(props.eventId)
    setLoadedRecomendations(recomendations)
  }


  


  useEffect(() => {
    getRecomendations()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedVotes])

  const getAllVotes = async () => {
    const votes = await votesByUserId()
     setLoadedVotes(votes)
  }

  useEffect(() => {
    getAllVotes()
  }, [])

const handleClick = async (e) => {
    const vote = 
        {
            recomendation: e.target.dataset.recomendationId,
            event: e.target.dataset.eventId
        }            
    await addVote(vote)
    await getAllVotes()
    }

  function checkVotes(propEl){
   const bool =  loadedVotes.some(e => e.event === propEl)
   return bool       
  }

  function handleClickSelect(){
    setSelectedEventContext(props)
    setSelectedNavContext("")
  }


  return (
    <Card sx={{
      minWidth: 500, 
      marginBottom: 10,
      marginLeft:20,
      display: 'flex',
      justifyContent: 'space-between',
      width:800,
      boxShadow: 2
      }} >
      <div className='content-container' onClick={handleClickSelect}>
        <p className="content">   {props.ename}</p>
        <p className="content"> Invited by {props.owner.username}</p>
        <p className="content"> {moment(props.date).format("MMM Do YY")} </p>


      

    
    <div className = 'guestsContainer'>
      {props.guests.map(guest=> {
      return <p className="content" key={guest._id}> Guest: {guest.username} </p>
      })}

      </div>
      
    </div>

        <div className='rank-sug-container'>
<div className='ranking-container'>
{loadedRecomendations.map((rec, index) => {
  return <div className='venue' >
    <div className='venue'> Venue: {rec.venue}</div>
    <div className='votes'> Votes: {rec.votes}</div>

    {checkVotes(rec.event) === false && 
    <div className='vote-btn'>
       <Button
        style={{
          color: index === 0 ? "blue" : "lightblue"
        }}
       data-event-id={rec.event} data-recomendation-id={rec._id}  onClick={handleClick}> 
       Vote
   </Button>
   </div>
    }
    
    {/* </Paper> */}


    </div>
})}
</div>      

      <div className='suggestion-form'>
{loadedRecomendations.some(e => e.owner === userContext._id) === false && 
    <SuggestionForm 
    eventIdprop = {props.eventId}
    getRecomendations= {getRecomendations}
    /> 
    } 
    </div>

    </div>
    </Card>
  )
}

export default Event