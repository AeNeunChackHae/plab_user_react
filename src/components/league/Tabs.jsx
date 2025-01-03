import React, { useState, useEffect, useCallback } from 'react';
import MatchList from './MatchList';
import MatchResults from './MatchResults';
import TeamRankings from './TeamRankings';
import Filters from './Filters';
import styles from './Tabs.module.css';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('일정'); 
  const [genderFilter, setGenderFilter] = useState('남자'); 
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [rankings, setRankings] = useState([]);
  const [error, setError] = useState(null);

  // API 요청 함수
  const fetchData = useCallback(async (endpoint, body = {}) => {
    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.success) {
        if (endpoint.includes('/ranking')) {
          setRankings(data.data);
        } else {
          setMatches(data.data);
          setFilteredMatches(data.data);
        }
      } else {
        throw new Error(data.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // 탭 변경 시 API 호출
  useEffect(() => {
    if (activeTab === '일정') {
      fetchData('/league/upcoming');
    } else if (activeTab === '완료') {
      fetchData('/league/completed');
    } else if (activeTab === '팀 순위') {
      setGenderFilter('남자'); 
      fetchData('/league/ranking', { gender: 0 });
    }
  }, [activeTab, fetchData]);

  // 성별 필터 변경 시 API 호출
  useEffect(() => {
    if (activeTab === '팀 순위') {
      fetchData('/league/ranking', { gender: genderFilter === '남자' ? 0 : 1 });
    }
  }, [genderFilter, activeTab, fetchData]);

  if (error) return <div className={styles.error}>에러: {error}</div>;

  return (
    <div>
      {/* 상단 탭 버튼 */}
      <div className={styles.tabs}>
        {['일정', '완료', '팀 순위'].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? styles.active : styles.tabButton}
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

      {/* 완료 탭 */}
      {activeTab === '완료' && (
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
          <TeamRankings
            rankings={rankings}
            genderFilter={genderFilter}
            setGenderFilter={setGenderFilter}
          />
        </div>
      )}
    </div>
  );
};

export default Tabs;