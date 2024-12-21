import React from 'react';
import styles from './TeamProfile.module.css';

const Overview = ({ team }) => (
  <div>
    <h3>팀 정보</h3>
    <p>지역: {team.location}</p>
    <p>홈 구장: {team.stadium}</p>
    <p>모임 시간: {team.meetingTime}</p>
    <p>평균 나이: {team.averageAge}세</p>
    <p>레벨: {team.level}</p>
  </div>
);

export default Overview;
