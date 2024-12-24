import React from "react";
import styles from "./TimeSlot.module.css";

const TimeSlot = ({ time }) => {
    // 24칸으로 초기화 (1칸 = 1시간)
    const timeSlots = Array(24).fill(false);

    // 주어진 시간 데이터로 예약 가능 시간 업데이트
    time.forEach((slot) => {
        for (let i = slot.start - 6; i < slot.end - 6; i++) {
            if (i >= 0 && i < 24) {
                timeSlots[i] = true;
            }
        }
    });

    return (
        <div className={styles.container}>
            <div className={styles.bar}>
                {timeSlots.map((available, index) => (
                    <div
                        key={index}
                        className={styles.slot}
                        style={{
                            backgroundColor: available ? "#007bff" : "#ccc",
                        }}
                    ></div>
                ))}
            </div>
            <div className={styles.labels}>
                {Array(24)
                    .fill(null)
                    .map((_, index) => (
                        <span key={index} className={styles.label}>
                            {index === 0 && "06시"}
                            {index === 6 && "12시"}
                            {index === 12 && "18시"}
                            {index === 18 && "00시"}
                        </span>
                    ))}
            </div>
            {/* 예약 가능/불가 설명 */}
            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <div className={styles.legendBlock} style={{ backgroundColor: "#007bff" }}></div>
                    <span>예약 가능</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={styles.legendBlock} style={{ backgroundColor: "#ccc" }}></div>
                    <span>예약 불가</span>
                </div>
            </div>
        </div>
    );
};

export default TimeSlot;
