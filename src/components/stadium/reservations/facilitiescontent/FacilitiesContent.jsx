import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./FacilitiesContent.module.css";

const FacilitiesContent = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(0);
  const sliderRef = useRef(null);

  const generateDates = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const day = date.getDate();
      const weekday = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
      const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD 형식
      dates.push({
        id: i,
        day: day < 10 ? `0${day}` : day,
        weekday,
        isSat: date.getDay() === 6,
        isSun: date.getDay() === 0,
        fullDate: formattedDate, // 추가된 fullDate 값
      });
    }
    return dates;
  };

  const dates = generateDates();

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 7,
    slidesToScroll: 1,
    draggable: true,
    swipeToSlide: true,
    arrows: false,
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.id);
    onDateChange(date.fullDate); // 부모 컴포넌트에 선택된 날짜 전달
  };

  return (
    <div className={styles.facilitiesContent}>
      <div className={styles.dateContainer}>
        {/* ✅ 화살표 버튼을 dateContainer 내부로 이동 */}
        <button
          className={`${styles.arrowButton} ${styles.arrowLeft}`}
          onClick={() => sliderRef.current.slickPrev()}
        >
          &#x276E;
        </button>

        <Slider ref={sliderRef} {...settings}>
          {dates.map((date) => (
            <div
              key={date.id}
              className={`${styles.dateWrap} ${
                selectedDate === date.id ? styles.isActive : ""
              } ${date.isSat ? styles.isSat : ""} ${date.isSun ? styles.isSun : ""}`}
              onClick={() => handleDateChange(date)}
            >
              <p>{date.day}</p>
              <span>{date.weekday}</span>
            </div>
          ))}
        </Slider>

        <button
          className={`${styles.arrowButton} ${styles.arrowRight}`}
          onClick={() => sliderRef.current.slickNext()}
        >
          &#x276F;
        </button>
      </div>
    </div>
  );
};

export default FacilitiesContent;
