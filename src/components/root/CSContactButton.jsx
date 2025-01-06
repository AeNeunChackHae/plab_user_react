import React from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/root/CSpage.css";

const CSContactButton = () => {
  const navigate = useNavigate();

  // 문의하기 페이지로 이동
  const handleClick = () => {
    navigate("/contact");  // 문의 페이지로 라우팅
  };

  return (
    <div>
      <h3 className="title_h3">고객 센터</h3>
      <ul>
        <li>상담 시간: 매일 10:00 ~ 18:00</li>
        <li>전화 상담은 하지 않고 있어요.</li>
      </ul>
      <button className="contact-button" onClick={handleClick}>
        문의하기
      </button>
    </div>
  );
};

export default CSContactButton;
