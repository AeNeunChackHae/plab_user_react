import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TabNavigation.css";

const TabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "매치 일정", path: "/mypage/myplab" },
    { label: "완료된 매치", path: "/mypage/myplab/completed" },
    { label: "구장 예약", path: "/mypage/myplab/stadium" },
  ];

  return (
    <div className="tab-navigation">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={location.pathname === tab.path ? "tab active" : "tab"}
          onClick={() => navigate(tab.path)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
