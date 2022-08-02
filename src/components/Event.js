import React, { useEffect, useState,useContext } from 'react';
import Ranking from './Ranking';
import {fetchRecomendations} from '../services/services'
import './Event.css'
import moment from "moment";
import SuggestionForm from './SuggestionForm';
import { mainContext } from '../helper/Context'




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
    <div className="event-container">
      <div className='content-container'>
    <div className="content">{props.owner.username}</div>
    <div className="content"> {moment(props.date).format("MMM Do YY")} </div>


    {loadedRecomendations.some(e => e.owner === userContext._id) === false && 
    <SuggestionForm 
    eventIdprop = {props.eventId}
    getRecomendations= {getRecomendations}
    /> 
    } 
    
    
    {props.guest.map(guest=> {
     return <div className="content" key={guest._id}> {guest.username} </div>
    })}
    </div>



    <div className='ranking-container'>
    {loadedRecomendations.map(rec => {
      return <Ranking 
      key={rec._id}
      venue= {rec.venue}
      event={rec.event}
      id={rec._id}
      votes={rec.votes}
      getRecomendations = {getRecomendations}
      />      
    })}
    
    </div>


    </div>
  )
}

export default Event