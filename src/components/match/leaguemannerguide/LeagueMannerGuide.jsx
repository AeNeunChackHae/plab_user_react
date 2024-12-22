import React, { useState } from 'react';
import styles from './LeagueMannerGuide.module.css';

const LeagueMannerGuide = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section id="matchRule" className={styles.section}>
      {/* 섹션 헤더 */}
      <div className={styles.sectionHeader} onClick={toggleExpand}>
        <h3 className={styles.sectionTitle}>
          리그 매너 문화
        </h3>
        <span className={isExpanded ? styles.arrowUp : styles.arrowDown}></span>
      </div>

      {/* 섹션 본문 (펼쳐질 때만 표시) */}
      {isExpanded && (
        <div className={`${styles.stadInner} ${styles.sectionBody}`}>
          {/* 존중하고 함께 즐겨요 */}
          <ul className={styles.matchRule}>
            <h4>존중하고 함께 즐겨요</h4>
            <li>매니저의 오심 가능성을 인정해 주세요</li>
            <li>
              매니저가 보지 못한 파울이 있을 경우 자율적으로 볼을 넘겨주시면 더 즐거워요
            </li>
            <li>서로를 존중하고 다치지 않도록 보호해 주세요</li>
            <li>먼저 사과하고 사과를 꼭 받아주세요</li>
          </ul>

          {/* 이런 건 절대 안 돼요 */}
          <ul className={styles.matchRule}>
            <h4>이런 건 절대 안 돼요</h4>
            <li>판정에 대한 항의</li>
            <li>보복성 플레이</li>
            <li>조롱 및 도발</li>
            <li>무단 불참</li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default LeagueMannerGuide;
