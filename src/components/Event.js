import React, { useEffect, useState,useContext } from 'react';
import Ranking from './Ranking';
import {fetchRecomendations} from '../services/services'
import './Event.css'
import moment from "moment";
import SuggestionForm from './SuggestionForm';
import { mainContext } from '../helper/Context'
import Card from '@mui/material/Card';
import { Paper } from '@mui/material';




function Event(props) {
  const [loadedRecomendations, setLoadedRecomendations] = useState([])
  const {userContext} = useContext(mainContext)


  const getRecomendations = async () => {
    const recomendations = await fetchRecomendations(props.eventId)
    setLoadedRecomendations(recomendations)

  }

  useEffect(() => {
    getRecomendations()
  }, [])




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
      <div className='loaded-recomendations'>
      {loadedRecomendations.map((rec, index) => {
        return <Ranking 
        key={rec._id}
        venue= {rec.venue}
        event={rec.event}
        id={rec._id}
        votes={rec.votes}
        getRecomendations = {getRecomendations}
        highlight={index === 0}
        />      
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