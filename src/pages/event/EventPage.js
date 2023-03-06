import React, { useEffect, useState, useContext } from "react";
import { getEventById, getUserById, addVote, addWinner} from "../../services/services";
import './EventPage.css'
import moment from "moment";
import SuggestionForm from '../../components/SuggestionForm'
import {mainContext} from '../../helper/Context'
import { Button } from "@mui/material";
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage, responsive} from '@cloudinary/react';

function EventPage(){
    const [mainEvent, setMainEvent] = useState({})
    const {userContext, setUserContext} = useContext(mainContext)
    const [winnerCtx, setWinnerCtx] = useState()

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'djspbi0jk'
        }
      }); 
    

    const getEvent = async () => {
        const e =   await getEventById(window.location.pathname.split("/")[2])
        if(e.guests.length === e.vote.length){
            rankingVotes(e.vote)
            if(e.winner === false){
                const winner = 
                        {   
                            id: e._id,
                            winner: true
                        }
                await addWinner(winner)
            } 
            const d =   await getEventById(window.location.pathname.split("/")[2])
            setMainEvent(d)
        } else{
            setMainEvent(e)
        }
        
    }


    const getuser = async () => {
        const user = await getUserById()
        setUserContext(user)    
      }

    useEffect(() => {
        getEvent()
    }, [])

    useEffect(() => {
        getuser()
      }, [])

    function checkvotes(){
      const bool =  mainEvent.vote.some((e) =>  e.owner === userContext._id)
      return bool 
    }

    function rankingVotes(arr){
        let votes = {}
        for(let a of arr){
            votes[a.venue] ? votes[a.venue]++ : votes[a.venue] = 1
        }
       const sorted =  Object.entries(votes).sort((a,b) => b[1] - a[1])
       if(sorted.length === 1) setWinnerCtx(sorted[0][0])
       if(sorted.length > 1 && sorted[0][1] !== sorted[1][1]) setWinnerCtx(sorted[0][0])
    }

    const handleClick = async (e) => {
        const vote = 
        {
            recomendation: e.target.dataset.recomendationId,
            venue: e.target.dataset.venueId,
            event: mainEvent._id
        }     
        await addVote(vote)
        await getEvent()    
    }

 
    return(
        <>
        {mainEvent._id && 
        <div className="container-ep">
        <AdvancedImage alt="eventImage" cldImg={cld.image(`${mainEvent.picture}`)}  plugins={[responsive({steps:200})]} className="imageEvent"/>


        <div className="header">
            <div className="ename-date">  
            <div className="ename-invited">
        <h1 className="ename-ep">{mainEvent.ename}</h1>
        </div>
        </div>
        </div>

        <div className="secondary-container">
            <div className="left">
        <div className="guests">
        <h2 className="invitedBy"> Organized by {mainEvent.owner.username} </h2>
        <h1 className="date-eventpage"> {moment(mainEvent.date).format("MMM Do YY")}</h1>
        <h2 className="sinopsis-eventpage">{mainEvent.sinopsis}</h2>
            <h1 className="attending">Attending</h1>
            <div className="guest-div-ep">
        {mainEvent.guests.map((e, index) => {
            return(<div key={index} className="attending-list">
                <h2 className="attending-username">{e.username}</h2>
                <AdvancedImage alt="eventpage-av" className="eventpage-avatar"
                cldImg={cld.image(`${e.avatar}`)}  plugins={[responsive({steps:200})]}/>

            </div>)

        })}
        </div>
        </div>
        </div>



        <div className="right">
        {mainEvent.recomendation.some(e => e.owner === userContext._id) === false &&
        <>          
                <div className="suggestions">
                    {mainEvent.recomendation.length > 0 &&
                    <>
                
                <div className="currentSuggestions">
                <h1>Your friends suggested</h1>
                
                
                <div className="individual-suggestion-div">
                {mainEvent.recomendation.map((e, index) => {
                    return(<span key={e._id} className="suggestion">{ (index ? ', ' : '') + e.venue}  </span>)
                })}
                </div>
                </div>
                </>
        }

        {mainEvent.recomendation.length === 0 && 
        <h1 className="currentSuggestions">Nobody has suggested</h1>
        }
    <SuggestionForm 
    eventIdprop = {mainEvent._id}
    getEvent = {getEvent}
    /> 
    </div>
    </>
        }

        {mainEvent.recomendation.some(e => e.owner === userContext._id) === true && checkvotes() === false && !winnerCtx &&
        <div className="ranking">
       {mainEvent.recomendation.map((e, index) => {
        return (
        <div key={index} className="venue-vote-btn">
        <div className="venue">{e.venue}</div>
        <div className="votes">{e.votes}</div>
        <div className="vote-btn">
            <Button
            sx={{color:"blue", 
                 cursor:"pointer"    
        }}
        className="ep-vote-btn"
        data-venue-id={e.venue}
        data-recomendation-id={e._id}
        data-event-id={e.event} 
        onClick={handleClick}
        > Vote </Button>
        </div>
        </div>
        )
       })}
       </div>
        }

        {mainEvent.recomendation.some(e => e.owner === userContext._id) === true && checkvotes(userContext._id) === true && !winnerCtx &&
        <>
            <h1 className="voting-process">Voting going on </h1>
            {mainEvent.recomendation.map((e, index) => {
                return(
                    <div key={index} className="venue">{e.venue}</div>
                )
            })
        }
        </>
        }

            {mainEvent.recomendation.some(e => e.owner === userContext._id) === true && checkvotes(userContext._id) === true && winnerCtx &&
            <div className="top">
                <h1 className="we-have-winner">We have a winner</h1>
                <h1 className="mainevent-winner">{winnerCtx}</h1>
            </div>
        }
        </div>
        </div>
        </div>
        }
        </>
    )


    
}

export default EventPage