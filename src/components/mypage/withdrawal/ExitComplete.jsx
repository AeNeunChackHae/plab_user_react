import React from "react";
import { useNavigate } from "react-router-dom";

const ExitComplete = () => {
  const navigate = useNavigate();

  const handletomain = () => {
    navigate("/");
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "50px", marginBottom: "50px" }}
    >
      <h3>탈퇴 처리가 완료됐어요</h3>
      <p>그동안 플랫폼을 이용해주셔서 진심으로 감사합니다.</p>
      <p>
        플랫폼의 즐거움을 다시 느끼고 싶을 땐, 언제든 돌아와 주세요. 항상
        건강하고 행복하세요!
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

export default ExitComplete;
