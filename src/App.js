import EventList from './components/EventList';
import './App.css';
import { fetchAllEvents } from './services/services';
import { useState } from 'react';
import { useEffect } from 'react';
import EventForm from './components/EventForm';
import Login from './components/Login';

function App() {
  const [loadedEvents, setLoadedEvents] = useState([])

  const getAllEvents = async () => {
    const events = await fetchAllEvents()
     setLoadedEvents(events)
     return loadedEvents
  }

  useEffect(() => {
   getAllEvents()
  },[])

  return (
    <div className='container'>
      <Login/>
      {loadedEvents && 
    <EventList events={loadedEvents}/>
      }
    <EventForm/>
    </div>
    
  );

 
}

export default App;


