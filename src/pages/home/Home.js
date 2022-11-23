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
  const {selectedNavContext, setSelectedNavContext} = useContext(navContext)

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



  useEffect(() => {
    getuser()
  }, [])

  useEffect(() => {
   getAllEvents()
  },[])




  return (

    <>

    {localStorage.length === 0 && <ScreenLogin/>}

      {localStorage.length > 0 && 
      <>     
       <div id = 'secondaryContainer'>           
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