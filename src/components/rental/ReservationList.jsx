import React from "react";
import ReservationItem from "../ReservationItem/ReservationItem";
import TimeSlot from "../TimeSlot/TimeSlot";
import styles from "./ReservationList.module.css";

const ReservationList = ({ reservations }) => {
  return (
    <div className={styles.list}>
      {reservations.map((res, index) => (
        <div key={index}>
          <ReservationItem
            title={res.title}
            size={res.size}
            price={res.price}
            image={res.image}
            availability={res.availability}
          />
          <TimeSlot slots={res.slots} />
        </div>
      ))}
      <div className={styles.labels}>
                <span>06시</span>
                <span>12시</span>
                <span>18시</span>
                <span>00시</span>
            </div>
    </div>
  );
};

export default ReservationList;
