import React from "react";
import styles from "./MatchSchedule.module.css";
import DUMMY_MATCHES from "../../dummyData/DUMMY_MATCHES";

const MatchSchedule = () => {
  return (
    <ul className={styles.matchScheduleList}>
      {DUMMY_MATCHES.map((match, index) => {
        // 마감 상태 계산
        const isAlmostFull =
          match.currentParticipants >= match.maxParticipants - 3 &&
          match.currentParticipants < match.maxParticipants;
        const isFull = match.currentParticipants === match.maxParticipants;

        return (
          <li key={index} className={styles.matchScheduleItem}>
            <div className={styles.matchTime}>
              <p>{match.time}</p>
            </div>
            <div className={styles.matchInfo}>
              {match.type === 1 && (
                <span className={styles.matchLeagueLabel}>플랩팀 리그</span>
              )}
              <div className={styles.matchTitle}>
                <a href="#" className={styles.matchLink}>
                  {match.title}
                </a>
                {isAlmostFull && (
                  <span className={`${styles.badge} ${styles.red}`}>
                    마감임박
                  </span>
                )}
                {isFull && (
                  <span className={`${styles.badge} ${styles.gray}`}>
                    마감
                  </span>
                )}
              </div>
              <div
                className={`${styles.matchOptions} ${
                  match.type === 0 ? styles.dotYellow : styles.dotBlue
                }`}
              >
                {match.options.map((option, i) => (
                  <span key={i} className={styles.option}>
                    {option}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.bookmark}>
              <img
                src="https://d31wz4d3hgve8q.cloudfront.net/static/img/ic_bookmark.svg"
                alt="bookmark"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default MatchSchedule;
