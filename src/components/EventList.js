import React from 'react'
import Event from './Event'

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
            guest={event.guests}
            ename={event.ename}
            />
        })}
    </div>
  )
}

export default EventList