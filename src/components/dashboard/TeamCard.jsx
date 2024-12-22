import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router 사용
import styles from './TeamCard.module.css';

const TeamCard = ({ team }) => {
  const navigate = useNavigate(); // 네비게이션 훅

  const handleNavigate = () => {
    navigate(`/team/profile/${team.code}`); // 해당 팀 코드로 이동
  };

  return (
    <div className={styles.teamCard} onClick={handleNavigate} role="button" tabIndex={0}>
      <div className={styles.logoWrapper}>
        <img src={team.logo} alt={`${team.name} 로고`} className={styles.logo} />
      </div>
      <div className={styles.teamInfo}>
        <h3 className={styles.teamName}>{team.name}</h3>
        <p className={styles.teamRole}>{team.role}</p>
      </div>
      <div className={styles.teamMembers}>
        <span>👥 {team.members}</span>
      </div>
    </div>
  );
};

export default TeamCard;
