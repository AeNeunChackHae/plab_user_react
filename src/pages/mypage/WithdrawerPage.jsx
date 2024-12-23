import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExitPage from "./ExitPage";
import ExitConfirmation from "../../components/mypage/withdrawal/ExitConfirmation";
import ExitComplete from "../../components/mypage/withdrawal/ExitComplete";

function WithdrawerPage() {
  const [username] = useState("민기");
  const [gamesPlayed] = useState(10);
  const [praiseCount] = useState(5);
  const [hasTeam] = useState(false); // 운영 중인 팀 여부

  const handleExit = (navigate) => {
    if (hasTeam) {
      navigate("/withdrawal/confirmation");
    } else {
      navigate("/withdrawal/complete");
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
            onExit={(navigate) => handleExit(navigate)}
          />
        }
      />
      <Route path="/confirmation" element={<ExitConfirmation />} />
      <Route path="/complete" element={<ExitComplete />} />
    </Routes>
  );
}

export default WithdrawerPage;
