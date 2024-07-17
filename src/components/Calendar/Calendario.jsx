import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from 'dayjs'

const localizer = dayjsLocalizer(dayjs)

const events = [
  {
    title: 'Event 1',
    start: dayjs('2024-07-09T09:00:00').toDate(),
    end: dayjs('2024-07-09T10:30:00').toDate(),
  }

]

const components = {
  event: props => {
    return (
      <div style={{
        borderRadius: '5px',
        fontWeight: 'lighter',
        cursor: 'pointer',
        padding: '10px',
        display: 'flex',
        justifyContent: 'left',
      }}>
        {props.event.title}
      </div>
    )

  }
}


const Calendario = () => {
  return (

  <section className='container'>  
    <div style={{
      height: '650px',
      width: '100%',  // Set your desired width here.
      margin: '0 10px 10px 10px',  // Center the calendar horizontally.
      padding: '10px',  // Add some padding for better readability.
      border: '1px solid #ccc',  // Add a border for better readability.
      borderRadius: '5px',  // Add a border radius for better aesthetics.
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',  // Add a shadow for better visual effect.
      fontSize: '14px',  // Set the font size for better readability.
    }}>
      <Calendar
        localizer={localizer} 
        dateFormatter={date => dayjs(date).format('DD/MM/YYYY')}
        timeFormatter={time => dayjs(time).format('HH:mm')}

        eventPropGetter={event => ({
          style: {
            backgroundColor: event.color,
            borderRadius: '5px',
            color: 'white',
            border: '0',
            display: 'block',
            padding: '10px',
            fontWeight: 'bold',
          },
        })}
        defaultView="week"
        views={['week', 'day','month']}
        scrollToTime={true}
        resizable

        selectable
        onSelectSlot={(slotInfo) => {
          const start = dayjs(slotInfo.start).toDate();
          const end = dayjs(slotInfo.end).toDate();
          const title = prompt('Enter a new event name')
          if (title) {
            events.push({ title, start, end, color: '#FF0000' });
            setEvents([...events]);
          }
        }}
        onEventDrop={(event, newStart, newEnd) => {
          const idx = events.indexOf(event)
          events[idx] = {...event, start: newStart, end: newEnd }
          setEvents([...events])
        }}
        onEventResize={(event, newStart, newEnd) => {
          const idx = events.indexOf(event)
          events[idx] = {...event, start: newStart, end: newEnd }
          setEvents([...events])
        }}
        onDragStart={(event, start, end) => console.log(event, start, end)}
        onDragEnd={(event, start, end) => console.log(event, start, end)}
        onEventClick={(event) => alert(`Clicked on event: ${event.title}`)}
       
        
        onSelectEvent={event => alert(`Clicked on event: ${event.title}`)}
        onViewChange={(view, start, end) => console.log(view, start, end)}


        events={events}
        startAccessor="start"
        endAccessor="end"
        min={dayjs('2024-01-01T08:30:00')}
        max={dayjs('2024-01-01T18:00:00')}
        components={components}
        style={{paddingTop:"60px",paddingBottom:"40px"}}
      />
    </div>
  </section>
  )
}



export default Calendario;
