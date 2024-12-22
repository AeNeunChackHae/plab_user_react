import React, { useState } from 'react';
import styles from './LeagueMatchRule.module.css';

const LeagueMatchRule = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section id="league_matchRule" className={styles.section}>
      {/* 섹션 헤더 */}
      <div className={styles.sectionHeader} onClick={toggleExpand}>
        <h3 className={styles.sectionTitle}>
          자세한 규칙
        </h3>
        <span className={isExpanded ? styles.arrowUp : styles.arrowDown}></span>
      </div>

      {/* 섹션 본문 (펼쳐질 때만 표시) */}
      {isExpanded && (
        <div className={`${styles.stadInner} ${styles.sectionBody}`}>
          {/* 경기 시간 */}
          <ul className={styles.matchRule}>
            <h4>경기 시간</h4>
            <li>경기 시간은 13분, 팀 당 6경기를 뛰어요</li>
          </ul>

          {/* 선수 교체 */}
          <ul className={styles.matchRule}>
            <h4>선수 교체</h4>
            <li>사이드 라인에서 자유롭게 교체해요</li>
          </ul>

          {/* 킥인 */}
          <ul className={styles.matchRule}>
            <h4>킥인</h4>
            <li>천장에 볼이 닿으면 상대팀의 킥인으로 진행해요</li>
            <li>수비는 3m 이상 떨어져야 해요</li>
            <li>사이드 라인이 협소한 경우 공간 확보를 위해 라인 안에서 킥인을 할 수 있어요</li>
          </ul>

          {/* 코너킥 */}
          <ul className={styles.matchRule}>
            <h4>코너킥</h4>
            <li>킥인과 같아요</li>
            <li>상대의 터치로 상대 진영 골라인으로 볼이 나간 경우</li>
          </ul>

          {/* 골킥 */}
          <ul className={styles.matchRule}>
            <h4>골킥 (골 클리어런스)</h4>
            <li>축구와 다르게 골키퍼는 손으로 던져야 해요</li>
            <li>상대의 터치로 우리 진영 골라인으로 볼이 나간 경우</li>
          </ul>

          {/* 간접 프리킥 */}
          <ul className={styles.matchRule}>
            <h4>간접 프리킥</h4>
            <li>직접 프리킥과 다르게 터치 없이 골대로 들어가면 골로 인정되지 않아요</li>
            <li>일반적으로 패스로 밀어주고 슈팅을 해요</li>
            <li>백패스를 키퍼가 손으로 잡으면 간접 프리킥이 주어져요</li>
          </ul>

          {/* 직접 프리킥 */}
          <ul className={styles.matchRule}>
            <h4>직접 프리킥</h4>
            <li>간접 프리킥과 다르게 직접 슈팅이 가능하고 득점으로 인정돼요</li>
            <li>다리 걸기, 핸드볼 등 진행 상황에서 파울을 한 경우</li>
          </ul>

          {/* 페널티킥 */}
          <ul className={styles.matchRule}>
            <h4>페널티킥</h4>
            <li>골 에어리어 안에서 파울을 한 경우</li>
            <li>골대에서 6m 떨어진 지점에서 킥을 해요</li>
            <li>사람을 향한 태클 금지</li>
          </ul>

          {/* 세컨 페널티킥 */}
          <ul className={styles.matchRule}>
            <h4>세컨 페널티킥</h4>
            <li>한 쿼터에 세 번 이상의 파울을 한 경우</li>
            <li>골대에서 10m 떨어진 지점에서 벽 없이 슈팅을 해요</li>
            <li>쿼터마다 누적 파울 수를 리셋해요</li>
          </ul>

          {/* 퇴장 */}
          <ul className={styles.matchRule}>
            <h4>퇴장</h4>
            <li>폭행 또는 협박성 발언</li>
            <li>의도적인 보복 행위</li>
            <li>지나친 항의로 인한 경기 지연</li>
            <li>퇴장당한 선수는 경기에 참여할 수 없어요</li>
            <li>반복되는 조롱, 도발, 경기 지연 등의 비매너 플레이</li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default LeagueMatchRule;
