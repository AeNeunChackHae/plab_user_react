import React from 'react';
import styles from './TeamProfile.module.css';

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
        onClick={() => setActiveTab('overview')}
      >
        오버뷰
      </button>
      <button
        className={`${styles.tabButton} ${activeTab === 'schedule' ? styles.active : ''}`}
        onClick={() => setActiveTab('schedule')}
      >
        일정
      </button>
      <button
        className={`${styles.tabButton} ${activeTab === 'members' ? styles.active : ''}`}
        onClick={() => setActiveTab('members')}
      >
        멤버
      </button>
    </div>
  );
};

export default Tabs;
