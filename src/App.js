import './App.css';
import { useState } from 'react';
import {mainContext, eventContext, navContext} from './helper/Context';
import Home from './pages/home/Home';
import EventPage from './pages/event/EventPage'
import EventForm from './components/EventForm'
import AddFriend from './components/AddFriend/AddFriend'
import {Route, Routes} from 'react-router-dom'
import NavBar from './components/navBar/NavBar';

function App() {
  const [userContext, setUserContext] = useState({})
  const [selectedEventContext, setSelectedEventContext] = useState()
  const[numberNavContext, setNumberNavContext] = useState(true)

  return (
 
    <mainContext.Provider  value={{userContext, setUserContext}}>
      <eventContext.Provider value={{selectedEventContext, setSelectedEventContext}}>
        <navContext.Provider value={{numberNavContext, setNumberNavContext}}>

        {localStorage.length > 0 && <NavBar/> }  

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/event/:id' element={<EventPage/>} />
        <Route path='/addEvent' element={<EventForm/>} />
        <Route path='/friends' element={<AddFriend/>} />
      </Routes>
   

        </navContext.Provider>
      </eventContext.Provider>
    </mainContext.Provider>
  );

 
}

export default App;


