
import React from "react";
import { Routes, Route } from "react-router-dom";
import StadiumPage from "../pages/stadium/StadiumPage"

function Stadium() {
  return (
    <>
      <Routes>
        <Route path="/:stadium_id/info/" element={<StadiumPage />} />
      </Routes>
    </>
  );
}

export default Stadium;

