import React, { useState, useEffect } from "react";
import styles from "./DateSelector.module.css";

const DateRangeDisplay = () => {
    const [dateRange, setDateRange] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [currentStartIndex, setCurrentStartIndex] = useState(0);

    useEffect(() => {
        // 현재 날짜 가져오기
        const today = new Date();

        // 요일 배열
        const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

        // 14일 동안의 날짜 계산
        const range = Array.from({ length: 14 }, (_, i) => {
            const futureDate = new Date();
            futureDate.setDate(today.getDate() + i);
            const day = futureDate.getDate();
            const weekday = weekdays[futureDate.getDay()];
            return {
                day,
                weekday,
                fullDate: futureDate.toDateString(), // 전체 날짜 문자열로 저장 (비교 용도)
            };
        });

        setDateRange(range);

        // 오늘 날짜의 인덱스를 activeIndex로 설정
        const todayIndex = range.findIndex(date => date.fullDate === today.toDateString());
        setActiveIndex(todayIndex);
        setCurrentStartIndex(Math.max(0, todayIndex - 3)); // 화면 중앙에 표시
    }, []);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    const handleNext = () => {
        if (currentStartIndex + 7 < dateRange.length) {
            setCurrentStartIndex(currentStartIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentStartIndex > 0) {
            setCurrentStartIndex(currentStartIndex - 1);
        }
    };

    return (
        <div className={styles.dateSelectorContainer}>
            <button className={styles.navButton} onClick={handlePrev} disabled={currentStartIndex === 0}>
                &lt;
            </button>
            <div className={styles.dateSelector}>
                {dateRange.slice(currentStartIndex, currentStartIndex + 7).map((date, index) => (
                    <button 
                        key={currentStartIndex + index} 
                        className={`${styles.dateButton} ${activeIndex === currentStartIndex + index ? styles.active : ""} ${date.weekday === "토" && activeIndex !== currentStartIndex + index ? styles.saturday : ""} ${date.weekday === "일" && activeIndex !== currentStartIndex + index ? styles.sunday : ""}`}
                        onClick={() => handleClick(currentStartIndex + index)}
                    >
                        {date.day}<br />
                        {date.weekday}
                    </button>
                ))}
            </div>
            <button className={styles.navButton} onClick={handleNext} disabled={currentStartIndex + 7 >= dateRange.length}>
                &gt;
            </button>
        </div>
    );
};

export default DateRangeDisplay;
