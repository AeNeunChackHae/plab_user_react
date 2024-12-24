import React from "react";
import "./ActivityInfo.css";

const ActivityInfo = ({ avgDistance, avgCalories }) => {
  return (
    <div className="activity-info">
      <h3>🏃‍♂️ 활동량 정보</h3>
      <div className="info-container">
        <div className="info-container-info">
          <p>플랩매치 평균이동거리</p>
          <h2>{avgDistance} km</h2>
        </div>
        <div className="info-container-info">
          <p>플랩매치 평균소모칼로리</p>
          <h2>{avgCalories} kcal</h2>
        </div>
      </div>
    </div>
  );
};

export default ActivityInfo;
