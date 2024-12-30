import React, { useState } from "react";
import "./RecentReview.css";

const RecentReview = ({ recentGames }) => {
  const [showInputModal, setShowInputModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [selectedGameIndex, setSelectedGameIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const [records, setRecords] = useState({});
  const [visibleGames, setVisibleGames] = useState(5); // 표시할 게임 개수

  // 활동량 입력 모달 토글
  const openInputModal = (index) => {
    setSelectedGameIndex(index);
    setShowInputModal(true);
  };

  const closeInputModal = () => {
    setShowInputModal(false);
    setFormData({});
  };

  // 기록 확인 모달 토글
  const openResultModal = (index) => {
    setSelectedGameIndex(index);
    setShowResultModal(true);
  };

  const closeResultModal = () => setShowResultModal(false);

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 데이터 저장 핸들러
  const handleSave = () => {
    setRecords({
      ...records,
      [selectedGameIndex]: formData,
    });
    setShowInputModal(false);
    setFormData({});
  };

  // 더보기 버튼 핸들러
  const handleShowMore = () => {
    setVisibleGames((prev) => prev + 5);
  };

  // 접기 버튼 핸들러
  const handleShowLess = () => {
    setVisibleGames(5);
  };

  return (
    <div className="recent-review">
      <h3>📍 최근 소셜 매치 리뷰</h3>
      {recentGames.slice(0, visibleGames).map((game, index) => (
        <div key={index} className="review-item">
          <p className="review-item-game">
            {game.date} | {game.location}
          </p>
          <div className="buttons">
            <button onClick={() => openInputModal(index)}>활동량 기입</button>
            <button onClick={() => openResultModal(index)}>기록 확인</button>
          </div>
        </div>
      ))}

      {/* 더보기/접기 버튼 */}
      {recentGames.length > visibleGames ? (
        <button className="toggle-button" onClick={handleShowMore}>
          ∨
        </button>
      ) : (
        visibleGames > 5 && (
          <button className="toggle-button" onClick={handleShowLess}>
            ∧
          </button>
        )
      )}

      {/* 활동량 입력 모달 */}
      {showInputModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>활동량 기입</h3>
            <label>
              운동시간{" "}
              <input
                name="exerciseTime"
                type="text"
                placeholder="예: 1시간 30분"
                onChange={handleChange}
              />
            </label>
            <label>
              이동한거리 (km){" "}
              <input name="distance" type="number" onChange={handleChange} />
            </label>
            <label>
              총소모칼로리 (kcal){" "}
              <input name="calories" type="number" onChange={handleChange} />
            </label>
            <label>
              평균심박수 (bpm){" "}
              <input name="heartRate" type="number" onChange={handleChange} />
            </label>
            <div className="modal-buttons">
              <button onClick={handleSave}>저장</button>
              <button onClick={closeInputModal}>닫기</button>
            </div>
          </div>
        </div>
      )}

      {/* 기록 확인 모달 */}
      {showResultModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>기록 확인</h3>
            {records[selectedGameIndex] ? (
              <ul>
                <li>운동일시: {records[selectedGameIndex].exerciseDate}</li>
                <li>운동시간: {records[selectedGameIndex].exerciseTime}</li>
                <li>이동한 거리: {records[selectedGameIndex].distance} km</li>
                <li>
                  총 소모 칼로리: {records[selectedGameIndex].calories} kcal
                </li>
                <li>평균 심박수: {records[selectedGameIndex].heartRate} bpm</li>
              </ul>
            ) : (
              <p>기록이 없습니다.</p>
            )}
            <button onClick={closeResultModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentReview;
