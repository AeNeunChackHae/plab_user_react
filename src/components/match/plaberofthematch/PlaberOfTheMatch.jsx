import React from 'react';
import { levelDescriptions } from './levelDescriptions'; 
import styles from './PlaberOfTheMatch.module.css';

const PlaberOfTheMatch = ({topPlayer}) => {
  const levelDescription = levelDescriptions[topPlayer.level_code] || '미정의 레벨';

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <h3>플레버 오브 더 매치</h3>
        </div>
      </div>
      <div className={styles.sectionBody}>
        <div className={styles.plaberOfTheMatch}>
        <img
            src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_plaber_of_the_match_emoji.svg"
            alt="Plaber Of The Match Icon"
            className={styles.plaberIcon}
          />
          <p className={styles.plaberTitle}>Plaber Of The Match</p>
          <div className={styles.plaberBox}>
            <div className={styles.plaberInfo}>
              <span className={styles.plaberName}>{topPlayer.username}</span>
              <span className={styles.plaberLevel}>{levelDescription}</span>
            </div>
          </div>
          <span className={styles.plaberDescription}>
            플레버 오브 더 매치는 가장 매너가 좋고<br />긍정적인 분위기를 만들어 준 플레버예요.
          </span>
        </div>
      </div>
    </section>
  );
};

export default PlaberOfTheMatch;
