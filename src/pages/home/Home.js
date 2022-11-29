import EventList from '../../components/EventList';
import './Home.css';
import { fetchAllEvents, getUserById } from '../../services/services';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import NavBar from '../../components/navBar/NavBar';
import {mainContext, eventContext, navContext} from '../../helper/Context';
import ScreenLogin from '../../screens/Login';


function Home() {
  const [loadedEvents, setLoadedEvents] = useState([])
  const {userContext, setUserContext} = useContext(mainContext)
  const {selectedEventContext, setSelectedEventContext} = useContext(eventContext)
  const [userLoggedIn, setUserLoggedin] = useState(false) 
  const[recomendationsbyId, setRecomendationsbyiD] = useState([])


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

  console.log(loadedEvents)


  return (

    <>

    {!userLoggedIn && <ScreenLogin/>}

      {userLoggedIn && 
      <>     
       <div id = 'secondaryContainer'>         
        <h1 className='my-events'> My events </h1>  
          <div id='eventListContainer'>
          <EventList events={loadedEvents}/>
          </div>
        </div>
    </>
}
</>
  );
 
}

export default Home;