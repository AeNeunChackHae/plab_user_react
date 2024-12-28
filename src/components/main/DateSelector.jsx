import React, { useState, useEffect, useRef } from "react";
import styles from "./DateSelector.module.css";

const DateRangeDisplay = ({ onDateSelect }) => {
    const [dateRange, setDateRange] = useState([]); // 날짜 목록
    const [activeIndex, setActiveIndex] = useState(null); // 선택된 날짜 인덱스
    const [currentStartIndex, setCurrentStartIndex] = useState(0); // 현재 시작 인덱스

    const onDateSelectRef = useRef(onDateSelect);

    useEffect(() => {
        onDateSelectRef.current = onDateSelect;
    }, [onDateSelect]);

    // 날짜 목록 초기화
    useEffect(() => {
        const today = new Date();
        const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

        const range = Array.from({ length: 14 }, (_, i) => {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            const day = futureDate.getDate();
            const weekday = weekdays[futureDate.getDay()];
            const fullDate = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            return {
                day,
                weekday,
                fullDate,
            };
        });

        setDateRange(range);

        const todayIndex = 0;
        setActiveIndex(todayIndex);
        setCurrentStartIndex(0);
        onDateSelectRef.current(range[todayIndex]?.fullDate);
    }, []);

    const handleClick = (index) => {
        const actualIndex = currentStartIndex + index; // 실제 인덱스 계산
        setActiveIndex(actualIndex); // 선택된 날짜 인덱스 설정
        onDateSelectRef.current(dateRange[actualIndex]?.fullDate); // 선택된 날짜 전달
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
            <button 
                className={styles.navButton} 
                onClick={handlePrev} 
                disabled={currentStartIndex === 0}
            >
                &lt;
            </button>
            <div className={styles.dateSelector}>
                {dateRange.slice(currentStartIndex, currentStartIndex + 7).map((date, index) => {
                    const actualIndex = currentStartIndex + index;
                    return (
                        <button 
                            key={actualIndex} 
                            className={`
                                ${styles.dateButton} 
                                ${activeIndex === actualIndex ? styles.active : ""} 
                                ${activeIndex !== actualIndex && date.weekday === "토" ? styles.saturday : ""} 
                                ${activeIndex !== actualIndex && date.weekday === "일" ? styles.sunday : ""}
                            `}
                            onClick={() => handleClick(index)}
                        >
                            {date.day}<br />{date.weekday}
                        </button>
                    );
                })}
            </div>
            <button 
                className={styles.navButton}
                onClick={handleNext} 
                disabled={currentStartIndex + 7 >= dateRange.length}
            >
                &gt;
            </button>
        </div>
    );
};

export default DateRangeDisplay;