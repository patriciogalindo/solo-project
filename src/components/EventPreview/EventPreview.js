import React, { useEffect, useState,useContext } from 'react';
import {fetchRecomendations, addVote, votesByUserId} from '../../services/services'
import './EventPreview.css'
import moment from "moment";
import SuggestionForm from '../SuggestionForm';
import { mainContext, eventContext } from '../../helper/Context'
import Card from '@mui/material/Card';
import { Paper } from '@mui/material';
import { Button } from '@mui/material';

function EventPreview(props){
    const [loadedRecomendations, setLoadedRecomendations] = useState([])
    const [loadedVotes, setLoadedVotes] = useState([])
    const {userContext} = useContext(mainContext)
    const {selectedEventContext, setSelectedEventContext} = useContext(eventContext)
  
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
      console.log(e)
      }
  
    function checkVotes(propEl){
     const bool =  loadedVotes.some(e => e.event === propEl)
     return bool       
    }

return (
    <div className='preview-container'>
      {props && <>
      <Card sx={{
              marginBottom: 10,
              marginLeft:20,
              display: 'flex',
              justifyContent: 'space-between',
              width:400
      }}
      >
      
      <div onClick={() => handleClick(props.eventId)}>
        <h1>{props.owner.username} </h1>
        <h1>{props.ename}</h1>
        <h1>{moment(props.date).format("MMM Do YY")}</h1>
        {props.guest.map((e)=>
          <h1 key={e.eventId}> {e.username} </h1>
        )}
      </div>
   

      </Card>
      </>
    }
    </div>
)



}

export default EventPreview