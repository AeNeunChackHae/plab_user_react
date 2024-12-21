import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './JoinRequestSummary.module.css';

const JoinRequestSummary = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/team/wait');
  };

  return (
    <div className={styles.joinRequest} onClick={handleNavigate} role="button" tabIndex={0}>
      <h3>나의 가입신청 내역</h3>
      <span className={styles.viewDetails}>➤</span>
    </div>
  );
};

export default JoinRequestSummary;
