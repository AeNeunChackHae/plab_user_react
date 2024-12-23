import React from "react";
import { useNavigate } from "react-router-dom";

const ExitPage = ({ username, gamesPlayed, praiseCount, onExit }) => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>😢</h1>
      <p>
        지금까지 {gamesPlayed} 경기에서 {praiseCount} 번의 칭찬 메시지를
        받았어요!
      </p>
      <p>지금 탈퇴하면 {username}님의 소중한 기록들이 사라져요.</p>
      <h3>지금 탈퇴하면</h3>
      <ul style={{ listStyle: "none" }}>
        <li>- 탈퇴한 날로부터 30일 동안 재가입할 수 없어요.</li>
        <li>
          - 레드카드, 이용정지 이력이 있는 경우 영구적으로 재가입할 수 없어요.
        </li>
      </ul>
      <button
        onClick={() => onExit(navigate)}
        style={{
          backgroundColor: "#1E90FF",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        탈퇴하기
      </button>
    </div>
  );
};

export default ExitPage;
