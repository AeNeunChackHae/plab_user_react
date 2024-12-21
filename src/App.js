import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Match from "./router/Match";
import Navbar from "./components/header/Navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* pages element 리턴 */}
        <Route path="/" element={<Main />} />
        <Route path="/cs" element={<Cs />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/about" element={<About />} />

        {/* router element 리턴 */}
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/mypage/*" element={<Mypage />} />
        <Route path="/manager/*" element={<Manager />} />
        <Route path="/stadium/*" element={<Stadium />} />
        <Route path="/match/*" element={<Match />} />
        <Route path="/team/*" element={<Team />} />
        <Route path="/rental/*" element={<Rental />} />
        <Route path="/explore/*" element={<Explore />} />
        <Route path="/league/*" element={<League />} />
        <Route path="/order/*" element={<Order />} />
        <Route path="/term/*" element={<Term />} />

        {/* 404 페이지 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
