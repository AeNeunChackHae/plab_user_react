import React from "react";
import styles from "./MatchList.module.css";

const MatchList = ({ matches }) => {
    const getGenderDotClass = (gender) => {
            switch (gender) {
                case "여자":
                    return styles.femaleDot;
                case "남자":
                    return styles.maleDot;
                case "남녀 모두":
                    return styles.allDot;
                default:
                    return "";
            }
        };

  return (
     <div className={styles.matchList}>
                {matches.map((match, index) => (
                    <div key={index} className={styles.matchItem}>
                        <div className={styles.time}>{match.time}</div>
                        <div className={styles.details}>
                            <span className={styles.location}>{match.location}</span>
                            <br />
                            <span className={`${styles.dot} ${getGenderDotClass(match.gender)}`}></span>
                            <span className={`${styles.gender}`}>
                                {match.gender}
                            </span>
                            {match.level !== "일반" && (
                                <span className={`${styles.level} ${getLevelClass(match.level)}`}>
                                    {match.level}
                                </span>
                            )}
                        </div>
                        <div>
                            <button
                                className={`${styles.status} ${
                                    match.status === "마감" ? styles.closed : styles.open
                                }`}
                            >
                                {match.status}
                            </button>
                        </div>
                    </div>
                ))}
            </div>


//     <div className={styles.matchList}>
//       {matches.map((match, index) => (
//         <div key={index} className={styles.matchItem}>
//           <div className={styles.time}>{match.time}</div>
//           <div className={styles.details}>
//             <span className={styles.location}>{match.location}</span>
//             <br />
//             <span className={styles.level}>{match.level}</span>
//           </div>
//           <button
//             className={`${styles.status} ${
//               match.status.includes("마감") ? styles.closed : styles.open
//             }`}
//           >
//             {match.status}
//           </button>
//         </div>
//       ))}
//     </div>
  );
};

const getLevelClass = (level) => {
    switch (level) {
        case "일반":
            return styles.general;
        case "아마추어1 이하":
            return styles.amateur1;
        case "아마추어2 이상":
            return styles.amateur2;
        default:
            return "";
    }
};

export default MatchList;
