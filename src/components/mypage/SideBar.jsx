import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

const Sidebar = ({ userName, userNumber, hideLevel, setHideLevel }) => {
  const [mannerData, setMannerData] = useState({
    emoji: "😊",
    text: "좋아요",
  });

  const [levelData, setLevelData] = useState({
    level: "R",
    levelName: "루키",
  });

  useEffect(() => {
    // 서버에서 매너 데이터를 가져오는 함수
    const fetchMannerData = async () => {
      try {
        const response = await fetch("https://example.com/api/manner"); // API URL 변경 필요
        const data = await response.json();
        setMannerData({
          emoji: data.emoji,
          text: data.text,
        });
      } catch (error) {
        console.error("Error fetching manner data:", error);
      }
    };

    // 서버에서 레벨 데이터를 가져오는 함수
    const fetchLevelData = async () => {
      try {
        const response = await fetch("https://example.com/api/level"); // API URL 변경 필요
        const data = await response.json();
        setLevelData({
          level: data.level,
          levelName: data.levelName,
        });
      } catch (error) {
        console.error("Error fetching level data:", error);
      }
    };

    fetchMannerData();
    fetchLevelData();
  }, []);

  return (
    <div className="sidebar">
      <h2 className="user-name">{userName}</h2>
      <p className="user-number">{userNumber}</p>
      <div className="info-container">
        <div className="manager-box">
          <div className="manager-info">
            <span className="level-text">매너</span>
            <div className="emoji-level">
              <span className="emoji">{mannerData.emoji}</span>{" "}
              {mannerData.text}
            </div>
          </div>
        </div>
        <div className="level-box">
          <div className="level-info">
            <span className="level-text">레벨</span>
            <span
              className="toggle-button"
              onClick={() => setHideLevel(!hideLevel)}
            >
              {hideLevel ? "🙈" : "🙉"}
            </span>
          </div>
          <div className="levelname-level">
            <span className="level">{hideLevel ? "" : levelData.level}</span>
            <span className="level-name">
              {hideLevel ? "" : levelData.levelName}{" "}
              {/* hideLevel에 따라 숨기기 */}
            </span>
          </div>
        </div>
      </div>
      <Link to="/promotion" className="promotion-message">
        <p id="banner-small">활동량 기록, 타인 평가를 통한</p>
        <p id="banner-big">
          <strong>개인 레벨 관리로 성장 하세요!</strong>
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
