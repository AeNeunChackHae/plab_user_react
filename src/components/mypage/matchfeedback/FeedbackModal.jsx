import React, { useState } from "react";
import styles from "./FeedbackModal.module.css";

const FeedbackModal = ({ player, matchId, currentUserId, onClose }) => {
  const [goodFeedback, setGoodFeedback] = useState([]);
  const [badFeedback, setBadFeedback] = useState([]);

  const submitFeedback = async (type) => {
    const feedback = type === "good" ? goodFeedback : badFeedback;
    const url = `http://localhost:8080/mypage/feedback/${matchId}/${type}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchId,
          giverId: currentUserId,
          userId: player.user_id,
          feedback,
        }),
      });

      if (!response.ok) {
        console.error(`Failed to submit ${type} feedback:`, await response.json());
        return;
      }

      alert(`${type === "good" ? "긍정" : "부정"} 피드백이 제출되었습니다.`);
      onClose();
    } catch (error) {
      console.error(`Error submitting ${type} feedback:`, error);
    }
  };

  const addToBlacklist = async () => {
    try {
      const response = await fetch("http://localhost:8080/mypage/blacklist/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blackUserId: player.user_id }),
      });

      if (!response.ok) {
        console.error("Failed to add to blacklist:", await response.json());
        return;
      }

      alert("블랙리스트에 추가되었습니다.");
      onClose();
    } catch (error) {
      console.error("Error adding to blacklist:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>유저 ID: {player.user_id} 평가</h2>
        <div className={styles.feedbackOptions}>
          <h3>긍정 피드백</h3>
          {["슈팅이 좋아요", "드리블이 좋아요", "스피드가 빨라요", "패스를 잘해요", "게임 운영을 잘해요"].map(
            (label, index) => (
              <button
                key={index}
                onClick={() => setGoodFeedback([index])}
                className={styles.feedbackButton}
              >
                {label}
              </button>
            )
          )}
          <button
            onClick={() => submitFeedback("good")}
            className={styles.submitButton}
          >
            긍정 피드백 제출
          </button>
        </div>

        <div className={styles.feedbackOptions}>
          <h3>부정 피드백</h3>
          {["패스를 더 빨리 주세요", "좀 더 뛰어주세요", "자신감 있게 해주세요", "조급해하지 마세요"].map(
            (label, index) => (
              <button
                key={index}
                onClick={() => setBadFeedback([index])}
                className={styles.feedbackButton}
              >
                {label}
              </button>
            )
          )}
          <button
            onClick={() => submitFeedback("bad")}
            className={styles.submitButton}
          >
            부정 피드백 제출
          </button>
        </div>

        <button onClick={addToBlacklist} className={styles.blacklistButton}>
          블랙리스트 추가
        </button>
        <button onClick={onClose} className={styles.closeButton}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
