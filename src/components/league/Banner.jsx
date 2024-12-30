import React from 'react';
import bannerData from '../../components/dummydata/bannerData.json';
import styles from './Banner.module.css';

const Banner = () => {
  return (
    <div
      className={styles.banner}
      style={{ backgroundImage: `url(${bannerData.image})` }}
    >
      <div className={styles.content}>
        <img src={bannerData.bannericon} alt="플랩팀리그" />
        <p className={styles.bannerTitle}>
          {bannerData.description.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <ol className={styles.bannerOl}>
          {bannerData.points.map((point, index) => (
            <li key={index} className={styles.bannerInfo}>{point}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Banner;
