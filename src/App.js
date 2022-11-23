import './App.css';
import { useState } from 'react';
import {mainContext, eventContext, navContext} from './helper/Context';
import Home from './pages/home/Home';
import EventPage from './pages/event/EventPage'
import {Route, Routes} from 'react-router-dom'
import NavBar from './components/navBar/NavBar';

function App() {
  const [userContext, setUserContext] = useState({})
  const [selectedEventContext, setSelectedEventContext] = useState()
  const[selectedNavContext, setSelectedNavContext] = useState()

  return (
 
    <mainContext.Provider  value={{userContext, setUserContext}}>
      <eventContext.Provider value={{selectedEventContext, setSelectedEventContext}}>
        <navContext.Provider value={{selectedNavContext, setSelectedNavContext}}>

        {localStorage.length > 0 && <NavBar/> }  

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/event/:id' element={<EventPage/>} />
      </Routes>
   

        </navContext.Provider>
      </eventContext.Provider>
    </mainContext.Provider>
  );

 
}

export default App;


