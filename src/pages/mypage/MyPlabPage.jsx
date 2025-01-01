import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MatchSchedule from "../../components/mypage/myplab/MatchSchedule";
import MatchCompleted from "../../components/mypage/myplab/MatchCompleted";
import CalendarModal from "../../components/mypage/myplab/CalendarModal";
import "./page-style.css";

const MyPlabPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="app-layout">
      <div className="sidebar">
        <CalendarModal events={events} onDateSelect={handleDateSelect} />
      </div>
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={<MatchSchedule selectedDate={selectedDate} />}
          />
          <Route
            path="/completed"
            element={<MatchCompleted selectedDate={selectedDate} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default MyPlabPage;
