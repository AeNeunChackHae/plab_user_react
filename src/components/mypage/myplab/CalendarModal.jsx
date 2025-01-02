import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarModal.css";

const CalendarModal = ({ onDateSelect, onMonthChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date); // 선택된 날짜 상태 업데이트
    onDateSelect(date); // 날짜 선택 시 이벤트 전달
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setCurrentMonth(activeStartDate); // 현재 월 업데이트
    onMonthChange(activeStartDate); // 부모 컴포넌트에 월 변경 전달
  };

  return (
    <div className="calendar-modal">
      <Calendar
        onChange={handleDateChange}
        onActiveStartDateChange={handleActiveStartDateChange}
        value={selectedDate || currentMonth}
        formatDay={(locale, date) => date.getDate()} // 숫자만 표시
        tileClassName={({ date }) => {
          const isSaturday = date.getDay() === 6;
          const isSunday = date.getDay() === 0;
          if (isSaturday) return "tile-saturday";
          if (isSunday) return "tile-sunday";

          return "";
        }}
      />
    </div>
  );
};

export default CalendarModal;
