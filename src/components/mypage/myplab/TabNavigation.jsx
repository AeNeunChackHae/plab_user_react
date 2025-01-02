import React from "react";
import "./TabNavigation.css";

const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="tab-navigation">
      <button
        className={activeTab === "schedule" ? "tab active" : "tab"}
        onClick={() => onTabChange("schedule")}
      >
        매치 일정
      </button>
      <button
        className={activeTab === "completed" ? "tab active" : "tab"}
        onClick={() => onTabChange("completed")}
      >
        완료된 매치
      </button>
    </div>
  );
};

export default TabNavigation;