import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/team/DashboardPage';
import TeamProfilePage from '../pages/team/TeamProfilePage';
import TeamEditPage from '../pages/team/TeamEditPage';
import WaitPage from '../pages/team/WaitPage';
import TeamJoinMemberPage from '../pages/team/TeamJoinMemberPage'

const Team = () => {
  return (
    <Routes>
      {/* 팀 대시보드 */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* 특정 팀 프로필 페이지 (teamCode로 접근) */}
      <Route path="/profile/:teamCode" element={<TeamProfilePage />} />

      {/* 팀 설정 페이지 */}
      <Route path="/:teamCode/edit" element={<TeamEditPage />} />

      {/* 나의 가입 신청 내역 페이지 */}
      <Route path="/wait" element={<WaitPage />} />

      {/* 팀원 가입 신청 목록 페이지 */}
      <Route path="/:teamCode/member" element={<TeamJoinMemberPage/>} />
    </Routes>
  );
};

export default Team;
