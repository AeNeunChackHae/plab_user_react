import React from "react";
import styles from "./MatchList.module.css";

const MatchList = () => {
    const matches = [
        { date: "2024-12-15", time: "09:00", local: "서울", location: "서울 영등포 EA SPORTS FC B구장", gender: "여자", level: "아마추어1 이하", status: "신청가능" },
        { date: "2024-12-18", time: "10:00", local: "경기", location: "수원 HK 풋살파크 3구장", gender: "남자", level: "일반", status: "마감" },
        { date: "2024-12-16", time: "11:00", local: "부산", location: "부산 준타스 풋살 아레나 화이트", gender: "남녀 모두", level: "아마추어2 이상", status: "신청가능" },
    ];

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
