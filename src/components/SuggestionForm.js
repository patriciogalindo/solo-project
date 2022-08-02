import React, { useState } from 'react'
import { addRecomendation } from '../services/services';

function SuggestionForm(props) {
   const  [venue, setVenue] = useState();


    const handleClick = async (e) => {
        e.preventDefault()
        const newRecomendation = {
            "event": props.eventIdprop,
            "venue": venue, 
            "votes": 0
        }
        await addRecomendation(newRecomendation)
        await props.getRecomendations()
        
    }

    
  return (
    <form onSubmit={handleClick}>
    <input type="text" name="venue" onChange={(e) => setVenue(e.target.value) }></input> 
    <button type='submit'> Recomendation </button>
</form>
  )
}

export default SuggestionForm