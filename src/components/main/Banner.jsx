import React from "react";
import styles from "./Banner.module.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PauseOnHover() {
    const navigate = useNavigate();

    // 배너 아이템 설정
    const bannerItems = [
        { imgSrc: "/images/banner1.png", label: "배너1", link: "/league" }, 
        { imgSrc: "/images/banner2.png", label: "배너2", link: "/explore/3/matches" }
    ];

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true
    };

    const handleBannerClick = (link) => {
        navigate(link); 
    };

    return (
        <div className={styles.sliderContainer}>
            <Slider {...settings}>
                {bannerItems.map((item, index) => (
                    <div
                        key={index}
                        className={styles.bannerContainer}
                        onClick={() => handleBannerClick(item.link)} // 클릭 시 라우팅
                    >
                        <img
                            src={item.imgSrc}
                            alt={item.label}
                            className={styles.bannerImage}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
