import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoticePage from "../pages/root/Noticepage";

function Notice() {
  return (
    <Routes>
      <Route path="/" element={<NoticePage />} />
    </Routes>
  );
}

export default Notice;
