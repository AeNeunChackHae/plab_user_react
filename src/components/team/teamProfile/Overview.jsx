import React from 'react';
import styles from './Overview.module.css';

const Overview = ({ team }) => (
  <div>
    <h3 className={styles.title}>팀 정보</h3>
    <div className={styles.list}>
      <span className={styles.subtitle}><img src='/images/ic_time.svg' alt='모임 시간 아이콘' className={styles.icon}/>모임 시간</span>
      <span className={styles.info}>{team.meetingTime}</span>
    </div>
    <div className={styles.list}>
      <span className={styles.subtitle}><img src='/images/ic_age.svg' alt='평균 나이 아이콘' className={styles.icon}/>평균 나이</span>
      <span className={styles.info}>{team.averageAge}세</span>
    </div>
    <div className={styles.list}>
      <span className={styles.subtitle}><img src='/images/ic_my.svg' alt='멤버 아이콘' className={styles.icon}/>멤버</span>
      <span className={styles.info}>{team.members?.length}명</span>
    </div>
  </div>
);

export default Overview;