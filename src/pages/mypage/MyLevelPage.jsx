import React from "react";
import Sidebar from "../../components/mypage/mylevel/Sidebar";
import FeedbackCard from "../../components/mypage/mylevel/FeedbackCard";
import Feedback from "../../components/mypage/mylevel/Feedback";
import ActivityInfo from "../../components/mypage/mylevel/ActivityInfo";
import RecentReview from "../../components/mypage/mylevel/RecentReview";
import "../mypage//MyLevelPage.css";

const MyLevelPage = () => {
  const mockData = {
    levelImage: "path/to/image.png",
    pom: 24,
    yellowCard: 1,
    redCard: 2,
    compliments: [
      { text: "슈팅이 좋아요", vote: "1" },
      { text: "드리블이 좋아요", vote: "2" },
      { text: "스피드가 빨라요", vote: "4" },
      { text: "패스를 잘해요", vote: "1" },
      { text: "게임 운영을 잘해요", vote: "1" },
      { text: "패스를 빨리 주세요", vote: "2" },
      { text: "좀 더 뛰어주세요", vote: "0" },
      { text: "자신감 있게 해주세요", vote: "0" },
      { text: "조급해 하지 마세요", vote: "2" },
    ],
    avgDistance: 5.3,
    avgCalories: 450,
    recentGames: [
      { date: "2024.11.17", location: "수원 HK 풋살파크 3구장" },
      { date: "2024.11.14", location: "플랩 스타디움 수원 1구장" },
      { date: "2024.11.10", location: "용인 기흥 풋살스타디움 레드" },
      { date: "2024.11.05", location: "구리 아천 스타디움 1구장" },
      { date: "2024.11.01", location: "고양 쾨닉스 이마트 화정점 블랙구장" },
      { date: "2024.10.12", location: "잠실 종합운동장 3구장" },
      { date: "2024.11.17", location: "수원 HK 풋살파크 3구장" },
      { date: "2024.11.14", location: "플랩 스타디움 수원 1구장" },
      { date: "2024.11.10", location: "용인 기흥 풋살스타디움 레드" },
      { date: "2024.11.05", location: "구리 아천 스타디움 1구장" },
      { date: "2024.11.01", location: "고양 쾨닉스 이마트 화정점 블랙구장" },
      { date: "2024.10.12", location: "잠실 종합운동장 3구장" },
      { date: "2024.11.17", location: "수원 HK 풋살파크 3구장" },
      { date: "2024.11.14", location: "플랩 스타디움 수원 1구장" },
      { date: "2024.11.10", location: "용인 기흥 풋살스타디움 레드" },
      { date: "2024.11.05", location: "구리 아천 스타디움 1구장" },
      { date: "2024.11.01", location: "고양 쾨닉스 이마트 화정점 블랙구장" },
      { date: "2024.10.12", location: "잠실 종합운동장 3구장" },
    ],
  };

  return (
    <div className="my-level-page">
      <div className="section-sidebar">
        <Sidebar levelImage={mockData.levelImage} />
      </div>
      <div className="section-mylevel">
        <FeedbackCard
          pom={mockData.pom}
          smileCard={mockData.smileCard}
          yellowCard={mockData.yellowCard}
          redCard={mockData.redCard}
        />
        <Feedback compliments={mockData.compliments} />
        <ActivityInfo
          avgDistance={mockData.avgDistance}
          avgCalories={mockData.avgCalories}
        />
        <RecentReview recentGames={mockData.recentGames} />
      </div>
    </div>
  );
};

export default MyLevelPage;
