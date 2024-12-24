import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TeamCard.module.css';

const TeamCard = ({ team }) => {
  const navigate = useNavigate(); // 네비게이션 훅

  // 백엔드 연동 시 사용
  /*
  if (!team || !team.name || !team.teamCode) {
    console.warn('팀 데이터가 올바르지 않습니다:', team);
    return (
      <div className={styles.error}>
        <p> 팀 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.</p>
      </div>
    );
  } */

  const handleNavigate = () => {
    navigate(`/team/profile/${team.code}`); // 해당 팀 코드로 이동
  };

  return (
    <div
      className={styles.teamCard}
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleNavigate();
      }}
    >
      {/* 팀 로고 */}
      <div className={styles.logoWrapper}>
        <img
          src={team.logo}
          alt={`${team.name} 로고`}
          className={styles.logo}
        />
      </div>

      {/* 팀 정보 */}
      <div className={styles.teamInfo}>
        <h3 className={styles.teamName}>{team.name}</h3>
        <span className={styles.teamRole}>{team.role}</span>
      </div>

      {/* 팀 멤버 수 */}
      <div className={styles.teamMembers}>
        <img
          src="/images/numberOfMemberIcon.png"
          alt="멤버 수 아이콘"
          className={styles.memberIcon}
        />
        <span>{team.members?.length}</span>
      </div>
    </div>
  );
};

export default TeamCard;