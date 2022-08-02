import EventList from './components/EventList';
import './App.css';
import { fetchAllEvents, getUserById } from './services/services';
import { useState } from 'react';
import { useEffect } from 'react';
import EventForm from './components/EventForm';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import {mainContext} from './helper/Context'


function App() {
  const [loadedEvents, setLoadedEvents] = useState([])

  const getAllEvents = async () => {
    const events = await fetchAllEvents()
     setLoadedEvents(events)
     return loadedEvents
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



  const [userContext, setUserContext] = useState({})



  return (
 
    <mainContext.Provider  value={{userContext, setUserContext}}>
    <div className='container'>



    {localStorage.length !== 1 &&
      <>    
      <Login/>
       <Register/>
       </> 
      
    }
   
      {localStorage.length === 1 && 
      <>      
    <Logout/>
    <EventList events={loadedEvents}/>
    <EventForm
    getAllEvents = {getAllEvents}
    />
    </>

      }
    
    </div>
    </mainContext.Provider>
  );

 
}

export default App;


