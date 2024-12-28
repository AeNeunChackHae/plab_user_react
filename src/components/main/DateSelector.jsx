import React, { useState, useEffect, useRef } from "react";
import styles from "./DateSelector.module.css";

const DateRangeDisplay = ({ onDateSelect }) => {
    const [dateRange, setDateRange] = useState([]); // 날짜 목록
    const [activeIndex, setActiveIndex] = useState(null); // 선택된 날짜 인덱스
    const [currentStartIndex, setCurrentStartIndex] = useState(0); // 현재 시작 인덱스

    // onDateSelect를 useRef로 참조 유지
    const onDateSelectRef = useRef(onDateSelect);

    useEffect(() => {
        onDateSelectRef.current = onDateSelect;
    }, [onDateSelect]);

    // 날짜 목록 초기화 (최초 1회만 실행)
    useEffect(() => {
        const today = new Date();
        const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

        // 14일 동안의 날짜 목록 생성
        const range = Array.from({ length: 14 }, (_, i) => {
            const futureDate = new Date();
            futureDate.setDate(today.getDate() + i);
            return {
                day: futureDate.getDate(),
                weekday: weekdays[futureDate.getDay()],
                fullDate: futureDate.toISOString().split('T')[0],
            };
        });

        setDateRange(range);

        // 오늘 날짜를 `activeIndex`로 설정
        const todayIndex = range.findIndex(date => date.fullDate === today.toISOString().split('T')[0]);
        setActiveIndex(todayIndex);
        setCurrentStartIndex(Math.max(0, todayIndex - 3));

        // useRef를 통해 안정적으로 전달
        onDateSelectRef.current(range[todayIndex]?.fullDate);
    }, []); // 빈 배열로 설정하여 한 번만 실행

    // 날짜 버튼 클릭 핸들러
    const handleClick = (index) => {
        const actualIndex = currentStartIndex + index; // 실제 인덱스 계산
        setActiveIndex(actualIndex); // 선택된 날짜 인덱스 설정
        onDateSelectRef.current(dateRange[actualIndex]?.fullDate); // useRef를 통해 함수 호출
    };

    // 다음 날짜 목록으로 이동
    const handleNext = () => {
        if (currentStartIndex + 7 < dateRange.length) {
            setCurrentStartIndex(currentStartIndex + 1); // 시작 인덱스 이동
        }
    };

    // 이전 날짜 목록으로 이동
    const handlePrev = () => {
        if (currentStartIndex > 0) {
            setCurrentStartIndex(currentStartIndex - 1); // 시작 인덱스 이동
        }
    };

    return (
        <div className={styles.dateSelectorContainer}>
            {/* 이전 버튼 */}
            <button 
                className={styles.navButton} 
                onClick={handlePrev} 
                disabled={currentStartIndex === 0}
            >
                &lt;
            </button>

            {/* 날짜 버튼 목록 */}
            <div className={styles.dateSelector}>
                {dateRange.slice(currentStartIndex, currentStartIndex + 7).map((date, index) => {
                    const actualIndex = currentStartIndex + index; // 실제 인덱스 계산

                    return (
                        <button 
                            key={actualIndex} 
                            className={` 
                                ${styles.dateButton} 
                                ${activeIndex === actualIndex ? styles.active : ""} 
                                ${activeIndex !== actualIndex && date.weekday === "토" ? styles.saturday : ""} 
                                ${activeIndex !== actualIndex && date.weekday === "일" ? styles.sunday : ""}
                            `}
                            onClick={() => handleClick(index)} // 상대적 index 전달
                        >
                            {date.day}<br />{date.weekday}
                        </button>
                    );
                })}
            </div>

            {/* 다음 버튼 */}
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
