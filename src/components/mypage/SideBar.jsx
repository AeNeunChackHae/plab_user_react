import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

const Sidebar = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // 컴포넌트가 마운트될 때만 서버로부터 사용자 정보를 가져옴
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/mypage");
        if (!response.ok) {
          // 응답이 정상 범위(200~299)가 아닌 경우 에러 처리
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("데이터를 불러오지 못했습니다.");
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="sidebar">
      {/* 사용자명 표시 (데이터가 있으면 표시, 없으면 대체 텍스트) */}
      <h2 className="user-name">
        {userData ? userData.username : "사용자 이름 없음"}
      </h2>
      {/* 사용자 ID 표시 */}
      <p className="user-number">{userData ? userData.id : "ID 없음"}</p>

      <div className="info-container">
        {/* 예: 선호 포지션 박스 */}
        <div className="manager-box">
          <div className="manager-info">
            <span className="level-text">선호 포지션</span>
            <div className="emoji-level">
              {userData ? userData.prefer_position : "데이터 없음"}
            </div>
          </div>
        </div>

        {/* 레벨 박스 (level_code, level_name) */}
        <div className="level-box">
          <div className="level-info">
            <span className="level-text">레벨</span>
          </div>
          <div className="levelname-level">
            <span className="level-name">
              {userData ? userData.level_code : "데이터 없음"}
            </span>
          </div>
        </div>
      </div>

      {/* 홍보 배너 (링크) */}
      <Link to="/mypage/mylevel" className="promotion-message">
        <p id="banner-small">활동량 기록, 타인 평가를 통한</p>
        <p id="banner-big">
          <strong>개인 레벨 관리로 성장 하세요!</strong>
        </p>
      </Link>

      {/* 에러 메시지 표시 */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Sidebar;
