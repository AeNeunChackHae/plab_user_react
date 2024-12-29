import React, { useState } from 'react';
import styles from './Filters.module.css';

const Filters = ({ matches, setFilteredMatches }) => {
  const [activeRegion, setActiveRegion] = useState('전체'); // 활성화된 필터 상태 관리

  // 필터링 핸들러
  const handleFilter = (region) => {
    setActiveRegion(region); // 활성화된 필터 업데이트
    const filtered = region === '전체'
      ? matches
      : matches.filter((match) => match.main_region && match.main_region === region); // main_region 필드 사용
    setFilteredMatches(filtered);
  };

  return (
    <div className={styles.filters}>
      {['전체', '서울', '인천', '경기'].map((region) => (
        <button
          key={region}
          className={`${styles.filterButton} ${activeRegion === region ? styles.active : ''}`}
          onClick={() => handleFilter(region)}
        >
          {region}
        </button>
      ))}
    </div>
  );
};

export default Filters;