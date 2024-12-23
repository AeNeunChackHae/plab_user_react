import React from "react";
import styles from "./MatchData.module.css";

const MatchData = ({ level_code }) => {
  // 레벨 코드에 따른 큰 카테고리 분류
  const categorizeLevels = (level_code) => {
    if (level_code === 0) return "루키";
    if (level_code >= 1 && level_code <= 3) return "스타터";
    if (level_code >= 4 && level_code <= 6) return "비기너";
    if (level_code >= 7 && level_code <= 9) return "아마추어";
    if (level_code >= 10 && level_code <= 12) return "세미프로";
    if (level_code >= 13 && level_code <= 15) return "프로";
    return "알 수 없음";  // 기본값으로 "알 수 없음" 추가
  };

  // 레벨 분포 계산
  const calculateLevelDistribution = () => {
    
    const category = categorizeLevels(level_code);  // 해당 레벨 카테고리 계산
    const categoryCounts = { 루키: 0, 스타터: 0, 비기너: 0, 아마추어: 0, 세미프로: 0, 프로: 0 };
    categoryCounts[category] = 1; // 해당 레벨의 카테고리만 1로 설정

    // 레벨 분포를 반환
    return Object.keys(categoryCounts).map((key) => ({
      label: key,
      value: categoryCounts[key] > 0 ? 100 : 0,  // 해당 레벨 카테고리만 100%로 표시
    }));
  };

  // 평균 레벨 계산
  const calculateAverageLevel = () => {
    return categorizeLevels(level_code); // 단일 사용자라 해당 레벨을 바로 반환
  };

  const levels = calculateLevelDistribution();
  const averageLevel = calculateAverageLevel();

  return (
    <div className={styles.sectionBody}>
      <h2 className={styles.sectionTitle}>매치 데이터</h2>

      <div className={styles.matchLevels}>
        <h4 className={styles.sectionSubtitle}>레벨 분포도</h4>
        <div className={styles.averageLevel}>
          예상 평균 레벨은 <span className={styles.highlighted}>{averageLevel}</span>입니다.
        </div>
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
          팀 레벨이 맞지 않으면 친구끼리 와도 다른 팀이 될 수 있어요.
        </div>
      </div>
    </div>
  );
};

export default MatchData;
