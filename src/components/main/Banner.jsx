import React from "react";
import styles from "./Banner.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export default function PauseOnHover() {
  const bannerItems = [
    { imgSrc: "/images/banner1.png", label: "배너1", link: "/banner1" },
    { imgSrc: "/images/banner2.png", label: "배너2", link: "/banner2" }
  ];
  
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {bannerItems.map((item, index) => (
          <div
            key={index}
            className={styles.bannerContainer}
            onClick={() => window.location.href = item.link}
          >
            <img src={item.imgSrc} alt={item.label} className={styles.bannerImage}/>
          </div>
        ))}
      </Slider>
    </div>
  );
}