import React from 'react';
import styles from './TeamSelector.module.css';

const TeamSelector = () => {
  // 그래프 데이터
  const levels = [
    { label: '루키', value: 0 },
    { label: '스타터', value: 0 },
    { label: '비기너', value: 8 },
    { label: '아마추어', value: 77 },
    { label: '세미프로', value: 15 },
    { label: '프로', value: 0 },
  ];

  return (
    <div className={styles.sectionBody}>
      <h2 className={styles.sectionTitle}>매치 데이터</h2>

      {/* 팀 선택 섹션 */}
      <div className={styles.teamSelector}>
        <div className={`${styles.team} ${styles.selected}`}>
          <p className={styles.teamName}>전체</p>
          <p className={styles.teamLevel}>아마추어2</p>
        </div>
        <div className={styles.team}>
          <div className={styles.teamIcon}>
            <div
              className={styles.teamImage}
              style={{
                backgroundImage: 'url(/images/jersey-red.png)'
              }}
            >
              플랩
            </div>
          </div>
          <p className={styles.teamName}>아마추어2</p>
        </div>
        <div className={styles.team}>
          <div className={styles.teamIcon}>
            <div
              className={styles.teamImage}
              style={{
                backgroundImage: 'url(/images/jersey-yellow.png)'
              }}
            >
              플랩
            </div>
          </div>
          <p className={styles.teamName}>아마추어2</p>
        </div>
        <div className={styles.team}>
          <div className={styles.teamIcon}>
            <div
              className={styles.teamImage}
              style={{
                backgroundImage: 'url(/images/jersey-blue.png)'
              }}
            >
              플랩
            </div>
          </div>
          <p className={styles.teamName}>아마추어3</p>
        </div>
      </div>

      {/* 레벨 분포도 섹션 */}
      <h4 className={styles.sectionSubtitle}>레벨 분포도</h4>
      <p className={styles.averageLevel}>
        예상 평균 레벨은 <span className={styles.highlighted}>아마추어3</span>입니다.
      </p>
      <ul className={styles.matchLevelsGraphBar}>
        {levels.map((level, index) => (
          <li className={styles.graphBarItem} key={index}>
            <div className={styles.graphBarFrame}>
              <span
                className={styles.graphBarGage}
                style={{ height: `${level.value}%` }}
              ></span>
            </div>
            <span className={styles.graphBarValue}>{level.value}%</span>
            <span className={styles.graphBarLabel}>{level.label}</span>
          </li>
        ))}
      </ul>
      <div className={styles.levelInform}>
        <img
          src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_caution.svg"
          alt="경고 아이콘"
          className={styles.warningIcon}
        />
        팀 레벨이 맞지 않으면 친구끼리 와도 다른 팀이 될 수 있어요
      </div>

      {/* POM 정보 섹션 */}
      <div className={styles.pomInfo}>
        <img
          src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_pom.svg"
          alt="POM 아이콘"
          className={styles.pomIcon}
        />
        <div>
          <p className={styles.pomCount}>POM이 9명 있어요</p>
          <p className={styles.pomDescription}>
            POM은 서로 존중하고 격려하며 함께 즐길 수 있도록 매치에 긍정적인 에너지를 불어넣어 주는 플레이어예요.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamSelector;
