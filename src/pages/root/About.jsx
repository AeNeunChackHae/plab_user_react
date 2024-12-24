import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const AboutPage = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="about">
      <img
        src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fcompany%2F15911%2Fmdvnimnvfv0sb35a__1080_790.jpg&w=700&q=100"
        alt="About Us"
        className="about-image1"
      />
      <h1 className="howto"> HOW TO PLAY </h1>
      <img
        src="https://d31wz4d3hgve8q.cloudfront.net/static/img/about_howto_wide.png"
        alt="How To Play"
        className="about-image2"
      />
      <img
        src="https://d31wz4d3hgve8q.cloudfront.net/static/img/cover_about_02.png"
        alt="About Cover"
        className="about-image3"
      />
      <h1 className="about-heading">지금 가입하고 언제든 할 수 있어요.</h1>
      <h3 className="about-subheading"> 원데이 축구·풋살 플랩풋볼 </h3>
      <button className="signup-button" onClick={handleSignupClick}>
        가입하기
      </button>
    </div>
  );
};

export default AboutPage;
