import React, { useState } from 'react'
import { newEvent } from '../services/services';

function EventForm() {
  // const [venue, setVenue] = useState('')
  const [date, setDate] = useState('')
  // const [guests, setGuest] = useState([]);

   const handleClick = (e) => {
    e.preventDefault()
    // setVenue(e.target.venueForm.value)
    setDate(e.target.dateForm.value)  
    const event = {
      "date": date
    }
    newEvent(event)
  }


  return (
    <form onSubmit={(e) =>  handleClick(e)}>
        {/* <input type='text' name='venueForm' autoComplete='off'></input> */}
        <input type='date' name='dateForm' autoComplete='off' min={new Date().toISOString().split('T')[0]}></input>
        <button type='submit'> Click </button>
    </form>
  )
}

export default EventForm