import React, { useEffect, useState} from 'react'
import {addVote, votesByUserId} from '../services/services'
import './Ranking.css'

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
    <div>
    <div className='venue'>{props.venue}</div>
    <div className='votes'>{props.votes}</div>

    {checkVotes(props.event) === false && 
       <button data-event-id={props.event} data-recomendation-id={props.id}  onClick={handleClick}> 
       Vote
   </button>
    }
     
 
    </div>
  )
}

export default Ranking


