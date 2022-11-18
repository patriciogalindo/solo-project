import EventList from './components/EventList';
import './App.css';
import { fetchAllEvents, getUserById } from './services/services';
import { useState } from 'react';
import { useEffect } from 'react';
import EventForm from './components/EventForm';
import {mainContext} from './helper/Context';
import ScreenLogin from './screens/Login/index';
import NavBar from "./components/navBar/NavBar"


function App() {
  const [loadedEvents, setLoadedEvents] = useState([])
  const [userContext, setUserContext] = useState({})

  const getAllEvents = async () => {
    const events = await fetchAllEvents()
     setLoadedEvents(events)
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
 
    <mainContext.Provider  value={{userContext, setUserContext}}>
   
    {localStorage.length === 0 && <ScreenLogin/>}
      
      {localStorage.length > 0 && 
      <>     
        <NavBar/>



       <div id = 'secondaryContainer'>           
        <div id = 'eventListContainer'>
          
          <EventList events={loadedEvents}/>
        </div>
        <div id = 'eventFormContainer'>
          <EventForm
          getAllEvents = {getAllEvents}
          />

        </div>
    </div>
    </>

      }

    </mainContext.Provider>
  );

 
}

export default App;


