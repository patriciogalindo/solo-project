import EventList from './components/EventList';
import './App.css';
import { fetchAllEvents, getUserById } from './services/services';
import { useState } from 'react';
import { useEffect } from 'react';
import EventForm from './components/EventForm';
import {mainContext, eventContext, navContext} from './helper/Context';
import ScreenLogin from './screens/Login/index';
import NavBar from "./components/navBar/NavBar"
import AddFriend from './components/AddFriend/AddFriend';
import MainEvent from './components/MainEvent/MainEvent';


function App() {
  const [loadedEvents, setLoadedEvents] = useState([])
  const [userContext, setUserContext] = useState({})
  const [selectedEventContext, setSelectedEventContext] = useState()
  const[selectedNavContext, setSelectedNavContext] = useState()
  const[recomendationsbyId, setRecomendationsbyiD] = useState([])

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
      <eventContext.Provider value={{selectedEventContext, setSelectedEventContext}}>
        <navContext.Provider value={{selectedNavContext, setSelectedNavContext}}>

   
    {localStorage.length === 0 && <ScreenLogin/>}
      
      {localStorage.length > 0 && 
      <>     
        <NavBar/>



       <div id = 'secondaryContainer'>           
        <div id = 'eventListContainer'>
          
          <EventList events={loadedEvents}/>
        </div>

        {selectedNavContext === "add-event"  && 
                  <div id = 'eventFormContainer'>
                  <EventForm
                  getAllEvents = {getAllEvents}
                  />
        
                </div>
        }
        
        {selectedNavContext === "request-received" && 
        <div id = 'eventFormContainer'>
            <AddFriend/>
          </div>
}

        {selectedNavContext !== "add-event" && selectedNavContext !== "request-received" && selectedEventContext &&
        <MainEvent props={selectedEventContext}/>
        }

        {!selectedEventContext  && !selectedNavContext && loadedEvents.length > 0 &&
        <MainEvent props={loadedEvents[0]} />
        }



    </div>
    </>

      }
        </navContext.Provider>
      </eventContext.Provider>
    </mainContext.Provider>
  );

 
}

export default App;


