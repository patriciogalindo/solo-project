import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react'
import { newEvent, getUserById } from '../services/services';
import './EventForm.css'
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import Axios from "axios"

function EventForm(props) {
  const [date, setDate] = useState('')
  const [guestsInvited, setGuestsInvited] = useState()
  const [eventName, setEventName] = useState('');
  const [currUser, setCurrUser] = useState()
  const [word, setWord] = useState("")  
  const [filteredData, setFilteredData] = useState("")
  const [pictureInput, setPictureInput] = useState()
  const [picture, setPicture] = useState()
  const [sinopsis, setSinopsis ] = useState()
  const navigate = useNavigate()
  
  const getUser = async () =>{
   const user =  await getUserById()
    setCurrUser(user)
    setGuestsInvited([[user.username, user._id]])
  }




  useEffect(() => {
    getUser()
  },[])



   const handleClick = async (e) => {
    let responseUrl
    e.preventDefault()
    const newArr = guestsInvited.map((e) => {
      return e.slice(-1)
    })
    const formData = new FormData();
    formData.append('file', pictureInput)
    formData.append("upload_preset", "em2qqxhv")
    await Axios.post(
      "https://api.cloudinary.com/v1_1/djspbi0jk/image/upload", 
      formData
    ).then((response) => {
      responseUrl = response.data.public_id
    })

    setDate(e.target.dateForm.value)  
    const event = {
      "date": date,
      "guests": newArr, 
      "picture": responseUrl,
      "ename": eventName,
      "sinopsis": sinopsis
    }
    await newEvent(event)
    navigate('/')
  }

  function filtered(){
    if(currUser){
      const nonInvited = currUser.friends.filter(e => guestsInvited.some(a => a[1] === e._id) === false)
    const newA = nonInvited.filter(e => e.username.slice(0, (word.length)) === word)
    if(word.length > 0 ) {
      setFilteredData(newA)
    }else{
      setFilteredData([])
    }
  }
}



function handleIconClick(e){
let newArr = guestsInvited.filter((i) => {
 return i !== e
})
setGuestsInvited(newArr)
}



function handleChange(e){
  const ind = (e.target.selectedIndex - 1)
  const id = filteredData[ind]._id
  const val = e.target.value
  setGuestsInvited((prevState) =>  [ ...prevState, [val, id]])
  e.target.selectedIndex = 0
}


  useEffect(() => {
    filtered()
  }, [word])


/////////////////////////////////////////////////////////////////////////

  return (
    <div className='main-container-ef'>
    <Card className="card-eventform">
    <div className='event-form-container'>
      <h1 id='h1-form'> Add new Event</h1> 

    


    <form className='form-class' onSubmit={(e) =>  handleClick(e)}>  
    <div className='date-eventname-div'>
        <input type="text" name="eventName" placeholder="Event Name"  className='name' onChange={(e) => setEventName(e.target.value) }/>
        <textarea type="text" name="sinopsis" placeholder="Something about the event?"  rows="4"
        className='sinopsis' onChange={(e) => setSinopsis(e.target.value) }/>
        <input  className='date-eventform' onChange={(e) => setDate(e.target.value)}  type='date' name='dateForm' autoComplete='off'
         min={new Date().toISOString().split('T')[0] }/>

        
        </div>
       
      <div className='search-div'>
      <input
              type = "text"
              placeholder="Search a friend"
              onChange={(e) => setWord(e.target.value)}
              className="friend-search"
      />
      </div>  

      {filteredData.length > 0 && 
      <div className='dropdown-list'>
        <select size="4"  onChange={handleChange} className="dropdown">
          <option> Select an option</option>
          {filteredData.map((e, index) =>{
            return <option key={index} name={e.username}> {e.username}</option>
          })}
        </select>
      </div>
} 

{guestsInvited &&
<div className='guest-list'>
  {guestsInvited.map((e) => {
    return <div className='ind-guest-container'> 
          <p className='ind-guest'> {e[0]} </p>
          <div className='icon' onClick={() => handleIconClick(e)}>
          <CloseIcon 
          sx={{
            height: "12px", 
            width: "12px"
          }}
          />
          </div>
         </div>
  })}
</div>
}




          
          {!picture &&
          <div className='pic-input'>
            <input type="file" 
          onChange={(e) => {
            setPictureInput(e.target.files[0])
            setPicture(URL.createObjectURL(e.target.files[0]))
          }}
          /></div>
        }
          
          {picture &&
          <div className='picture-eventform-div'>
            <img className='picture-eventform' src={picture}/>
          </div>
          }

        
        <Button type='submit' variant='contained'> Send </Button>




    </form>
    </div>
    </Card>
    </div>
  )
}

export default EventForm