import React from "react";
import styles from "./MatchList.module.css";
import { useNavigate } from "react-router-dom";

const MatchList = ({ matches }) => {
    const navigate = useNavigate();

    // 성별 dot CSS 클래스
    const getGenderDotClass = (gender) => {
        switch (gender) {
            case "여성":
                return styles.femaleDot;
            case "남성":
                return styles.maleDot;
            case "혼성":
                return styles.allDot;
            default:
                return "";
        }
    };

    // 레벨별 CSS 클래스
    const getLevelClass = (level) => {
        switch (level) {
            case "모든레벨":
                return styles.general;
            case "아마추어1이하":
                return styles.amateur1;
            case "아마추어2이상":
                return styles.amateur2;
            default:
                return "";
        }
    };

    // 매치 상세 페이지 이동
    const handleMatchClick = (matchId) => {
        navigate(`/match/${matchId}`); // 라우터로 이동
    };

    return (
        <div className={styles.matchList}>
            {matches.map((match, index) => (
                <div key={index} className={styles.matchItem} onClick={() => handleMatchClick(match.matchId)}
                style={{ cursor: "pointer" }}>
                    {/* 매치 시간 */}
                    <div className={styles.time}>
                        {new Date(match.startTime).toLocaleTimeString('ko-KR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        })}
                    </div>
                    {/* 매치 세부 정보 */}
                    <div className={styles.details}>
                        <span className={styles.location}>{match.stadiumName}</span>
                        <br />
                        {/* 성별 Dot 표시 */}
                        <span className={`${styles.dot} ${getGenderDotClass(match.gender)}`}></span>
                        <span className={styles.gender}>{match.gender}</span>
                        
                        {/* 레벨 표시 */}
                        {match.level && (
                            <span className={`${styles.level} ${getLevelClass(match.level)}`}>
                                {match.level}
                            </span>
                        )}
                    </div>
                    {/* 상태 버튼 */}
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



export default MatchList;
