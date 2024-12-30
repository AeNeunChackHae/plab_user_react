import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MatchList.module.css';

const MatchList = ({ matches }) => {
  const navigate = useNavigate();

  // 성별 표시 스타일 반환
  const getGenderDotClass = (gender) => {
    switch (gender) {
      case '여자':
        return styles.femaleDot;
      case '남자':
        return styles.maleDot;
      case '남녀 모두':
        return styles.allGenderDot;
      default:
        return '';
    }
  };

  // 날짜 및 시간 포맷
  const formatMatchDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }) + ' ' + date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  // 매치 클릭 핸들러
  const handleMatchClick = (matchId) => {
    navigate(`/match/${matchId}`);
  };

  return (
    <ul className={styles.list}>
      {matches.map((match) => (
        <li
          key={match.match_id}
          className={styles.listItem}
          onClick={() => handleMatchClick(match.match_id)}
        >
          <div className={styles.matchLists}>
            {/* 리그 날짜 및 시간 */}
            <span className={styles.matchDate}>
              {formatMatchDateTime(match.match_start_time)}
            </span>
            <br />

            {/* 구장 이름 */}
            <span className={styles.matchLocation}>{match.stadium_name}</span>

            {/* 리그 상태 (마감 표시) */}
            {match.league_status === '마감' && (
              <span className={styles.matchClosed}>마감</span>
            )}
            <br />

            {/* 성별 표시 */}
            <span className={`${styles.dot} ${getGenderDotClass(match.allow_gender)}`}></span>
            <span className={styles.gender}>&nbsp;{match.allow_gender}</span>
            <br />

            {/* 가입 팀 목록 */}
            {match.teams.length > 0 && (
              <div className={styles.teamList}>
                {match.teams.map((team) => (
                  <div key={team.team_id} className={styles.team}>
                    <img
                      src={team.team_logo}
                      alt={team.team_name || '팀 엠블럼'}
                      className={styles.teamEmblem}
                    />
                    {team.team_name && (
                      <span className={styles.teamName}>{team.team_name}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MatchList;