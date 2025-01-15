import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import MatchPage from "../pages/match/MatchPage";

function Match() {
  return (
    <>
      <Routes>
        <Route path="/:match_id" element={<MatchPage />} />
        {/* <Route path="/" element={<Navigate to="/" />} /> */}
      </Routes>
    </>
  );
}

export default Match;