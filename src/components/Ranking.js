import React from 'react'
import {addVote} from '../services/services'
import './Ranking.css'

function Ranking(props) {

    
    const handleClick = (e) => {
        const vote = [
            {
                recomendation: e.target.dataset.recomendationId,
                event: e.target.dataset.eventId
            }
        ]
        addVote(vote)
    }


  return (
    <div>
    <div className='venue'>{props.venue}</div>
    <button data-event-id={props.event} data-recomendation-id={props.id}  onClick={handleClick}> 
        Vote
    </button>
    </div>
  )
}

export default Ranking


