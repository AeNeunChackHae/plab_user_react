import React from "react";
import TimeSlot from "./TimeSlot";
import styles from "./ReservationItem.module.css";

const ReservationItem = ({ name, size, price, img, time }) => {

    return (
        <div className={styles.item}>
            <div className={styles.info}>
                <div className={styles.details}>
                    <span className={styles.title}>{name}</span> <br />
                    <span className={styles.size}>{size}</span> <br />
                    <span className={styles.price}>{price}원/시간</span>
                </div>
                <img src={img} alt={name} className={styles.image} />
            </div>
            <div className={styles.timeslots}>
                <TimeSlot time={time} />
            </div>
        </div>
    );
};

export default ReservationItem;
