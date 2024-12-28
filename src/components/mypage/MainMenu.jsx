import React from "react";
import { Link } from "react-router-dom";
import "./MainMenu.css";

const MainMenu = () => {
  return (
    <div className="main-menu">
      {/* 나의 플랩 */}
      <div className="menu-category">
        <div className="menu-header">
          <h3>나의 플랩</h3>
        </div>
        <div className="menu-items">
          <Link to="/applications" className="menu-link">
            <span className="icon">📄</span> 신청 내역
          </Link>

          <Link to="/blacklist" className="menu-link">
            <span className="icon">🚫</span> 블랙리스트 관리
          </Link>

          <Link to="/edit-profile" className="menu-link">
            <span className="icon">✏️</span> 프로필 수정
          </Link>

          <Link to="/settings" className="menu-link">
            <span className="icon">⚙️</span> 설정
          </Link>
        </div>
      </div>

      {/* 고객센터 */}
      <div className="menu-category">
        <div className="menu-header">
          <h3>고객센터</h3>
        </div>
        <div className="menu-items">
          <Link to="/inquiries" className="menu-link">
            <span className="icon">❓</span> 이용 문의
          </Link>

          <Link to="/announcements" className="menu-link">
            <span className="icon">📢</span> 공지 사항
          </Link>
        </div>
      </div>

      {/* 더보기 */}
      <div className="menu-category">
        <div className="menu-header">
          <h3>더보기</h3>
        </div>
        <div className="menu-items">
          <Link to="/about" className="menu-link">
            <span className="icon">ℹ️</span> 플랩포털 소개
          </Link>

          <Link to="/manager-support" className="menu-link">
            <span className="icon">🤝</span> 매니저 지원
          </Link>

          <Link to="/partnerships" className="menu-link">
            <span className="icon">🏟️</span> 구장 제휴
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
