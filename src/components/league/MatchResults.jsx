import React from 'react';
import styles from './MatchResults.module.css';

const MatchResults = ({ matches }) => {
  return (
    <div className={styles.container}>
      {matches.map((match, index) => (
        <div key={index} className={styles.matchCard}>
          {/* 날짜 및 장소 */}
          <div className={styles.matchInfo}>
            <span className={styles.matchDate}>{match.date}</span>
            <br />
            <span className={styles.matchDetails}>
              {match.location} · {match.gender} · {match.level}
            </span>
          </div>

          {/* 팀 리스트 */}
          <ul className={styles.teamList}>
            {match.teams.map((team, teamIndex) => (
              <li key={teamIndex} className={styles.team}>
                {/* 팀 엠블럼 */}
                <img
                  src={team.emblem}
                  alt={team.name}
                  className={styles.teamEmblem}
                />

                {/* 팀명 및 승리 배지 */}
                <div className={styles.teamNameWrapper}>
                  <span className={styles.teamName}>{team.name}</span>
                  {team.winner && (
                    <span className={styles.winnerBadge}>🏆 WINNER</span>
                  )}
                </div>

                {/* 팀 점수 */}
                <span className={styles.teamScore}>{team.score}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MatchResults;
