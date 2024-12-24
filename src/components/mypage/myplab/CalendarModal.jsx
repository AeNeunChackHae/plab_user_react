import React from "react";
import Calendar from "react-calendar"; // 설치 필요: npm install react-calendar
import "react-calendar/dist/Calendar.css";
import "./CalendarModal.css";

const CalendarModal = ({ events, reservation, onDateSelect }) => {
  const handleDateChange = (date) => {
    onDateSelect(date);
  };

  return (
    <div className="calendar-modal">
      <Calendar
        onChange={handleDateChange}
        tileContent={({ date }) => {
          const matchOnDate = events.some(
            (event) =>
              new Date(event.date).toDateString() === date.toDateString()
          );
          return matchOnDate ? <div className="match-dot"></div> : null;
        }}
        formatDay={(locale, date) => `${date.getDate()}`} // '18일' -> '18'
      />
    </div>
  );
};

export default CalendarModal;
