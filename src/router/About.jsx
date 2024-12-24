import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "../pages/root/About";

function About() {
  return (
    <Routes>
      <Route path="/" element={<AboutPage />} />
    </Routes>
  );
}

export default About;
