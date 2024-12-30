import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MatchSchedule from "../../components/mypage/myplab/MatchSchedule";
import MatchCompleted from "../../components/mypage/myplab/MatchCompleted";
import CalendarModal from "../../components/mypage/myplab/CalendarModal";
import "./page-style.css";

const MyPlabPage = () => {
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
  const events = [
    {
      date: "2024-10-22",
      description: "영등포 다이아구장",
      status: "completed",
    },
    {
      date: "2024-11-25",
      description: "고양 킨텍스 고양구장",
      status: "completed",
    },
    {
      date: "2024-11-29",
      description: "용산 아이파크몰 맨유 구장",
      status: "cancelled",
    },
    {
      date: "2024-12-12",
      description: "어린이 대공원 풋살장",
      status: "completed",
    },
    {
      date: "2024-12-29",
      description: "잠실 스타디움 A구장",
      status: "confirmed",
    },
    {
      date: "2025-01-01",
      description: "잠실 스타디움 B구장",
      status: "confirmed",
    },
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="app-layout">
      {/* 왼쪽 사이드바 */}
      <div className="sidebar">
        <CalendarModal events={events} onDateSelect={handleDateSelect} />
      </div>
      {/* 오른쪽 메인 영역 */}
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <MatchSchedule selectedDate={selectedDate} events={events} />
            }
          />
          <Route
            path="/completed"
            element={
              <MatchCompleted selectedDate={selectedDate} events={events} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default MyPlabPage;
