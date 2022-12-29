import React, { useEffect, useState, useContext } from "react";
import { fetchRecomendations, getEventById, getUserById, getVotesByEventId, addVote, addWinner} from "../../services/services";
import './EventPage.css'
import eventImage from '../../images/eventImage1.jpg';
import moment from "moment";
import SuggestionForm from '../../components/SuggestionForm'
import {mainContext} from '../../helper/Context'
import { Button } from "@mui/material";
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage, responsive} from '@cloudinary/react';

function EventPage(){
    const [mainEvent, setMainEvent] = useState({})
    const [recomendations, setRecomendations] = useState({})
    const {userContext, setUserContext} = useContext(mainContext)
    const [addedVote, setAddedVote] = useState(false)
    const [votes, setVotes] = useState()
    const [winnerCtx, setWinnerCtx] = useState("")

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'djspbi0jk'
        }
      }); 

    /////Get event
    
    const getEvent = async () => {
        const e =   await getEventById(window.location.pathname.split("/")[2])
        setMainEvent(e)
    }

        const getVotes = async() => {
        const a = await getVotesByEventId(window.location.pathname.split("/")[2])
        setVotes(a)
        if(mainEvent._id && a.length === mainEvent.guests.length) {
            setWinnerCtx(recomendations[0]._id)
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

    useEffect(() => {
        getVotes()
    }, [mainEvent])

    //////

    ////// Get Recomendations

    const getRecomendations = async () => {
       const rec = await fetchRecomendations(window.location.pathname.split("/")[2])
        setRecomendations(rec)
    }

    useEffect(() => {
        getRecomendations()
    }, [addedVote])


    function checkvotes(user){
      const bool =  votes.some((e) =>  e.owner === user )
      return bool 
    }

    const handleClick = async (e) => {
        const vote = 
        {
            recomendation: e.target.dataset.recomendationId,
            event: e.target.dataset.eventId
        }     
        await addVote(vote)
        getVotes()
        
        if(winnerCtx){
        const winner = {
            id: mainEvent._id,
            winner: winnerCtx
        }
        await addWinner(winner)

    }

        await setAddedVote(true)
    }


    ////////////////////////////////////////////
 
    return(
        <>
        {mainEvent._id && 
        <div className="container">
        <AdvancedImage alt="eventImage" cldImg={cld.image(`${mainEvent.picture}`)}  plugins={[responsive({steps:200})]} className="imageEvent"/>


        <div className="header">
            <div className="ename-date">  
            <div className="ename-invited">
        <h1 className="ename">{mainEvent.ename}</h1>
        <h2 className="invitedBy"> Organized by {mainEvent.owner.username} </h2>
        </div>
        <h1 className="date-eventpage"> {moment(mainEvent.date).format("MMM Do YY")}</h1>
        </div>
        </div>

        <div className="secondary-container">
            <div className="left">
        <div className="guests">
            <h1 className="attending">Attending</h1>
            <div className="guest-div">
        {mainEvent.guests.map((e, index) => {
            return( <span key={e._id} className="guest">{ (index ? ', ' : '') +  e.username}</span> )

        })}
        </div>
        </div>

        {recomendations.some(e => e.owner === userContext._id) === true && checkvotes(userContext._id) === true && winnerCtx === "" &&
        <div className="ranking">
        <h1 className="current-ranking"> Current Ranking </h1>
       {recomendations.map((e, index) => {
        return (
        <div key={index} className="venue-vote-btn">
        <div className="venue">{e.venue}</div>
        <div className="votes">{e.votes}</div>
        </div>
        )
       })}
       </div>
        }


        </div>



        <div className="right">
        {recomendations.some(e => e.owner === userContext._id) === false &&
        <>          

                <div className="suggestions">
                    {recomendations.length > 0 &&
                    <>
                <h1 className="currentSuggestions">Your friends suggested</h1>
                <div className="individual-suggestion-div">
                {recomendations.map((e, index) => {
                    return(<span key={e._id} className="suggestion">{ (index ? ', ' : '') + e.venue}  </span>)
                })}
                </div>
                </>
        }

        {recomendations.length === 0 && 
        <h1 className="currentSuggestions">Nobody has suggested</h1>
        }



    <SuggestionForm 
    eventIdprop = {mainEvent._id}
    getRecomendations= {getRecomendations}
    /> 
    </div>
    </>
        }



        {recomendations.some(e => e.owner === userContext._id) === true && checkvotes(userContext._id) === false && winnerCtx === "" &&
        <div className="ranking">
       {recomendations.map((e, index) => {
        return (
        <div key={index} className="venue-vote-btn">
        <div className="venue">{e.venue}</div>
        <div className="votes">{e.votes}</div>
        <div className="vote-btn">
            <Button
            sx={{color:"blue", 
                 cursor:"pointer"    
        }}
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

        {recomendations.some(e => e.owner === userContext._id) === true && checkvotes(userContext._id) === true && winnerCtx === "" &&
            <div className="top">
                <h1>Currently winning</h1>
                <h1>{recomendations[0].venue}</h1>
            </div>
        }

            {recomendations.some(e => e.owner === userContext._id) === true && checkvotes(userContext._id) === true && winnerCtx &&
            <div className="top">
                <h1>We have a winner</h1>
                <h1>{recomendations[0].venue}</h1>
            </div>
        }


        </div>

        </div>
        

        </div> /// container
        }
        </>
    )


    
}

export default EventPage