import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarModal.css";

const CalendarModal = ({ events = [], onDateSelect }) => {
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
        formatDay={(locale, date) => date.getDate()} // 숫자만 표시
      />
    </div> // 찍은 값을 
  );
};

export default CalendarModal;
