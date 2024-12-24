import React from "react";
import { useNavigate } from "react-router-dom";

const ExitConfirmation = () => {
  const navigate = useNavigate();

  const handletomain = () => {
    navigate("/");
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "50px", marginBottom: "50px" }}
    >
      <h1>😢</h1>
      <h3>지금 바로 탈퇴할 수 없어요</h3>
      <p>운영 중인 팀</p>
      <p>
        팀 페이지-설정에서 팀을 삭제하거나 고객 센터에 운영자 양도를
        신청해주세요.
      </p>
      <button
        onClick={handletomain}
        style={{
          backgroundColor: "#1E90FF",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        돌아가기
      </button>
    </div>
  );
};

export default ExitConfirmation;
