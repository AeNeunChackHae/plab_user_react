import React, { useEffect, useState } from "react";
import Sidebar from "../../components/mypage/mylevel/Sidebar";
import FeedbackCard from "../../components/mypage/mylevel/FeedbackCard";
import Feedback from "../../components/mypage/mylevel/Feedback";
import ActivityInfo from "../../components/mypage/mylevel/ActivityInfo";
import RecentReview from "../../components/mypage/mylevel/RecentReview";
import "../mypage/MyLevelPage.css";

const MyLevelPage = () => {
  const [userData, setUserData] = useState({
    levelImage: "path/to/image.png",
    pom: 0,
    yellowCard: 0,
    redCard: 0,
    positiveCompliments: [],
    negativeCompliments: [],
    avgDistance: 0,
    avgCalories: 0,
    recentGames: [],
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) throw new Error("Authorization token not found");

        const response = await fetch('http://127.0.0.1:8080/mypage/mylevel', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();

        // 피드백 타입 분류
        const positiveFeedback = data.feedback
          .filter((item) => item.feedback_type === 0)
          .map((item) => ({
            text: feedbackTextMapper(item.feedback, item.feedback_type),
            vote: item.count,
          }));

        const negativeFeedback = data.feedback
          .filter((item) => item.feedback_type === 1)
          .map((item) => ({
            text: feedbackTextMapper(item.feedback, item.feedback_type),
            vote: item.count,
          }));

        const recentGames = data.allMatches.map((match) => ({
          match_id: match.match_id,
          date: match.match_start_time.split(' ')[0], // 날짜만 추출
          location: match.stadium_name,
          activity_time: match.activity_time,
          distance: match.distance,
          kilocalorie: match.kilocalorie,
          heart_rate: match.heart_rate,
        }));
        console.log("✅ [DEBUG] recentGames:", recentGames);

        setUserData({
          levelImage: "path/to/image.png",
          pom: data.pom,
          yellowCard: data.yellow_card,
          redCard: data.red_card,
          positiveCompliments: positiveFeedback,
          negativeCompliments: negativeFeedback,
          avgDistance: data.average?.distance || 0,
          avgCalories: data.average?.kilocalorie || 0,
          recentGames,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // 피드백 텍스트 매핑
  const feedbackTextMapper = (feedback, type) => {
    const positiveFeedbackMap = {
      0: "슈팅이 좋아요",
      1: "드리블이 좋아요",
      2: "스피드가 빨라요",
      3: "패스를 잘해요",
      4: "게임 운영을 잘해요",
    };

    const negativeFeedbackMap = {
      0: "패스를 더 빨리 주세요",
      1: "좀 더 뛰어주세요",
      2: "자신감 있게 해주세요",
      3: "조급해하지 마세요",
    };

    return type === 0
      ? positiveFeedbackMap[feedback] || "알 수 없는 긍정적 피드백"
      : negativeFeedbackMap[feedback] || "알 수 없는 부정적 피드백";
  };

  return (
    <div className="my-level-page">
      <div className="section-sidebar">
        <Sidebar levelImage={userData.levelImage} />
      </div>
      <div className="section-mylevel">
        <FeedbackCard
          pom={userData.pom}
          yellowCard={userData.yellowCard}
          redCard={userData.redCard}
        />
        <Feedback
          positiveCompliments={userData.positiveCompliments}
          negativeCompliments={userData.negativeCompliments}
        />
        <ActivityInfo
          avgDistance={userData.avgDistance}
          avgCalories={userData.avgCalories}
        />
        <RecentReview recentGames={userData.recentGames} />
      </div>
    </div>
  );
};

export default MyLevelPage;
