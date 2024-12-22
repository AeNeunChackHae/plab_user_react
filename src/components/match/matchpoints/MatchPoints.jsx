import React from "react";
import styles from "./MatchPoints.module.css";


const MatchPoints = ({ managerName , allowGender , levelCriterion }) => {
  const getLevelText = (level) => {
    switch (level) {
      case 0:
        return "모든 레벨";
      case 1:
        return "아마추어 1 이하";
      case 2:
        return "아마추어 1 이상";
      case 3:
        return "아마추어 2 이상";
      default:
        return "알 수 없음";
    }
  };
  
  return (
    <section className={styles.section}>
      <div className={styles.matchPointsTitle}>
        <h4>매치 포인트</h4>
      </div>

      <div className={styles.matchPointsInfo}>
        <div className={styles.infoList}>
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_level.svg"
            className={styles.icon}
            alt="레벨"
          />
          <p>{getLevelText(levelCriterion)}</p>
        </div>
        <div className={styles.infoList}>
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_gender.svg"
            className={styles.icon}
            alt="성별"
          />
          <p>
            {allowGender === 0
              ? "남녀 모두"
              : allowGender === 1
              ? "남성만"
              : "여성만"}
          </p>
        </div>
        <div className={styles.infoList}>
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_stadium.svg"
            className={styles.icon}
            alt="경기 형태"
          />
          <p>6vs6 3파전</p>
        </div>
        <div className={styles.infoList}>
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_max_player_cnt.svg"
            className={styles.icon}
            alt="참가 인원"
          />
          <p>10~18명</p>
        </div>
        <div className={styles.infoList}>
          <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_shoes.svg"
            className={styles.icon}
            alt="신발"
          />
          <p>풋살화/운동화</p>
        </div>
      </div>

      <div className={styles.matchPointsAdditional}>
        <ul>
          <li className={styles.infoList}>
            <img
              src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_manager.svg"
              className={styles.icon}
              alt="매니저"
            />
            <div>
              <p>{managerName} 매니저가 진행해요</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default MatchPoints;
