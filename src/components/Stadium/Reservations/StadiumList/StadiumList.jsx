import React from "react";
import styles from "./StadiumList.module.css";

const stadiumData = [
  {
    id: 1,
    name: "A구장",
    facility: "40x20m • 실외 • 인조잔디",
    image: "https://d31wz4d3hgve8q.cloudfront.net/media/ydp_thef_goal.jpeg",
    timeBlocks: Array(48).fill("available"),
  },
  {
    id: 2,
    name: "B구장",
    facility: "40x20m • 실외 • 인조잔디",
    image: "https://d31wz4d3hgve8q.cloudfront.net/media/ydp_thef_coner.jpeg",
    timeBlocks: Array(48).fill("available"),
  },
  {
    id: 3,
    name: "스킬 피치",
    facility: "20x8m • 실외 • 인조잔디",
    image: "https://d31wz4d3hgve8q.cloudfront.net/media/KakaoTalk_Photo_2023-06-05-12-01-24.jpeg",
    timeBlocks: Array(48).fill("soldout"),
  },
  {
    id: 4,
    name: "풋볼랩",
    facility: "16x16m • 실내 • 인조잔디",
    image: "https://d31wz4d3hgve8q.cloudfront.net/static/img/default_stadium.jpg",
    timeBlocks: Array(48).fill("soldout"),
  },
];

const StadiumList = () => {
  return (
    <div className={styles.stadiumContainer}>
      <ul className={styles.stadiumList}>
        {stadiumData.map((stadium) => (
          <li key={stadium.id} className={styles.stadiumItem}>
            <div className={styles.infoWrapper}>
              <div className={styles.facilityWrapper}>
                <p className={styles.name}>{stadium.name}</p>
                <p className={styles.facility}>{stadium.facility}</p>
              </div>
              <div className={styles.imageWrapper}>
                <img src={stadium.image} alt={stadium.name} className={styles.image} />
              </div>
            </div>

            {/* 시간 블록 */}
            <div className={styles.timeBlockWrapper}>
              {stadium.timeBlocks.map((status, index) => (
                <div
                  key={index}
                  className={`${styles.timeBlock} ${status === "soldout" ? styles.soldout : ""}`}
                ></div>
              ))}
            </div>

            {/* 시간 정보 */}
            <div className={styles.timeInfoWrapper}>
              <div className={styles.timeInfo}>06시</div>
              <div className={styles.timeInfo}>12시</div>
              <div className={styles.timeInfo}>18시</div>
              <div className={styles.timeInfo}>00시</div>
              <div className={styles.timeInfo}></div> {/* 마지막 06시 추가 */}
            </div>
          </li>
        ))}
      </ul>

      {/* 예약 가능/불가 레전드 */}
      <div className={styles.legendWrapper}>
        <div className={styles.legend}>
          <div className={styles.legendAvailable}></div>
          예약 가능
        </div>
        <div className={styles.legend}>
          <div className={styles.legendSoldout}></div>
          예약 불가
        </div>
      </div>
    </div>
  );
};

export default StadiumList;
