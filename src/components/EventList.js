import React from 'react'
import Event from './Event'
import './EventList.css'

function EventList(props) {
    const info = props.events
  return (
    <div className='eventList'>
        {info.map(event => {
            return <Event
            key={event._id}
            eventId={event._id}
            date={event.date}
            owner={event.owner}
            guests={event.guests}
            ename={event.ename}
            picture={event.picture}
            recomendations={event.recomendation}
            votes={event.vote}
            />
        })}
    </div>
  )
}

export default EventList