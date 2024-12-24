import React, { useState } from 'react';
import styles from './Filters.module.css';

const Filters = ({ matches, setFilteredMatches }) => {
  const [activeRegion, setActiveRegion] = useState('전체'); // 활성화된 필터 상태 관리

  const handleFilter = (region) => {
    setActiveRegion(region); // 활성화된 필터 업데이트
    const filtered = region === '전체'
      ? matches
      : matches.filter((match) => match.local && match.local.includes(region)); // 'local' 필드를 기준으로 필터링
    setFilteredMatches(filtered);
  };

  return (
    <div className={styles.filters}>
      {['전체', '서울', '인천', '수원', '고양'].map((region) => (
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
