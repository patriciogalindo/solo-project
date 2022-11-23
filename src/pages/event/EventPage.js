import React, { useEffect, useState } from "react";
import { fetchRecomendations, getEventById } from "../../services/services";
import './EventPage.css'
import NavBar from "../../components/navBar/NavBar";

function EventPage(){
    const [mainEvent, setMainEvent] = useState({})
    const [recomendations, setRecomendations] = useState({})

    /////Get event
    
    const getEvent = async () => {
        const e =   await getEventById(window.location.pathname.split("/")[2])
        setMainEvent(e)
    }

    useEffect(() => {
        getEvent()
    }, [])

    //////

    const getRecomendations = async () => {
       const rec = await fetchRecomendations(window.location.pathname.split("/")[2])
        setRecomendations(rec)
    }

    useEffect(() => {
        getRecomendations()
    }, [])
    


    return(
        <>
        <h1 className="ename">{mainEvent.ename}</h1>
        {/* <h1 className="owner"> {mainEvent.owner.username}</h1> */}
        </>
    )


    
}

export default EventPage