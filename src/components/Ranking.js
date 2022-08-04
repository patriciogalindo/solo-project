import React, { useEffect, useState} from 'react'
import {addVote, votesByUserId} from '../services/services'
import './Ranking.css'
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';


function Ranking(props) {
    const [loadedVotes, setLoadedVotes] = useState([])

    const getAllVotes = async () => {
        const votes = await votesByUserId()
         setLoadedVotes(votes)
      }

      useEffect(() => {
        getAllVotes()
      }, [loadedVotes])


    const handleClick = async (e) => {
        const vote = 
            {
                recomendation: e.target.dataset.recomendationId,
                event: e.target.dataset.eventId
            }
  
        await addVote(vote)
        await getAllVotes()
        await checkVotes()
        await props.getRecomendations()    
        }

      function checkVotes(propEl){
       const bool =  loadedVotes.some(e => e.event === propEl)
       return bool
      }


  return (
    <>
    <Paper elevation={2}  style=
    {{height:30, 
      padding:5,
      marginTop:2,
      backgroundColor: props.highlight ? "lightgreen" : "transparent",
      color: props.highlight ? "blue" : "black"
    }}  className='ranking-list'>
    <div className='venue'> Venue: {props.venue}</div>
    <div className='votes'> Votes: {props.votes}</div>

    {checkVotes(props.event) === false && 
       <Button
        style={{
          color: props.highlight ? "blue" : "lightblue"
        }}
       data-event-id={props.event} data-recomendation-id={props.id}  onClick={handleClick}> 
       Vote
   </Button>
    }</Paper>
    </>
  )
}

export default Ranking


