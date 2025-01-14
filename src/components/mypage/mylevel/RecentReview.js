import React, { useState } from "react";
import "./RecentReview.css";
import { config } from '../../../config';

const RecentReview = ({ recentGames }) => {
  const api = config.aws.ec2_host_user
  const [showInputModal, setShowInputModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [formData, setFormData] = useState({
    activity_time: "",
    distance: "",
    kilocalorie: "",
    heart_rate: "",
  });

  // 활동량 입력 모달 토글
  const openInputModal = (game) => {
    setSelectedGame(game);
    setShowInputModal(true);
  };

  const closeInputModal = () => {
    setShowInputModal(false);
    setFormData({
      activity_time: "",
      distance: "",
      kilocalorie: "",
      heart_rate: "",
    });
  };

  // 기록 확인 모달 토글
  const openResultModal = (game) => {
    setSelectedGame(game);
    setShowResultModal(true);
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    setSelectedGame(null);
  };

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 활동량 데이터 POST 요청
  const handleSave = async () => {
    // console.log("[DEBUG] selectedGame.match_id:", selectedGame.match_id);
  
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Authorization token not found");
  
      const response = await fetch(`${api}/mypage/mylevel/activity`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchId: selectedGame.match_id,
          activity_time: formData.activity_time,
          distance: formData.distance,
          kilocalorie: formData.kilocalorie,
          heart_rate: formData.heart_rate,
        }),
      });
  
      if (!response.ok) throw new Error("Failed to save activity data");
  
      const result = await response.json();
      alert(result.message); // 저장 완료 알림
      // 페이지 새로고침
      window.location.reload();
    } catch (error) {
      console.error("Error saving activity data:", error);
      alert("활동량 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="recent-review">
      <h3>📍 최근 소셜 매치 리뷰</h3>
      {recentGames.map((game, index) => (
        <div key={index} className="review-item">
          <p>
            {game.date} | {game.location}
          </p>
          <div className="buttons">
            <button onClick={() => openInputModal(game)}>활동량 기입</button>
            <button onClick={() => openResultModal(game)}>기록 확인</button>
          </div>
        </div>
      ))}

      {/* 활동량 입력 모달 */}
      {showInputModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>활동량 기입</h3>
            <label>
              운동 시간:{" "}
              <input
                name="activity_time"
                type="text"
                placeholder="예: 2시간"
                value={formData.activity_time}
                onChange={handleChange}
              />
            </label>
            <label>
              이동 거리 (km):{" "}
              <input
                name="distance"
                type="number"
                value={formData.distance}
                onChange={handleChange}
              />
            </label>
            <label>
              총 소모 칼로리 (kcal):{" "}
              <input
                name="kilocalorie"
                type="number"
                value={formData.kilocalorie}
                onChange={handleChange}
              />
            </label>
            <label>
              평균 심박수 (bpm):{" "}
              <input
                name="heart_rate"
                type="number"
                value={formData.heart_rate}
                onChange={handleChange}
              />
            </label>
            <div className="modal-buttons">
              <button onClick={handleSave}>저장</button>
              <button onClick={closeInputModal}>닫기</button>
            </div>
          </div>
        </div>
      )}

      {/* 기록 확인 모달 */}
      {showResultModal && selectedGame && (
        <div className="modal">
          <div className="modal-content">
            <h3>기록 확인</h3>
            <ul>
              <li>⏱️ 활동 시간: {selectedGame.activity_time || "기록 없음"}</li>
              <li>📏 이동 거리: {selectedGame.distance || "기록 없음"} km</li>
              <li>🔥 칼로리 소모: {selectedGame.kilocalorie || "기록 없음"} kcal</li>
              <li>💓 평균 심박수: {selectedGame.heart_rate || "기록 없음"} bpm</li>
            </ul>
            <button onClick={closeResultModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentReview;
