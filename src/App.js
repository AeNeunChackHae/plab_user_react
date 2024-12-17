import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MatchPage from "./Pages/MatchPage";
import StadiumPage from "./Pages/StadiumPage";
import Navbar from "./components/Header/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/match/:match_id" element={<MatchPage />} />
        <Route path="/stadium/:stadium_id/info"element={<StadiumPage/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
