import React, { useState, useEffect } from "react";
import MatchSchedule from "../../components/mypage/myplab/MatchSchedule";
import MatchCompleted from "../../components/mypage/myplab/MatchCompleted";
import CalendarModal from "../../components/mypage/myplab/CalendarModal";
import TabNavigation from "../../components/mypage/myplab/TabNavigation";
import "./page-style.css";
import { config } from '../../config';


const MyPlabPage = () => {
  const api = config.aws.ec2_host_user
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
  const [selectedMonth, setSelectedMonth] = useState(new Date()); // 선택된 월
  const [activeTab, setActiveTab] = useState("schedule"); // 현재 활성화된 탭 ('schedule' or 'completed')
  const [calendarKey, setCalendarKey] = useState(Date.now()); // 캘린더 리렌더링을 위한 key 상태
  const [scheduleData, setScheduleData] = useState({
    upcomingSchedule: {
      upcomingMatches: [],
      cancelledMatches: [],
      underCapacityCancelledMatches: [],
    },
    completedSchedule: {
      completedMatches: [],
    },
  });

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await fetch(`${api}/mypage/myplab`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setScheduleData(data);
        // console.log("Schedule Data:", data);
      } catch (error) {
        console.error("Error fetching match schedule:", error.message);
      }
    };

    fetchScheduleData();
  }, [userId, token, api]);

  const handleDateSelect = (date) => {
    setSelectedDate(date); // 선택된 날짜를 상태에 저장
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month); // 선택된 월을 상태에 저장
    setSelectedDate(null); // 날짜 선택 초기화
  };

  const resetCalendar = () => {
    setSelectedDate(null); // 날짜 초기화
    setSelectedMonth(new Date()); // 월 초기화 (현재 월로 리셋)
    setCalendarKey(Date.now()); // 캘린더 리렌더링
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab); // 탭 상태 변경
    resetCalendar(); // 캘린더 상태 초기화 및 리렌더링
    if (tab === "completed") {
      setSelectedMonth(new Date()); // 현재 월로 설정
    }
  };

  return (
    <div className="app-layout">
      <div className="sidebar">
        <CalendarModal
          key={calendarKey} // 캘린더 리렌더링을 위한 key 추가
          events={scheduleData.upcomingSchedule.upcomingMatches}
          onDateSelect={handleDateSelect}
          onMonthChange={handleMonthChange}
          selectedDate={selectedDate}
          selectedMonth={selectedMonth}
        />
      </div>
      <div className="main-content">
        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        {activeTab === "schedule" ? (
          <MatchSchedule
            selectedDate={selectedDate}
            selectedMonth={selectedMonth}
            upcomingSchedule={scheduleData.upcomingSchedule}
            onResetDate={resetCalendar}
          />
        ) : (
          <MatchCompleted
            selectedDate={selectedDate}
            selectedMonth={selectedMonth}
            completedSchedule={scheduleData.completedSchedule}
          />
        )}
      </div>
    </div>
  );
};

export default MyPlabPage;
