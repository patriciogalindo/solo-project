import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react'
import { fetchAllUsers, newEvent } from '../services/services';
import './EventForm.css'
import { Button } from '@mui/material';



function EventForm(props) {
  const [date, setDate] = useState('')
  const [guests, setGuest] = useState([]);
  const [guestInvited, setGuestInvited] = useState([])
  const [eventName, setEventName] = useState('');


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
      "ename": eventName
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
    <Card style={{
      height:600,
      width: 600
    }}>
    <div className='event-form-container'>
      <h1 id='h1-form'> Add new Event</h1> 


    <form className='form-class' onSubmit={(e) =>  handleClick(e)}>  
        {guests.map(user => {        
         return (          
            <div className="checkbox-class" key={user._id} >
            <input  type="checkbox" onChange={(e) => toggle(e)} name={user._id} id={user.username}/>
            <label  htmlFor={user.username}  > {user.username} </label>
            </div>       
              )  
        })
      }
        <input  onChange={(e) => setDate(e.target.value)}  type='date' name='dateForm' autoComplete='off' min={new Date().toISOString().split('T')[0] } >
        
        </input>
        <input type="text" name="eventName" placeholder="Event Name"  onChange={(e) => setEventName(e.target.value) }></input> 
        <Button type='submit'> Send </Button>

    </form>
    </div>
    </Card>
  )
}

export default EventForm