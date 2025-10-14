import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; 

const Calendar = () => {
  const handleDateClick = (arg) => {
    alert(`Date clicked: ${arg.dateStr}`);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={[
          { title: 'Event 1', date: '2025-01-21' },
          { title: 'Event 2', date: '2025-01-22' }
        ]}
      />
    </div>
  );
};

export default Calendar;
