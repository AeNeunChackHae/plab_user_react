import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TeamRankings.module.css';

const TeamRankings = ({ rankings, genderFilter, setGenderFilter }) => {
  const navigate = useNavigate();
  
  const handleFilterChange = (gender) => {
    if (genderFilter !== gender) {
      setGenderFilter(gender);
    }
  };

  // 팀 클릭 시 팀 태그로 이동
  const handleTeamClick = (teamTag) => {
    navigate(`/team/profile/${teamTag}`);
  };

  return (
    <div className={styles.container}>
      {/* 성별 필터 버튼 */}
      <div className={styles.genderTabs}>
        <button
          className={`${styles.genderButton} ${
            genderFilter === '남자' ? styles.active : ''
          }`}
          onClick={() => handleFilterChange('남자')}
        >
          남자
        </button>
        <button
          className={`${styles.genderButton} ${
            genderFilter === '여자' ? styles.active : ''
          }`}
          onClick={() => handleFilterChange('여자')}
        >
          여자
        </button>
      </div>

      {/* 팀 랭킹 테이블 */}
      <div className={styles.rankings}>
        {rankings.map((team, index) => (
          <div 
            key={index}
            className={styles.rankInfo}
            onClick={() => handleTeamClick(team.team_tag)}
          >
            <div className={styles.teamInfo}>
              <div className={styles.teamRank}>{team.rank}</div>
              <img src={team.team_logo} alt={team.team_name} className={styles.teamEmblem} />
              <div className={styles.teamName}>{team.team_name}</div>
            </div>
            <div className={styles.teamDetail}>
              <div>{team.matches_played} 경기</div>
              <div className={styles.teamPoints}>{team.points} 포인트</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamRankings;
