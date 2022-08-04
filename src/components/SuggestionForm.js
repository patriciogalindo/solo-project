import React, { useState } from 'react'
import { addRecomendation } from '../services/services';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';


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

    <Paper elevation={2}  style=
    {{height:50, 
      padding:5,
      marginTop:2
    }}  className='suggestion-form'>


    <form onSubmit={handleClick}>
    <TextField 
          label="Recommend something!"
          id="outlined-size-small"
          size="small"  type="text" name="venue" onChange={(e) => setVenue(e.target.value) }></TextField> 
    <Button type='submit'>Send</Button>
</form>

    </Paper>
  )
}

export default SuggestionForm