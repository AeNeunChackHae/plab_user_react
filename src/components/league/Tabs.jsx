import React, { useState, useEffect } from 'react';
import MatchList from './MatchList';
import MatchResults from './MatchResults';
import Filters from './Filters';
import styles from './Tabs.module.css';
// import matchResultsData from '../../components/dummydata/matchResults.json';
import TeamRankings from './TeamRankings';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('일정');
  const [matches, setMatches] = useState([]); // 모든 매치 데이터
  const [filteredMatches, setFilteredMatches] = useState([]); // 필터링된 매치 데이터
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

  // 📌 API로 매치 데이터 불러오기
  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/league', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ main_region: null }),
        });

        const data = await response.json();
        if (data.success) {
          setMatches(data.data);
          setFilteredMatches(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch matches');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // 탭 변경 시 필터 초기화
  useEffect(() => {
    if (activeTab === '일정') {
      setFilteredMatches(matches);
    }
  }, [activeTab, matches]);

  if (loading) return <div className={styles.loading}>데이터를 불러오는 중...</div>;
  if (error) return <div className={styles.error}>에러: {error}</div>;

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
          <Filters matches={matches} setFilteredMatches={setFilteredMatches} />
          <MatchList matches={filteredMatches} />
        </>
      )}

      {/* 경기 결과 탭 */}
      {activeTab === '결과' && (
        <>
          <Filters matches={matches} setFilteredMatches={setFilteredMatches} />
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
