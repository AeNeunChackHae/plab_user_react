import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ExitPage from "./ExitPage";
import ExitConfirmation from "../../components/mypage/withdrawal/ExitConfirmation";
import ExitComplete from "../../components/mypage/withdrawal/ExitComplete";

function WithdrawerPage() {
  const [username] = useState("민기");
  const [gamesPlayed] = useState(10);
  const [praiseCount] = useState(5);
  const [hasTeam] = useState(true); // 운영 중인 팀 여부

  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleExit = () => {
    if (hasTeam) {
      navigate("/confirmation"); // 조건에 따라 경로 이동
    } else {
      navigate("/complete");
    }
  };

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <ExitPage
            username={username}
            gamesPlayed={gamesPlayed}
            praiseCount={praiseCount}
            onExit={handleExit} // handleExit 함수 전달
          />
        }
      />
      <Route path="/confirmation" element={<ExitConfirmation />} />
      <Route path="/complete" element={<ExitComplete />} />
    </Routes>
  );
}

export default WithdrawerPage;
