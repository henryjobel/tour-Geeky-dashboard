'use client';
import React, { useState } from 'react';
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Initialize moment for localizer
const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const CalendarComponent: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [newEvent, setNewEvent] = useState<Event>({ title: '', start: new Date(), end: new Date() });

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const start = slotInfo.start as Date;
    const end = slotInfo.end as Date;
    setNewEvent({ ...newEvent, start, end });
    setSelectedDate(start);
  };

  const handleAddEvent = () => {
    if (newEvent.title) {
      setEvents([...events, newEvent]);
      setNewEvent({ title: '', start: new Date(), end: new Date() });
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Calendar</h2>

      <div className="w-full max-w-7xl">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          selectable
          onSelectSlot={handleSelectSlot}
          className="bg-white border border-gray-200 rounded-lg "
        />
      </div>

      <div className="mt-8 w-full max-w-md bg-white p-6 rounded-lg ">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Event</h3>
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => {
            setSelectedDate(date);
            if (date) {
              setNewEvent({ ...newEvent, start: date, end: new Date(date.getTime() + 60 * 60 * 1000) }); // Default end time +1 hour
            }
          }}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-gray-50 text-gray-800"
        />
        <button
          onClick={handleAddEvent}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md  "
        >
          Add Event
        </button>
      </div>
    </div>
  );
};

export default CalendarComponent;
