import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react'
import { newEvent, getUserById } from '../services/services';
import './EventForm.css'
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import bar from '../images/bar.jpg'
import club from '../images/club.jpg'
import event from '../images/eventImage1.jpg'
import hiking from '../images/hiking.jpg'
import office from '../images/office.jpg'
import outdoors from '../images/outdoors.jpg'
import park from '../images/park.jpg'
import restaurant from '../images/restaurant2.jpg'
import { useNavigate } from 'react-router-dom';

function EventForm(props) {
  const [date, setDate] = useState('')
  const [guestsInvited, setGuestsInvited] = useState()
  const [eventName, setEventName] = useState('');
  const [currUser, setCurrUser] = useState()
  const [word, setWord] = useState("")  
  const [filteredData, setFilteredData] = useState("")
  const [picSelected, setPicSelected] = useState()
  const [pics] = useState([bar, club, event, hiking, office, outdoors, park, restaurant])
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
    const newArr = guestsInvited.map((e) => {
      return e.slice(-1)
    })
    console.log(newArr)
    const picture = picSelected
    setDate(e.target.dateForm.value)  
    const event = {
      "date": date,
      "guests": newArr, 
      "picture": picture,
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

function handleClickPhotos(e){
  setPicSelected(e.target.id)

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
       
       
       {!picSelected &&
       <>
       <div className='choose'> <h3> Choose a picture</h3></div>
        <div className='image-div' >
          {pics && pics.map((e, index) => {
             return <img className='ind-image' id={index} src={e} onClick={handleClickPhotos}/>
          })}
        </div>
        </>
}
        {picSelected &&
        <div className='selected-img-div' >
          <img className='ind-selected-img' src ={pics[picSelected]}/>
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