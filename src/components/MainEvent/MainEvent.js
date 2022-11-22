import React, {useContext} from "react";
import "./mainEvent.css"
import moment from "moment";
import { Card } from '@mui/material';
import {eventContext, mainContext} from '../../helper/Context';
import { hover } from "@testing-library/user-event/dist/hover";


function MainEvent({props}){
     const {selectedEventContext} = useContext(eventContext)

    return(
    <div id = 'eventFormContainer'>
    <Card
    sx={{
      height: 700, 
      width: 600,
      display: "flex",
      flexDirection: "column",
      "&:hover":{
     
      }
    }}
    >   

    {selectedEventContext === undefined  && 
    <div className="info-container">
        <div className="next-date">
        <h1 className="next"> Next Event </h1>
        <h1 className="main-date">{moment(props.date).format("MMM Do YY")}</h1>
        </div>
      <h1 className='main-ename'>{props.ename}</h1>
      <p className='main-username'>{props.owner.username}</p>
       
       
       {props.guests.map((e) => {
        return <p>Guest: {e.username}</p>
       })}
       </div>
       }

       {selectedEventContext !== undefined && 
           <div className="info-container">
           <div className="next-date">
           <h1 className="main-date">{moment(props.date).format("MMM Do YY")}</h1>
           </div>
         <h1 className='main-ename'>{props.ename}</h1>
         <p className='main-username'>{props.owner.username}</p>
          
          
          {props.guests.map((e) => {
           return <p>Guest: {e.username}</p>
          })}
          </div>
       
       }


      </Card>
    </div>
    )
}

export default MainEvent