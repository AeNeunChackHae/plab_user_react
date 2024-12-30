import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import styles from './MatchResults.module.css';

const MatchResults = ({ matches }) => {
  const navigate = useNavigate(); // 페이지 이동 훅

  // 날짜 및 시간 포맷 함수
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

  // 매치 상세 페이지 이동 핸들러
  const handleMatchClick = (matchId) => {
    navigate(`/match/${matchId}`);
  };

  return (
    <div className={styles.container}>
      {matches.length > 0 ? (
        matches.map((match, index) => (
          <div
            key={index}
            className={styles.matchCard}
            onClick={() => handleMatchClick(match.match_id)}
          >
            {/* 리그 날짜 및 상세 정보 */}
            <div className={styles.matchInfo}>
              <span className={styles.matchDate}>
                {formatMatchDateTime(match.match_start_time)}
              </span>
              <br />
              <span className={styles.matchDetails}>
                {match.stadium_name} · {match.allow_gender}
              </span>
            </div>

            {/* 팀 리스트 */}
            <ul className={styles.teamList}>
              {match.teams.map((team, teamIndex) => (
                <li key={teamIndex} className={styles.team}>
                  {/* 팀 엠블럼 */}
                  <img
                    src={team.team_logo}
                    alt={team.team_name}
                    className={styles.teamEmblem}
                  />
                  {/* 팀명 */}
                  <span className={styles.teamName}>{team.team_name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        // 데이터가 없을 때 표시할 메시지
        <div className={styles.noMatches}>
          아직 끝난 경기가 없어요
        </div>
      )}
    </div>
  );
};

export default MatchResults;
