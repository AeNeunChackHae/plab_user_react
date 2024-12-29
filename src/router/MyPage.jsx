import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalSettingsPage from "../pages/mypage/PersonalSettingsPage";
import SettingsPage from "../pages/mypage/SettingPage";
import ProfilePage from "../pages/mypage/ProfilePage";
import MyPlabPage from "../pages/mypage/MyPlabPage";
import MyLevelPage from "../pages/mypage/MyLevelPage";
import WithdrawerPage from "../pages/mypage/WithdrawerPage";
import "../pages/mypage/page-style.css";

function Mypage() {
  return (
    <Routes>
      <Route path="/*" element={<PersonalSettingsPage />} />
      <Route path="/change/general" element={<SettingsPage />} />
      <Route path="/change/profile" element={<ProfilePage />} />
      <Route path="/myplab/*" element={<MyPlabPage />} />
      <Route path="/mylevel" element={<MyLevelPage />} />
      <Route path="/withdrawal/*" element={<WithdrawerPage />} />
    </Routes>
  );
}

export default Mypage;
