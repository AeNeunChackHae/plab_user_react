import React from "react";
import { Routes, Route } from "react-router-dom";
import PersonalSettingsPage from "../pages/mypage/PersonalSettingsPage";
import SettingsPage from "../pages/mypage/SettingPage";
import ProfilePage from "../pages/mypage/ProfilePage";
import MyPlabPage from "../pages/mypage/MyPlabPage";
import MyLevelPage from "../pages/mypage/MyLevelPage";
import WithdrawerPage from "../pages/mypage/WithdrawerPage";
import BlacklistManager from "../pages/mypage/BlackListPage";
import "../pages/mypage/page-style.css";
import PasswordChange from "../pages/mypage/PasswordChangePage";

function Mypage() {
  return (
    <Routes>
      {/* 완료 */}
      <Route path="/" element={<PersonalSettingsPage />} />
      <Route path="/myplab" element={<MyPlabPage />} />
      <Route path="/change/profile" element={<ProfilePage />} />
      <Route path="/blacklist" element={<BlacklistManager />} />
      <Route path="/change/pw" element={<PasswordChange />} />
      {/* 미완료 */}
      <Route path="/change/general" element={<SettingsPage />} />
      <Route path="/mylevel" element={<MyLevelPage />} />
      <Route path="/withdrawal/*" element={<WithdrawerPage />} />
    </Routes>
  );
}

export default Mypage;
