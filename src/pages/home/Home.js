import EventList from '../../components/EventList';
import './Home.css';
import { fetchAllEvents, getUserById } from '../../services/services';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import {mainContext, eventContext, navContext} from '../../helper/Context';
import ScreenLogin from '../../screens/Login';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import { useNavigate } from "react-router-dom";

function Home() {
  const [loadedEvents, setLoadedEvents] = useState([])
  const {userContext, setUserContext} = useContext(mainContext)
  const {selectedEventContext, setSelectedEventContext} = useContext(eventContext)
  const [userLoggedIn, setUserLoggedin] = useState(false) 
  // const[recomendationsbyId, setRecomendationsbyiD] = useState([])
  const navigate = useNavigate()

  function handleClickReq(e){
    e === 'add-event' ? navigate('/addEvent') : navigate('/friends')
}

  const getAllEvents = async () => {
    const events = await fetchAllEvents()
     setLoadedEvents(events)
     setSelectedEventContext(events[0])
  }

  const getuser = async () => {
    const user = await getUserById()
    setUserContext(user)    
  }
  
  const loggedIn = async () => {
    const loggedIn = localStorage.getItem('token')
    if(loggedIn) setUserLoggedin(true)
  }


  useEffect(() => {
    getuser()
  }, [])

  useEffect(() => {
   getAllEvents()
  },[])

  useEffect(() => {
    loggedIn()
  },[])

 

  return (

    <>

    {!userLoggedIn && <ScreenLogin/>}

      {userLoggedIn && 
      <>     
       <div id = 'secondaryContainer'>  
       <div className='home-header'>      
        <h1 className='my-events'> Events </h1> 
        <div className="add-event"
                onClick={() => handleClickReq("add-event")}
                >
                <InsertInvitationIcon 
                 id="add-event-icon"
                sx={{
                heigth: 80, 
                width: 80,
                }}
                />
                </div>
        </div>
        

          {loadedEvents.length > 0 &&
          <div id='eventListContainer'>
          <EventList events={loadedEvents}/>
          </div>
            }
          
          {loadedEvents.length === 0 &&
          <div id='eventListContainer'>
          <h1 className='noevents'>You have no Events </h1>
          </div>
            }

        </div>
    </>
}
</>
  );
 
}

export default Home;