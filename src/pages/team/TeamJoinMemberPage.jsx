import React, { useState } from 'react';
import JoinRequestList from '../../components/team/teamJoin/JoinRequestList';
import styles from './TeamJoinMemberPage.module.css';
import dummyJoinRequests from '../../components/dummydata/dummyJoinRequests.json';

const TeamJoinMemberPage = () => {
  const [joinRequests, setJoinRequests] = useState(dummyJoinRequests.requests);

  const handleApprove = (id) => {
    setJoinRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: '승인 완료' } : req))
    );
  };

  const handleReject = (id) => {
    setJoinRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <div className={styles.container}>
      {/* 팀 이름 표시 */}
      <div className={styles.teamContainer}>
        <img src={dummyJoinRequests.teamLogo} alt='팀 로고' className={styles.teamLogo} />
        <span className={styles.teamTitle}>{dummyJoinRequests.teamName} / 멤버 관리</span>
      </div>
      <JoinRequestList
        joinRequests={joinRequests}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default TeamJoinMemberPage;
