import React, { useEffect, useState } from 'react';
import Ranking from './Ranking';
import {fetchRecomendations} from '../services/services'
import './Event.css'
import moment from "moment";

function Event(props) {
  const [loadedRecomendations, setLoadedRecomendations] = useState([])

  const getRecomendations = async () => {
    const recomendations = await fetchRecomendations(props.eventId)
    setLoadedRecomendations(recomendations)
    return loadedRecomendations
  }

  useEffect(() => {
    getRecomendations()
  }, [])


  return (
    <div className="event-container">
      <div className='content-container'>
    <div className="content">{props.owner.username}</div>
    <div className="content"> {moment(props.date).format("MMM Do YY")} </div>
 
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
      />
      
    })}
    </div>


    </div>
  )
}

export default Event