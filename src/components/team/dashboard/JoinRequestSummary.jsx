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
      <span>나의 가입 신청 내역</span>
      <img src="/images/arrowIcon.png"
        alt="화살표아이콘"
        className={styles.arrowIcon}
      />
    </div>
  );
};

export default JoinRequestSummary;
