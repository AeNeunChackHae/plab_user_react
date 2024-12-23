import React from "react";
import "../pages/CSpage.css";

const CSContactButton = () => {
  const handleClick = () => {
    alert("문의하기 페이지로 이동합니다.");
  };

  return (
    <div>
      <h3>고객 센터</h3>
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
