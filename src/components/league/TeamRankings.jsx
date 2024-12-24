import React, { useState, useEffect } from 'react';
import styles from './TeamRankings.module.css';
import teamRanks from '../../components/dummydata/teamRanks.json';

const TeamRankings = () => {
  const [genderFilter, setGenderFilter] = useState('남자');
  const [filteredRankings, setFilteredRankings] = useState([]);

  useEffect(() => {
    const filtered = teamRanks.filter((team) => team.gender === genderFilter);
    setFilteredRankings(filtered);
  }, [genderFilter]);

  return (
    <div className={styles.container}>
      <div className={styles.category}>
      {/* 성별 필터 버튼 */}
      <div className={styles.genderTabs}>
        {['남자', '여자'].map((gender) => (
          <button
            key={gender}
            className={genderFilter === gender ? styles.active : ''}
            onClick={() => setGenderFilter(gender)}
          >
            {gender}
          </button>
        ))}
      </div>
      {/* 팀 순위 세부 정보 */}
      <div className={styles.teamDetailsCategory}>
        <div className={styles.parts}>참가</div>
        <div className={styles.points}>승점</div>
      </div>
    </div>

      {/* 팀 순위 테이블 */}
      <div className={styles.rankings}>
        {filteredRankings.map((team, index) => (
            <div key={index} className={styles.rankInfo}>
                <div className={styles.teamInfo}>
                    <div className={styles.teamRank}>{team.rank}</div>
                    <div><img src={team.emblem} alt="팀 엠블럼" className={styles.teamEmblem}/></div>
                    <div className={styles.teamName}>{team.team}</div>
                </div>
                <div className={styles.teamDetail}>
                    <div className={styles.teamParttime}>{team.participants}</div>
                    <div className={styles.teamPoint} >{team.points}</div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default TeamRankings;
