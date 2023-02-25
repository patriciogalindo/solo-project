import React, {useContext } from 'react';
import './Event.css'
import moment from "moment";
import { mainContext} from '../helper/Context'
import Card from '@mui/material/Card'
import {useNavigate} from "react-router-dom"
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage, responsive} from '@cloudinary/react';

function Event(props) {
  const {userContext} = useContext(mainContext)
  const navigate = useNavigate();

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'djspbi0jk'
    }
  }); 

  function handleClickSelect(e){
    navigate(`/event/${e}`)
  }
  

  return (
    <>
  
    <Card sx={{
      boxShadow: 2, 
      width: "20%",
      padding:".5%",
      marginBottom: "20px"
      }} className="event-card" >
      <div className='content-container' onClick={() =>  handleClickSelect(props.eventId)}>
      <AdvancedImage className='image' alt='eventPicture' cldImg={cld.image(`${props.picture}`)}  plugins={[responsive({steps:200})]}/>
      <div className='date-div'>
        <div className='ename-owner'>
      <h2 className="ename">   {props.ename}</h2>
      <p className="owner"> Organized by {props.owner.username}</p>
      </div>
      <h2 className="date-event"> {moment(props.date).format("MMM Do YY")} </h2>
      </div>
        
        
        <div className="guest-div">
          <h2 id="attending">Attending {props.guests.length} people</h2>
        </div>

      

        <div className='pending-activities'>
          
          {props.recomendations.some(e => e.owner === userContext._id) === false ?    
                <><p className='pending-suggested'>Suggested</p></> : <><p className='pending-suggested2'>Suggested</p></>
          }

          {props.votes.some(e => e.owner === userContext._id) === false ?  
          <><p className='pending-voted'>Voted</p></> : <><p className='pending-voted2'>Voted</p></>
          }
        </div>
    </div>
    </Card>
     </>
       )
}

export default Event