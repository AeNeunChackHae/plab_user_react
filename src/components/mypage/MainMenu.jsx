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
          <Link to="/mypage/myplab" className="menu-link">
            <span className="icon">📄</span> 신청 내역
          </Link>

          <Link to="/mypage/blacklist" className="menu-link">
            <span className="icon">🚫</span> 블랙리스트 관리
          </Link>

          <Link to="/mypage/change/profile" className="menu-link">
            <span className="icon">✏️</span> 프로필 수정
          </Link>

          <Link to="/mypage/change/general" className="menu-link">
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
          <Link to="/cs" className="menu-link">
            <span className="icon">❓</span> 이용 문의
          </Link>

          <Link to="/notice" className="menu-link">
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

          <Link to="/manager/info" className="menu-link">
            <span className="icon">🤝</span> 매니저 지원
          </Link>

          <Link to="/form" className="menu-link">
            <span className="icon">🏟️</span> 구장 제휴
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
