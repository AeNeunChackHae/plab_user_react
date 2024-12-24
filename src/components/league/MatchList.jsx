import React from 'react';
import styles from './MatchList.module.css';

const MatchList = ({ matches }) => {
  const getGenderDotClass = (gender) => {
    switch (gender) {
      case '여자':
        return styles.femaleDot;
      case '남자':
        return styles.maleDot;
      default:
        return '';
    }
  };

  const getLevelClass = (level) => {
    switch (level) {
      case '아마추어1 이하':
        return styles.amateur1;
      case '아마추어2 이상':
        return styles.amateur2;
      case '모든 레벨':
        return styles.allLevels;
      default:
        return '';
    }
  };

  return (
    <ul className={styles.list}>
      {matches.map((match, index) => (
        <li key={index} className={styles.list}>
          <div className={styles.matchLists}>
            {/* 매치 날짜 */}
            <span className={styles.matchDate}>{match.date}</span>
            <br />
            {/* 매치 장소 */}
            <span className={styles.matchLocation}>{match.location}</span>
            {/* 마감 표시 */}
            {match.closed && <span className={styles.matchClosed}>마감</span>}
            <br />
            {/* 성별 및 레벨 */}
            <span className={`${styles.dot} ${getGenderDotClass(match.gender)}`}></span>
            <span className={styles.gender}>{match.gender}</span>
            <span> · </span>
            <span className={`${styles.level} ${getLevelClass(match.level)}`}>
              {match.level}
            </span>
            <br />
            {/* 팀 엠블럼 */}
            <div className={styles.teamEmblems}>
              {match.teams.map((team, teamIndex) => (
                <div key={teamIndex} className={styles.team}>
                  <img
                    src={team.emblem}
                    alt={team.name || '팀 엠블럼'}
                    className={styles.teamEmblem}
                  />
                  {team.name && <span className={styles.teamName}>{team.name}</span>}
                </div>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MatchList;
