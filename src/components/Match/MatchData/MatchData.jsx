import React from "react";
import styles from "./MatchData.module.css";

const MatchData = ({ users = [] }) => {
  // 레벨 코드에 따른 큰 카테고리 분류
  const categorizeLevels = (levelCode) => {
    if (levelCode >= 0 && levelCode <= 3) return "루키";
    if (levelCode >= 4 && levelCode <= 7) return "아마추어";
    if (levelCode >= 8 && levelCode <= 11) return "세미프로";
    if (levelCode >= 12 && levelCode <= 15) return "프로";
    return "기타";
  };

  // 레벨 코드의 순서 정의
  const levelOrder = [
    "루키1", "루키2", "루키3", "루키4",
    "아마추어1", "아마추어2", "아마추어3", "아마추어4",
    "세미프로1", "세미프로2", "세미프로3", "세미프로4",
    "프로1", "프로2", "프로3", "프로4",
  ];

  // 레벨 분포 계산
  const calculateCategoryDistribution = () => {
    const totalUsers = users.filter((user) => user.status_code === 0).length;

    const categoryCounts = { 루키: 0, 아마추어: 0, 세미프로: 0, 프로: 0, 기타: 0 };
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
    const totalUsers = users.filter((user) => user.status_code === 0).length;
    const totalLevelValue = users.reduce(
      (sum, user) =>
        user.status_code === 0 ? sum + levelOrder.indexOf(user.level_code) + 1 : sum,
      0
    );

    const averageIndex = totalUsers > 0 ? Math.round(totalLevelValue / totalUsers) - 1 : -1;
    return averageIndex >= 0 && averageIndex < levelOrder.length
      ? levelOrder[averageIndex]
      : "알 수 없음";
  };

  const categories = calculateCategoryDistribution();
  const averageLevel = calculateAverageLevel();

  return (
    <div className={styles.sectionBody}>
      <h2 className={styles.sectionTitle}>매치 데이터</h2>

      <div className={styles.matchLevels}>
        <h4 className={styles.sectionSubtitle}>카테고리 분포도</h4>
        <ul className={styles.matchLevelsGraphBar}>
          {categories.map((category, index) => (
            <li className={styles.graphBarItem} key={index}>
              <div className={styles.graphBarFrame}>
                <span
                  className={styles.graphBarGage}
                  style={{ height: `${category.value}%` }}
                ></span>
              </div>
              <span className={styles.graphBarValue}>{category.value}%</span>
              <span className={styles.graphBarLabel}>{category.label}</span>
            </li>
          ))}
        </ul>
        <div className={styles.averageLevel}>
          예상 평균 레벨은 <span className={styles.highlighted}>{averageLevel}</span>입니다.
        </div>
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
