import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/header/navbar/Navbar";
import Main from "./router/Main";
import Cs from "./router/Cs";
import Notice from "./router/Notice";
import About from "./router/About.jsx";
import Auth from "./router/Auth";
import Mypage from "./router/MyPage";
import Manager from "./router/Manager";
import Stadium from "./router/Stadium";
import Match from "./router/Match";
// import Team from "./router/Team";
// import Rental from "./router/Rental";
import Explore from "./router/Explore";
// import League from "./router/League";
import Order from "./router/Order";
import Term from "./router/Term";
import Footer from "./components/footer/Footer";
import NotFound from "./router/NotFound";
import Form from './pages/form/Form.jsx'

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
        <Route path="/form" element={<Form />} />

        {/* router element 리턴 */}
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/mypage/*" element={<Mypage />} />
        <Route path="/manager/*" element={<Manager />} />
        <Route path="/stadium/*" element={<Stadium />} />
        <Route path="/match/*" element={<Match />} />
        {/* <Route path="/team/*" element={<Team />} /> */}
        {/* <Route path="/rental/*" element={<Rental />} /> */}
        <Route path="/explore/*" element={<Explore />} />
        {/* <Route path="/league/*" element={<League />} /> */}
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
