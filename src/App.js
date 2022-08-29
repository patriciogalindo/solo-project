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
    <div className='main-container'>

    {localStorage.length !== 1 &&
      <div className='loginPage'>    
        <div className='login'>
      <Login/>
      </div>
      <div className='register'>
       <Register/>
       </div>
       </div> 
      
    }
   
      {localStorage.length === 1 && 
      <div id = 'secondaryContainer'>           
        <div id = 'eventListContainer'>
          
          <EventList events={loadedEvents}/>
        </div>
        <div id = 'eventFormContainer'>
          <EventForm
          getAllEvents = {getAllEvents}
          />
        </div>

        <div className='logout-btn'>   
          <Logout/>
        </div>
    </div>

      }
    
    </div>
    </mainContext.Provider>
  );

 
}

export default App;


