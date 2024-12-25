import React from 'react';
import styles from './StadiumInfo.module.css';

const StadiumInfo = ({ width, height, shower, parking, lendShoes, sellDrink, notice }) => {
  // console.log({ width, height, shower, parking, lendShoes, sellDrink, notice })
  const isFeatureAvailable = (feature) => feature === 'Y';

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h3>구장 정보</h3>
      </div>
      <div className={styles.sectionBody}>
        <div className={styles.infoListWrapper}>
          <ul>
            <li className={`${styles.infoList} ${!isFeatureAvailable(shower) ? styles.unavailable : ''}`}>
              <img src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_shower.svg" className={styles.icon} alt="샤워실" />
              <p>샤워실</p>
            </li>
            <li className={`${styles.infoList} ${!isFeatureAvailable(parking) ? styles.unavailable : ''}`}>
              <img src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_park.svg" className={styles.icon} alt="주차" />
              <p>주차 가능</p>
            </li>
            <li className={`${styles.infoList} ${!isFeatureAvailable(lendShoes) ? styles.unavailable : ''}`}>
              <img src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_shoes.svg" className={styles.icon} alt="풋살화 대여" />
              <p>풋살화 대여</p>
            </li>
            <li className={`${styles.infoList} ${!isFeatureAvailable(sellDrink) ? styles.unavailable : ''}`}>
              <img src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_beverage.svg" className={styles.icon} alt="음료 판매" />
              <p>음료 판매</p>
            </li>
            <li className={styles.infoList}>
              <img src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_info_stadium.svg" className={styles.icon} alt="구장 크기" />
              <p>{`${width}x${height}m`}</p>
            </li>
          </ul>
        </div>
        <hr className={styles.divider} />
        <div className={styles.stadiumNotice}>
          <h4>구장 특이사항</h4>
          <pre>{notice}</pre>
        </div>
      </div>
    </section>
  );
};

export default StadiumInfo;
