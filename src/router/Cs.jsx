import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CSpage from "../pages/root/CSpage";

function Cs() {
  return (
    <Routes>
      <Route path="/" element={<CSpage />} />
    </Routes>
  );
}

export default Cs;
