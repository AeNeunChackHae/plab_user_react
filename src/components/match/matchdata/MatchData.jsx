import React, { useEffect, useState } from "react";
import styles from "./MatchData.module.css";
import { config } from "../../../config";

const MatchData = ({ match_id }) => {
  const api = config.aws.ec2_host_user
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/match/match-data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ match_id }),
        });

        if (!response.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다.");
        }

        const result = await response.json();
        console.log("받은 데이터:", result); // 데이터 확인

        // 6개의 기본 카테고리를 항상 포함하도록 데이터 변환
        const allCategories = ["루키", "스타터", "비기너", "아마추어", "세미프로", "프로"];
        const normalizedData = allCategories.map((category) => {
          const existingCategory = result.levelDistribution.find(
            (item) => item.label === category
          );
          return {
            label: category,
            value: existingCategory ? existingCategory.value : 0, // 없는 카테고리는 0%로 설정
          };
        });

        setData({
          levelDistribution: normalizedData,
          averageLevel: result.averageLevel,
        });
      } catch (err) {
        console.error("데이터 로드 오류:", err);
        setError(err.message);
      }
    };

    if (match_id) {
      fetchData();
    }
  }, [match_id]);

  if (error) {
    return <div className={styles.error}>오류: {error}</div>;
  }

  if (!data) {
    return <div className={styles.loading}>데이터 로딩 중...</div>;
  }

  const { levelDistribution, averageLevel } = data;

  return (
    <div className={styles.sectionBody}>
      <h2 className={styles.sectionTitle}>매치 데이터</h2>
      <div className={styles.matchLevels}>
        <h4 className={styles.sectionSubtitle}>레벨 분포도</h4>
        <div className={styles.averageLevel}>
          예상 평균 레벨은 <span className={styles.highlighted}>{averageLevel}</span>입니다.
        </div>
        <ul className={styles.matchLevelsGraphBar}>
          {levelDistribution.map((level, index) => (
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
