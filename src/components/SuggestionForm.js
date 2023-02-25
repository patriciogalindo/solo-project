import React, { useState } from 'react'
import { addRecomendation } from '../services/services';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import './SuggestionForm.css'


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
        props.getEvent()
    }
    
    
  return (
    <form onSubmit={handleClick} className="form-css">
      <h1>Add a Suggestion</h1>
      <div className='suggestion-form-add-div'>
    <TextField 
    sx={{
      marginRight:2
    }}
    className='textfield'
          label="Recommendation"
          id="outlined-size-small"
          size="small"  type="text" name="venue" onChange={(e) => setVenue(e.target.value) }></TextField> 
    <Button variant='contained' type='submit' className='sf-btn'>Send</Button>
    </div>
</form>
  )
}

export default SuggestionForm