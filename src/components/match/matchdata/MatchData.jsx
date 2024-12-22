import React from "react";
import styles from "./MatchData.module.css";

const MatchData = ({ users = [] }) => {
  // 레벨 코드에 따른 큰 카테고리 분류
  const categorizeLevels = (levelCode) => {
    if (levelCode == 0) return "루키";
    if (levelCode >= 1 && levelCode <= 3) return "스타터";
    if (levelCode >= 4 && levelCode <= 6) return "비기너";
    if (levelCode >= 7 && levelCode <= 9) return "아마추어";
    if (levelCode >= 10 && levelCode <= 12) return "세미프로";
    if (levelCode >= 13 && levelCode <= 15) return "프로";
  };

  // 레벨 코드의 순서 정의
  const levelOrder = [
    "루키",
    "스타터1", "스타터2", "스타터3",
    "비기너1", "비기너2", "비기너3",
    "아마추어1", "아마추어2", "아마추어3",
    "세미프로1", "세미프로2", "세미프로3",
    "프로1", "프로2", "프로3",
  ];

  // 레벨 분포 계산
  const calculateLevelDistribution = () => {
    const totalUsers = users.filter((user) => user.status_code === 0).length;

    const categoryCounts = { 루키: 0, 스타터: 0 , 비기너:0, 아마추어: 0, 세미프로: 0, 프로: 0 };
    users.forEach((user) => {
      if (user.status_code === 0) {
        const category = categorizeLevels(user.level_code);
        categoryCounts[category] += 1;
      }
    });

    return Object.keys(categoryCounts).map((key) => ({
      label: key,
      value: totalUsers > 0 ? Math.round((categoryCounts[key] / totalUsers) * 100) : 0,
    }));
  };

  // 평균 레벨 계산
  const calculateAverageLevel = () => {
    const validUsers = users.filter(user => user.status_code === 0);
    const totalUsers = validUsers.length;
    if (totalUsers === 0) return "알 수 없음"; // 유효한 사용자가 없으면 "알 수 없음" 반환
  
    // 각 사용자의 레벨 코드를 카테고리 이름으로 변환하고 이를 배열로 저장
    const levelNames = validUsers.map(user => categorizeLevels(user.level_code));
  
    // 레벨 이름의 빈도 계산
    const levelFrequency = levelNames.reduce((acc, levelName) => {
      acc[levelName] = (acc[levelName] || 0) + 1;
      return acc;
    }, {});
  
    // 가장 빈번한 레벨 찾기
    const mostFrequentLevel = Object.keys(levelFrequency).reduce((a, b) => {
      return levelFrequency[a] > levelFrequency[b] ? a : b;
    });
  
    return mostFrequentLevel;
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
