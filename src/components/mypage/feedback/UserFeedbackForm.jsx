import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserFeedbackForm.module.css";
import { config } from '../../../config';

const FeedbackForm = ({ players, currentUserId, matchId }) => {
  const api = config.aws.ec2_host_user
  const navigate = useNavigate();

  const [positiveFeedback, setPositiveFeedback] = useState([]);
  const [negativeFeedback, setNegativeFeedback] = useState([]);
  const [positiveTeam, setPositiveTeam] = useState("");
  const [positiveNumber, setPositiveNumber] = useState("");
  const [negativeTeam, setNegativeTeam] = useState("");
  const [negativeNumber, setNegativeNumber] = useState("");
  const [isPraiseModalOpen, setIsPraiseModalOpen] = useState(false);
  const [isNegativeModalOpen, setIsNegativeModalOpen] = useState(false);
  const [isPraiseSaved, setIsPraiseSaved] = useState(false);
  const [isNegativeSaved, setIsNegativeSaved] = useState(false);
  const [isBlacklistModalOpen, setIsBlacklistModalOpen] = useState(false);
  const [selectedBlacklistTeam, setSelectedBlacklistTeam] = useState("");
  const [selectedBlacklistNumber, setSelectedBlacklistNumber] = useState("");
  const [blacklistRegistered, setBlacklistRegistered] = useState(false);

  const teamOptions = ["빨강", "노랑", "파랑"];

  const getDisplayText = (player) => {
    if (player.user_id === currentUserId) return "나";
    if (player.status_code === 2) return "불참";
    return player.user_number + 1;
  };

  const resetPraiseFeedback = () => {
    setPositiveTeam("");
    setPositiveNumber("");
    setPositiveFeedback([]);
    setIsPraiseSaved(false);
  };

  const resetNegativeFeedback = () => {
    setNegativeTeam("");
    setNegativeNumber("");
    setNegativeFeedback([]);
    setIsNegativeSaved(false);
  };

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

  // 피드백 추가/제거
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

  // 칭찬 정보 저장
  const handlePraiseSubmit = () => {
    if (positiveFeedback.length === 0) {
      alert("피드백을 선택해 주세요!");
      return;
    }

    const selectedPlayer = players.find(
      (player) =>
        player.user_team === Number(positiveTeam) &&
        player.user_number === Number(positiveNumber)
    );

    console.log(selectedPlayer)
    if (!selectedPlayer) {
      alert("선택된 유저가 없습니다.");
      resetPraiseFeedback();
      return;
    }

    if (selectedPlayer.user_id === currentUserId) {
      alert("본인 피드백은 불가능해요!");
      resetPraiseFeedback();
      return;
    }

    if (selectedPlayer.status_code === 2) {
      alert("불참 멤버 피드백은 불가능해요!");
      resetPraiseFeedback();
      return;
    }

    setIsPraiseSaved(true);
    alert("칭찬 피드백이 저장되었습니다.");
    setIsPraiseModalOpen(false);
  };

  // 비매너 정보 저장
  const handleNegativeSubmit = () => {
    if (negativeFeedback.length === 0) {
      alert("피드백을 선택해 주세요!");
      return;
    }
    
    const selectedPlayer = players.find(
      (player) =>
        player.user_team === Number(negativeTeam) &&
        player.user_number === Number(negativeNumber)
    );

    if (!selectedPlayer) {
      alert("선택된 유저가 없습니다.");
      resetNegativeFeedback();
      return;
    }

    if (selectedPlayer.user_id === currentUserId) {
      alert("본인 피드백은 불가능해요!");
      resetNegativeFeedback();
      return;
    }

    if (selectedPlayer.status_code === 2) {
      alert("불참 멤버 피드백은 불가능해요!");
      resetNegativeFeedback();
      return;
    }

    setIsNegativeSaved(true);
    alert("비매너 피드백이 저장되었습니다.");
    setIsNegativeModalOpen(false);
  };

  // 블랙리스트 등록
  const handleRegisterBlacklist = async () => {
    const selectedPlayer = players.find(
      (player) =>
        player.user_team === Number(selectedBlacklistTeam) &&
        player.user_number === Number(selectedBlacklistNumber)
    );

    if (!selectedBlacklistTeam || !selectedBlacklistNumber) {
      alert("블랙리스트로 등록할 유저를 선택해 주세요.");
      return;
    }

    if (selectedPlayer.user_id === currentUserId) {
      alert("본인은 블랙리스트에 추가할 수 없어요!");
      return;
    }

    try {
      await fetch(`${api}/mypage/blacklist/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blackUserId: selectedPlayer.user_id }),
      });
      alert("블랙리스트에 등록되었습니다.");
      setIsBlacklistModalOpen(false);
      setBlacklistRegistered(true); // 블랙 등록 버튼 비활성화
    } catch (error) {
      console.error("Error registering blacklist:", error);
      alert("블랙리스트 등록 중 오류가 발생했습니다.");
    }
  };

  // 피드백 제출
  const handleSubmitFeedback = async () => {
    if (!isPraiseSaved && !isNegativeSaved) {
      alert("칭찬 또는 비매너 중 하나라도 평가해야 해요!");
      return;
    }

    const positivePlayer = players.find(
      (player) =>
        player.user_team === Number(positiveTeam) &&
        player.user_number === Number(positiveNumber)
    );

    const negativePlayer = players.find(
      (player) =>
        player.user_team === Number(negativeTeam) &&
        player.user_number === Number(negativeNumber)
    );

    try {
      if (isPraiseSaved && positivePlayer) {
        await fetch(`${api}/mypage/feedback/${matchId}/good`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matchId,
            giverId: currentUserId,
            userId: positivePlayer.user_id,
            feedback: positiveFeedback,
          }),
        });
      }

      if (isNegativeSaved && negativePlayer) {
        await fetch(`${api}/mypage/feedback/${matchId}/bad`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matchId,
            giverId: currentUserId,
            userId: negativePlayer.user_id,
            feedback: negativeFeedback,
          }),
        });
      }

      alert("피드백이 성공적으로 제출되었습니다.");
      navigate(`/mypage/feedback/${matchId}/stadium`);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("피드백 제출 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.feedbackSection}>
          {/* 유저 칭찬하기 버튼 */}
          <div className={styles.toggleSection}>
            <button
              onClick={() => setIsPraiseModalOpen(true)}
              className={`${styles.toggleButton} ${
                isPraiseSaved ? styles.praiseActive : ""
              }`}
            >
              유저 칭찬하기
            </button>
          </div>

          {/* 비매너 평가하기 버튼 */}
          <div className={styles.toggleSection}>
            <button
              onClick={() => setIsNegativeModalOpen(true)}
              className={`${styles.toggleButton} ${
                isNegativeSaved ? styles.negativeActive : ""
              }`}
            >
              유저 다독이기
            </button>
          </div>

          {/* 블랙리스트 등록 */}
          <div className={styles.blacklistSection}>
            <button
              onClick={() => setIsBlacklistModalOpen(true)}
              className={styles.toggleButton}
              disabled={blacklistRegistered}
            >
              {blacklistRegistered ? "블랙리스트 등록 완료" : "블랙리스트 등록"}
            </button>
          </div>
        </div>

        {/* 피드백 제출하기 */}
        <div className={styles.submitButtonContainer}>
          <div
            onClick={handleSubmitFeedback}
            className={styles.submitButton}
          >
            피드백 제출하기
          </div>
        </div>
      </div>

      {/* 칭찬하기 모달 */}
      {isPraiseModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p className={styles.modalTitle}>칭찬하고 싶은 유저 피드백을 작성해 주세요</p>
            <div className={styles.selectRow}>
              <label>유저 팀</label>
              <select
                className={styles.select}
                value={positiveTeam}
                onChange={(e) => setPositiveTeam(e.target.value)}
              >
                <option value="">선택 없음</option>
                {teamOptions.map((team, index) => (
                  <option key={index} value={index}>
                    {team}
                  </option>
                ))}
              </select>
              <label>유저 등번호</label>
              <select
                className={styles.select}
                value={positiveNumber} 
                onChange={(e) => setPositiveNumber(e.target.value)}
              >
                <option value="">선택 없음</option>
                {players
                  .filter((player) => player.user_team === Number(positiveTeam))
                  .sort((a, b) => a.user_number - b.user_number) // 등번호 순으로 정렬
                  .map((player) => (
                    <option key={player.user_id} value={player.user_number}>
                      {getDisplayText(player)}
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
                    positiveFeedback.includes(index)
                      ? styles.activeFeedback
                      : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className={styles.buttonBox}>
              <button onClick={handlePraiseSubmit} className={styles.saveButton}>
                저장하기
              </button>
              <button
                onClick={resetPraiseFeedback}
                className={styles.resetButton}
              >
                초기화
              </button>
              <button
                onClick={() => setIsPraiseModalOpen(false)}
                className={styles.closeButton}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 비매너 평가 모달 */}
      {isNegativeModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p className={styles.modalTitle}>비매너 유저 피드백을 작성해 주세요</p>
            <div className={styles.selectRow}>
              <label>유저 팀</label>
              <select
                className={styles.select}
                value={negativeTeam}
                onChange={(e) => setNegativeTeam(e.target.value)}
              >
                <option value="">선택 없음</option>
                {teamOptions.map((team, index) => (
                  <option key={index} value={index}>
                    {team}
                  </option>
                ))}
              </select>
              <label>유저 등번호</label>
              <select
                className={styles.select}
                value={negativeNumber}
                onChange={(e) => setNegativeNumber(e.target.value)}
              >
                <option value="">선택 없음</option>
                {players
                  .filter((player) => player.user_team === Number(negativeTeam))
                  .sort((a, b) => a.user_number - b.user_number) // 등번호 순으로 정렬
                  .map((player) => (
                    <option key={player.user_id} value={player.user_number}>
                      {getDisplayText(player)}
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
                    negativeFeedback.includes(index)
                      ? styles.activeFeedback
                      : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className={styles.buttonBox}>
              <button
                onClick={handleNegativeSubmit}
                className={styles.saveButton}
              >
                저장하기
              </button>
              <button
                onClick={resetNegativeFeedback}
                className={styles.resetButton}
              >
                초기화
              </button>
              <button
                onClick={() => setIsNegativeModalOpen(false)}
                className={styles.closeButton}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 블랙리스트 모달 */}
      {isBlacklistModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <p className={styles.modalTitle}>블랙리스트로 등록할 유저를 선택해 주세요</p>
            <div className={styles.selectRow}>
              <label>유저 팀</label>
              <select
                onChange={(e) => setSelectedBlacklistTeam(e.target.value)}
                className={styles.select}
              >
                <option value="">선택 없음</option>
                {teamOptions.map((team, index) => (
                  <option key={index} value={index}>
                    {team}
                  </option>
                ))}
              </select>
              <label>유저 등번호</label>
              <select
                onChange={(e) => setSelectedBlacklistNumber(e.target.value)}
                className={styles.select}
              >
                <option value="">선택 없음</option>
                {players
                  .filter((player) => player.user_team === Number(selectedBlacklistTeam))
                  .sort((a, b) => a.user_number - b.user_number) // 등번호 순으로 정렬
                  .map((player) => (
                    <option key={player.user_id} value={player.user_number}>
                      {getDisplayText(player)}
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
