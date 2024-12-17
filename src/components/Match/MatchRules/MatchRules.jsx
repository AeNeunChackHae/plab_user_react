import React, { useState } from 'react';
import styles from './MatchRules.module.css';

const MatchRules = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section id="matchRule" className={styles.section}>
      {/* 섹션 헤더 */}
      <div className={styles.sectionHeader} onClick={toggleExpand}>
        <h3 className={styles.sectionTitle}>
          매치 진행 방식
        </h3>
        <span className={isExpanded ? styles.arrowUp : styles.arrowDown}></span>
      </div>

      {/* 섹션 본문 (펼쳐질 때만 표시) */}
      {isExpanded && (
        <div className={`${styles.stadInner} ${styles.sectionBody}`}>
          {/* 매치 규칙 */}
          <ul className={styles.matchRule}>
            <h4>매치 규칙</h4>
            <li>모든 파울은 사이드라인에서 킥인</li>
            <li>골키퍼에게 백패스 가능 손으로는 잡으면 안 돼요</li>
            <li>사람을 향한 태클 금지</li>
          </ul>

          {/* 진행 방식 */}
          <ul className={styles.matchRule}>
            <h4>진행 방식</h4>
            <li>풋살화와 개인 음료만 준비하세요</li>
            <li>매니저가 경기 진행을 도와드려요</li>
            <li>골키퍼와 휴식을 공평하게 돌아가면서 해요</li>
            <li>레벨 데이터를 기준으로 팀을 나눠요</li>
            <li>친구끼리 와도 팀 실력이 맞지 않으면 다른 팀이 될 수 있어요</li>
          </ul>

          {/* 알아두면 좋아요 */}
          <ul className={styles.matchRule}>
            <h4>알아두면 좋아요</h4>
            <li>서로 존중하고 격려하며 함께 즐겨요</li>
            <li>플랩 평균 레벨은 아마추어2예요</li>
            <li>플랩에서는 하루 평균 250매치가 진행되고 있어요</li>
            <li>매일 4,500여 명이 팀 없이도 풋살을 즐기고 있어요</li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default MatchRules;
