import React from "react";
import styles from "./StadiumList.module.css";
import STADIUM_DATA from "../../../dummyData/stadiumData";

// 정시 기반으로 timeBlocks 생성
const generateTimeBlocks = (availableTimes) => {
  const blocks = Array(48).fill("soldout"); // 기본값은 "soldout"
  const timeToIndex = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 2 + (minute === 30 ? 1 : 0);
  };

  availableTimes.forEach((time) => {
    const startIndex = timeToIndex(time); // 시작 인덱스
    for (let i = 0; i < 4; i++) {
      if (startIndex + i < 48) {
        blocks[startIndex + i] = "available"; // 4칸(2시간) 예약 가능
      }
    }
  });

  return blocks;
};

const timeLabels = ["06시", "12시", "18시", "00시", "06시"]; // 표시할 시간 라벨

const StadiumList = () => {
  return (
    <div className={styles.stadiumContainer}>
      <ul className={styles.stadiumList}>
        {STADIUM_DATA.map((stadium) => {
          const timeBlocks = generateTimeBlocks(stadium.availableTimes);

          return (
            <li key={stadium.id} className={styles.stadiumItem}>
              <div className={styles.infoWrapper}>
                <div className={styles.facilityWrapper}>
                  <p className={styles.name}>{stadium.name}</p>
                  <p className={styles.facility}>{stadium.facility}</p>
                  <p className={styles.price}>
                    {stadium.pricePerHour.toLocaleString()}원/시간
                  </p>
                </div>
                <div className={styles.imageWrapper}>
                  <img src={stadium.image} alt={stadium.name} className={styles.image} />
                </div>
              </div>

              {/* 시간 블록 */}
              <div className={styles.timeBlockWrapper}>
                {timeBlocks.map((status, index) => (
                  <div
                    key={index}
                    className={`${styles.timeBlock} ${
                      status === "available" ? styles.available : styles.soldout
                    }`}
                  ></div>
                ))}
              </div>

              {/* 시간 정보 */}
              <div className={styles.timeInfoWrapper}>
                {timeLabels.map((label, index) => (
                  <div key={index} className={styles.timeInfo}>
                    {label}
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </ul>

      {/* 예약 상태 레전드 */}
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
