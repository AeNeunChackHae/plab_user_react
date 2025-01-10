import React, { useState } from "react";
import styles from "./FeedbackForm.module.css";

const FeedbackForm = ({ matchId }) => {
  const [positiveFeedback, setPositiveFeedback] = useState([]);
  const [negativeFeedback, setNegativeFeedback] = useState([]);
  const [positiveTeam, setPositiveTeam] = useState("");
  const [positiveNumber, setPositiveNumber] = useState("");
  const [negativeTeam, setNegativeTeam] = useState("");
  const [negativeNumber, setNegativeNumber] = useState("");
  const [isPositiveActive, setIsPositiveActive] = useState(false);
  const [isNegativeActive, setIsNegativeActive] = useState(false);
  const [isBlacklistModalOpen, setIsBlacklistModalOpen] = useState(false);
  const [selectedBlacklistTeam, setSelectedBlacklistTeam] = useState("");
  const [selectedBlacklistNumber, setSelectedBlacklistNumber] = useState("");
  const [blacklistRegistered, setBlacklistRegistered] = useState(false);

  const teamOptions = ["빨강", "노랑", "파랑"];
  const numberOptions = Array.from({ length: 6 }, (_, i) => i + 1);

  const positiveOptions = [
    "슈팅이 좋아요",
    "드리블이 좋아요",
    "스피드가 빨라요",
    "패스를 잘해요",
    "게임 운영을 잘해요",
  ];
  const negativeOptions = [
    "패스를 더 빨리 주세요",
    "좀 더 뛰어주세요",
    "자신감 있게 해주세요",
    "조급해하지 마세요",
  ];

  const toggleFeedback = (index, isPositive) => {
    if (isPositive) {
      setPositiveFeedback((prev) =>
        prev.includes(index)
          ? prev.filter((item) => item !== index)
          : [...prev, index]
      );
    } else {
      setNegativeFeedback((prev) =>
        prev.includes(index)
          ? prev.filter((item) => item !== index)
          : [...prev, index]
      );
    }
  };

  const handleRegisterBlacklist = async () => {
    if (!selectedBlacklistTeam || !selectedBlacklistNumber) {
      alert("블랙리스트로 등록할 팀과 등번호를 선택해 주세요.");
      return;
    }

    const blackUserId = `${selectedBlacklistTeam}-${selectedBlacklistNumber}`;

    try {
      const response = await fetch(`http://localhost:8080/mypage/blacklist/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blackUserId }),
      });

      if (!response.ok) {
        console.error("Failed to register blacklist:", await response.json());
        alert("블랙리스트 등록에 실패했습니다.");
        return;
      }

      alert("블랙리스트를 등록하였습니다.");
      setBlacklistRegistered(true);
      setIsBlacklistModalOpen(false);
    } catch (error) {
      console.error("Error registering blacklist:", error);
    }
  };

  const handleSubmitFeedback = async () => {
    const positiveUserId = `${positiveTeam}-${positiveNumber}`;
    const negativeUserId = `${negativeTeam}-${negativeNumber}`;

    try {
      if (positiveFeedback.length > 0 && positiveUserId) {
        await fetch(`http://localhost:8080/mypage/feedback/${matchId}/good`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            matchId,
            giverId: localStorage.getItem("userId"),
            userId: positiveUserId,
            feedback: positiveFeedback,
          }),
        });
      }

      if (negativeFeedback.length > 0 && negativeUserId) {
        await fetch(`http://localhost:8080/mypage/feedback/${matchId}/bad`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            matchId,
            giverId: localStorage.getItem("userId"),
            userId: negativeUserId,
            feedback: negativeFeedback,
          }),
        });
      }

      alert("피드백이 성공적으로 제출되었습니다.");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>피드백 작성</h1>

      {/* 칭찬할 유저 버튼 */}
      <div className={styles.toggleSection}>
        <button
          onClick={() => setIsPositiveActive((prev) => !prev)}
          className={`${styles.toggleButton} ${
            isPositiveActive ? styles.activeButton : ""
          }`}
        >
          칭찬할 유저 있음
        </button>
        <button
          onClick={() => setIsPositiveActive(false)}
          className={`${styles.toggleButton}`}
        >
          칭찬할 유저 없음
        </button>
      </div>

      {isPositiveActive && (
        <div className={styles.feedbackSection}>
          <h2>칭찬해요 (긍정 피드백)</h2>
          <div className={styles.selectRow}>
            <label>유저 팀</label>
            <select onChange={(e) => setPositiveTeam(e.target.value)}>
              <option value="">선택하세요</option>
              {teamOptions.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
            <label>유저 등번호</label>
            <select onChange={(e) => setPositiveNumber(e.target.value)}>
              <option value="">선택하세요</option>
              {numberOptions.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.feedbackOptions}>
            {positiveOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => toggleFeedback(index, true)}
                className={`${styles.feedbackButton} ${
                  positiveFeedback.includes(index) ? styles.activeFeedback : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 부족한 유저 버튼 */}
      <div className={styles.toggleSection}>
        <button
          onClick={() => setIsNegativeActive((prev) => !prev)}
          className={`${styles.toggleButton} ${
            isNegativeActive ? styles.activeButton : ""
          }`}
        >
          부족한 유저 있음
        </button>
        <button
          onClick={() => setIsNegativeActive(false)}
          className={`${styles.toggleButton}`}
        >
          부족한 유저 없음
        </button>
      </div>

      {isNegativeActive && (
        <div className={styles.feedbackSection}>
          <h2>부족해요 (부정 피드백)</h2>
          <div className={styles.selectRow}>
            <label>유저 팀</label>
            <select onChange={(e) => setNegativeTeam(e.target.value)}>
              <option value="">선택하세요</option>
              {teamOptions.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
            <label>유저 등번호</label>
            <select onChange={(e) => setNegativeNumber(e.target.value)}>
              <option value="">선택하세요</option>
              {numberOptions.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.feedbackOptions}>
            {negativeOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => toggleFeedback(index, false)}
                className={`${styles.feedbackButton} ${
                  negativeFeedback.includes(index) ? styles.activeFeedback : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 블랙리스트 등록 */}
      <div className={styles.blacklistSection}>
        <button
          onClick={() => setIsBlacklistModalOpen(true)}
          className={styles.blacklistButton}
          disabled={blacklistRegistered}
        >
          {blacklistRegistered ? "블랙리스트 등록 완료" : "블랙리스트 등록"}
        </button>
      </div>

      <button onClick={handleSubmitFeedback} className={styles.submitButton}>
        피드백 제출하기
      </button>

      {/* 블랙리스트 모달 */}
      {isBlacklistModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>블랙리스트로 등록할 유저를 선택해 주세요</h2>
            <div className={styles.selectRow}>
              <label>유저 팀</label>
              <select
                onChange={(e) => setSelectedBlacklistTeam(e.target.value)}
                className={styles.select}
              >
                <option value="">선택하세요</option>
                {teamOptions.map((team, index) => (
                  <option key={index} value={team}>
                    {team}
                  </option>
                ))}
              </select>
              <label>유저 등번호</label>
              <select
                onChange={(e) => setSelectedBlacklistNumber(e.target.value)}
                className={styles.select}
              >
                <option value="">선택하세요</option>
                {numberOptions.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleRegisterBlacklist}
              className={styles.registerButton}
            >
              등록하기
            </button>
            <button
              onClick={() => setIsBlacklistModalOpen(false)}
              className={styles.closeButton}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
