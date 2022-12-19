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
      responseUrl = response.data.secure_url
    })

    setDate(e.target.dateForm.value)  
    const event = {
      "date": date,
      "guests": newArr, 
      "picture": responseUrl,
      "ename": eventName
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
    <div className='main-container'>
    <Card style={{
      height:'60%',
      width: '30%',
    }}>
    <div className='event-form-container'>
      <h1 id='h1-form'> Add new Event</h1> 

    <form className='form-class' onSubmit={(e) =>  handleClick(e)}>  
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



        <input  className='date' onChange={(e) => setDate(e.target.value)}  type='date' name='dateForm' autoComplete='off' min={new Date().toISOString().split('T')[0] } >
        
        </input>
        <input type="text" name="eventName" placeholder="Event Name"  className='name' onChange={(e) => setEventName(e.target.value) }></input> 
       
       
       {/* {!picSelected &&
       <>
       <div className='choose'> <h2> Choose a picture or </h2> <h2 onClick={addOwnPic}>&nbsp; Add a your own</h2></div>
        <div className='image-div' >
          {pics && pics.map((e, index) => {
             return <img className='ind-image' id={index} src={e} onClick={handleClickPhotos}/>
          })}
        </div>
        </>
} */}
        {/* {picSelected &&
        <div className='selected-img-div' >
          <img className='ind-selected-img' src ={pics[picSelected]}/>
        </div>
        } */}

  
          <div><input type="file" 
          onChange={(e) => {
            setPictureInput(e.target.files[0])
          }}
          /></div>


        
        <Button type='submit' variant='contained'> Send </Button>




    </form>
    </div>
    </Card>
    </div>
  )
}

export default EventForm