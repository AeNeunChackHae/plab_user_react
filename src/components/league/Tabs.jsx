import React, { useState, useEffect } from 'react';
import MatchList from './MatchList';
import MatchResults from './MatchResults';
import Filters from './Filters';
import styles from './Tabs.module.css';
import matchData from '../../components/dummydata/dummyMatches.json';
import matchResultsData from '../../components/dummydata/matchResults.json';
import TeamRankings from './TeamRankings';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('일정');
  const [filteredMatches, setFilteredMatches] = useState([]);

  useEffect(() => {
    if (activeTab === '일정') {
      setFilteredMatches(matchData);
    } else if (activeTab === '결과') {
      setFilteredMatches(matchResultsData);
    }
  }, [activeTab]);

  return (
    <div>
      {/* 탭 버튼 */}
      <div className={styles.tabs}>
        {['일정', '결과', '팀 순위'].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? styles.active : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 일정 탭 */}
      {activeTab === '일정' && (
        <>
          <Filters matches={matchData} setFilteredMatches={setFilteredMatches} />
          <MatchList matches={filteredMatches} />
        </>
      )}

      {/* 경기 결과 탭 */}
      {activeTab === '결과' && (
        <>
          <Filters matches={matchResultsData} setFilteredMatches={setFilteredMatches} />
          {filteredMatches.length > 0 ? (
            <MatchResults matches={filteredMatches} />
          ) : (
            <p className={styles.noMatches}>아직 끝난 경기가 없어요!</p>
          )}
        </>
      )}

      {/* 팀 순위 탭 */}
      {activeTab === '팀 순위' && (
        <div className={styles.rankings}>
          <TeamRankings />
        </div>
      )}
    </div>
  );
};

export default Tabs;
