import React, { useEffect, useState,useContext } from 'react';
import {fetchRecomendations, addVote, votesByUserId} from '../services/services'
import './Event.css'
import moment from "moment";
import SuggestionForm from './SuggestionForm';
import { mainContext, eventContext, navContext } from '../helper/Context'
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import {useNavigate} from "react-router-dom"
import eventImage from "../images/eventImage1.jpg"

function Event(props) {
  const [loadedRecomendations, setLoadedRecomendations] = useState([])
  const [loadedVotes, setLoadedVotes] = useState([])
  const {userContext} = useContext(mainContext)
  const {selectedEventContext, setSelectedEventContext} = useContext(eventContext)
  const {selectedNavContext, setSelectedNavContext} = useContext(navContext)
  const navigate = useNavigate();

  const getRecomendations = async () => {
    const recomendations = await fetchRecomendations(props.eventId)
    setLoadedRecomendations(recomendations)
  }

  console.log(loadedRecomendations)

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

  function handleClickSelect(e){
    setSelectedEventContext(props)
    setSelectedNavContext("")
    navigate(`/event/${e}`)
  }

  

  return (
    <>
  
    <Card sx={{
      marginBottom: 5,
      marginLeft:10,
      marginRight:10,
      boxShadow: 2, 
      width: "20%"
      }} >
      <div className='content-container' onClick={() =>  handleClickSelect(props.eventId)}>
      <img alt='eventPicture' src={eventImage} />
      <h2 className="date"> {moment(props.date).format("MMM Do YY")} </h2>
        <h3 className="ename">   {props.ename}</h3>
        <p className="owner"> Invited by {props.owner.username}</p>
        <div className="guest-div">
          <h2 id="attending">Attending {props.guests.length} people</h2>
      </div>
    </div>
    </Card>
     </>
       )
}

export default Event