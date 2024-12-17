import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './FacilitiesContent.module.css';

const FacilitiesContent = () => {
  const [selectedDate, setSelectedDate] = useState(0);
  const sliderRef = useRef(null);

  const generateDates = () => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const day = date.getDate();
      const weekday = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
      dates.push({
        id: i,
        day: day < 10 ? `0${day}` : day,
        weekday,
        isSat: date.getDay() === 6,
        isSun: date.getDay() === 0,
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
    centerPadding: '10px', // 중앙 컨텐츠 padding 값
    draggable: true,
    swipeToSlide: true,
    waitForAnimate: false,
    arrows: false,
  };
  
  

  return (
    <div className={styles.facilitiesContent}>
      <button
        className={`${styles.arrowButton} ${styles.arrowLeft}`}
        onClick={() => sliderRef.current.slickPrev()}
      >
        &#x276E;
      </button>
      <div className={styles.dateContainer}>
        <Slider ref={sliderRef} {...settings}>
          {dates.map((date) => (
            <div
              key={date.id}
              className={`${styles.dateWrap} ${
                selectedDate === date.id ? styles.isActive : ''
              } ${date.isSat ? styles.isSat : ''} ${date.isSun ? styles.isSun : ''}`}
              onClick={() => setSelectedDate(date.id)}
            >
              <p>{date.day}</p>
              <span>{date.weekday}</span>
            </div>
          ))}
        </Slider>
      </div>
      <button
        className={`${styles.arrowButton} ${styles.arrowRight}`}
        onClick={() => sliderRef.current.slickNext()}
      >
        &#x276F;
      </button>
    </div>
  );
};

export default FacilitiesContent;
