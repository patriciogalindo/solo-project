
import React, { useEffect, useState } from 'react'
import { fetchAllUsers, newEvent } from '../services/services';

function EventForm(props) {
  const [date, setDate] = useState('')
  const [guests, setGuest] = useState([]);
  const [guestInvited, setGuestInvited] = useState([])


  function toggle(e){
    const contact = e.target.name;  
    if(guestInvited.indexOf(contact) !== -1){
     const filterVar = guestInvited.filter(el => el !== contact)
     setGuestInvited(filterVar)
    }else{
      setGuestInvited((prevState) =>  [ ...prevState, e.target.name])
    }    
  }


   const handleClick = async (e) => {
    e.preventDefault()
    setDate(e.target.dateForm.value)  

    const event = {
      "date": date,
      "guests": guestInvited,
    }

    await newEvent(event)
    await e.target.reset() 
    await props.getAllEvents()
  }


  const getUsers = async () => {
    const users = await fetchAllUsers()
    setGuest(users)
    return guests
  }

  useEffect(() => {
    getUsers()
  },[])

  return (
    <form onSubmit={(e) =>  handleClick(e)}>  
        {guests.map(user => {        
         return (    
            <div key={user._id} >
            <input  type="checkbox" onChange={(e) => toggle(e)} name={user._id} id={user.username}/>
            <label  htmlFor={user.username}  > {user.username} </label>
            </div>       
              )  
        })
      }
        <input onChange={(e) => setDate(e.target.value)}  type='date' name='dateForm' autoComplete='off' min={new Date().toISOString().split('T')[0] } ></input>
        <button type='submit'> Click </button>
    </form>
  )
}

export default EventForm