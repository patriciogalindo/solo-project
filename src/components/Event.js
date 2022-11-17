import React, { useEffect, useState,useContext } from 'react';
import {fetchRecomendations, addVote, votesByUserId} from '../services/services'
import './Event.css'
import moment from "moment";
import SuggestionForm from './SuggestionForm';
import { mainContext } from '../helper/Context'
import Card from '@mui/material/Card';
import { Paper } from '@mui/material';
import { Button } from '@mui/material';



function Event(props) {
  const [loadedRecomendations, setLoadedRecomendations] = useState([])
  const [loadedVotes, setLoadedVotes] = useState([])
  const {userContext} = useContext(mainContext)


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


  return (
    <Card sx={{
      minWidth: 500, 
      marginBottom: 10,
      marginLeft:20,
      display: 'flex',
      justifyContent: 'space-between',
      width:800
      }} >
      <div className='content-container'>

      <Paper style={{
        width:200, 
        height:30,
        backgroundColor: "blue",
        color: 'white', 
        fontWeight:'bold'
      
      }} className="content"> Event Name: {props.ename}</Paper>

    <Paper style={{
        width:200, 
        height:30,
        backgroundColor: "blue",
        color: 'white', 
        fontWeight:'bold'
      
      }} className="content"> Created by: {props.owner.username}</Paper>


    <Paper style={{
        width:200, 
        height:30,
        backgroundColor: "orange",
        color: 'white', 
        fontWeight:'bold',
      }} className="content"> Date: {moment(props.date).format("MMM Do YY")} </Paper>

      

    
    <div className = 'guestsContainer'>
      {props.guest.map(guest=> {
      return <Paper style={{
        width:200, 
        height:30,
        backgroundColor: "pink",
        color: 'black', 
        fontWeight:'bold',
      }}  className="content" key={guest._id}> Guest: {guest.username} </Paper>
      })}

      </div>
      
    </div>

<div className='ranking-container'>
{loadedRecomendations.map((rec, index) => {
  return <div>
    <Paper elevation={2}  style=
    {{height:30, 
      padding:5,
      marginTop:2,
      backgroundColor: index === 0 ? "lightgreen" : "transparent",
      color: index === 0 ? "blue" : "black"
    }}  className='ranking-list'>
    <div className='venue'> Venue: {rec.venue}</div>
    <div className='votes'> Votes: {rec.votes}</div>

    {checkVotes(rec.event) === false && 
       <Button
        style={{
          color: index === 0 ? "blue" : "lightblue"
        }}
       data-event-id={rec.event} data-recomendation-id={rec._id}  onClick={handleClick}> 
       Vote
   </Button>
    }</Paper>
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
    </Card>
  )
}

export default Event