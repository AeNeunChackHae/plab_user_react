import React, { useState } from "react";
import styles from "./Filters.module.css";
import Modal from "./Modal";

const DatePickerCustom = ({ selectedDate, setSelectedDate }) => {
    const today = new Date();
    // const [currentYear, setCurrentYear] = useState(today.getFullYear());
    // const [currentMonth, setCurrentMonth] = useState(today.getMonth());

    const generateCalendarData = () => {
        const days = Array.from({ length: 30 }, (_, i) => {
            const day = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
            return {
                date: day.getDate(),
                month: day.getMonth(),
                year: day.getFullYear(),
                dayOfWeek: day.getDay(),
            };
        });

        // Group days by month and year
        const groupedByMonth = days.reduce((acc, day) => {
            const key = `${day.year}-${day.month}`;
            if (!acc[key]) acc[key] = { year: day.year, month: day.month, days: [] };
            acc[key].days.push(day);
            return acc;
        }, {});

        return Object.values(groupedByMonth);
    };

    const calendarData = generateCalendarData();

    // 날짜 선택 업데이트트
    const handleDateSelect = (day, month, year) => {
        const newDate = new Date(year, month, day);
        setSelectedDate(newDate); // 날짜를 선택한 경우 상태 업데이트
    };

    return (
        <div className={styles.datePickerContainer}>
            {/* 요일 헤더 */}
            <div className={styles.dayHeaderRowHorizontal}>
                {"일월화수목금토".split("").map((day, index) => (
                    <div key={index} className={styles.dayHeader}>
                        {day}
                    </div>
                ))}
            </div>

            {/* 달력 내용 */}
            <div className={styles.datePickerGridScrollable}>
                {calendarData.map(({ year, month, days }) => (
                    <div key={`${year}-${month}`} className={styles.monthSection}>
                        <div className={styles.monthHeader}>
                            {year}년 {month + 1}월
                        </div>
                        <div className={styles.datePickerGrid}>
                            {/* 빈 셀 추가 */}
                            {Array.from({ length: days[0].dayOfWeek }, (_, i) => (
                                <div key={`empty-${i}`} className={styles.emptyCell}></div>
                            ))}
                            {days.map(({ date, year, month }, index) => {
                                const isSelected =
                                    selectedDate &&
                                    selectedDate.getDate() === date &&
                                    selectedDate.getMonth() === month &&
                                    selectedDate.getFullYear() === year;

                                return (
                                    <button
                                        key={index}
                                        className={`${styles.dayCell} ${isSelected ? styles.selected : ""}`}
                                        onClick={() => handleDateSelect(date, month, year)}
                                    >
                                        {date}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Filters = ({ selectedRegion, setSelectedRegion, selectedDate, setSelectedDate, selectedTimes, setSelectedTimes }) => {
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (type) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);

    const handleTimeSelect = (time) => {
        if (selectedTimes.includes(time)) {
            setSelectedTimes(selectedTimes.filter((t) => t !== time));
        } else {
            setSelectedTimes([...selectedTimes, time]);
        }
    };

    return (
        <div className={styles.filters}>
            <button
                className={`${styles.filterButton} ${selectedRegion !== "모든 지역" ? styles.active : ""}`}
                onClick={() => openModal("Local")}
            >
                {selectedRegion}
            </button>
            <button
                className={styles.filterButton}
                onClick={() => openModal("Date")}
            >
                날짜 선택
            </button>
            <button
                className={styles.filterButton}
                onClick={() => openModal("Time")}
            >
                시간 선택
            </button>

            {/* 지역 선택 모달 */}
            {activeModal === "Local" && (
                <Modal title="지역" onClose={closeModal}>
                    <div className={styles.modalContent}>
                        <ul>
                            {["모든 지역", "서울", "경기", "인천", "강원", "대전/세종", "충남", "충북", "대구", "경북", "부산", "울산", "경남", "제주"].map(
                                (region) => (
                                    <li
                                        key={region}
                                        className={styles.regionItem}
                                        onClick={() => {
                                            setSelectedRegion(region);
                                            closeModal();
                                        }}
                                    >
                                        {region}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </Modal>
            )}

            {/* 날짜 선택 모달 */}
            {activeModal === "Date" && (
                <Modal title="날짜" onClose={closeModal}>
                    <div className={styles.modalContent}>
                        <DatePickerCustom
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button 
                            className={styles.applyButton}
                            onClick={closeModal}
                        >
                            필터 적용
                        </button>
                    </div>
                </Modal>
            )}

            {/* 시간 선택 모달 */}
            {activeModal === "Time" && (
                <Modal title="시간" onClose={closeModal}>
                    <div className={styles.modalContent}>
                        <p className={styles.timeHeader}>시작시간 기준</p>
                        <div className={styles.timeGrid}>
                            {[
                                "6~8시",
                                "8~10시",
                                "10~12시",
                                "12~14시",
                                "14~16시",
                                "16~18시",
                                "18~20시",
                                "20~22시",
                                "22~24시",
                                "24~26시",
                                "26~28시",
                                "28~30시",
                            ].map((time) => (
                                <button
                                    key={time}
                                    className={`${styles.timeButton} ${
                                        selectedTimes.includes(time)
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={() => handleTimeSelect(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                        <div className={styles.buttonContainer}>
                            <button
                                className={styles.resetButton}
                                onClick={() => {
                                    setSelectedTimes([]);
                                }}
                            >
                                초기화
                            </button>
                            <button
                                className={styles.applyButton}
                                onClick={closeModal}
                            >
                                필터 적용
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Filters;
