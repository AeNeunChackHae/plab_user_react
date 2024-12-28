import React, { useState, useEffect } from "react";
import styles from "./ResultAndVideo.module.css";
import { FaPlay, FaDownload } from "react-icons/fa";

const ResultAndVideo = ({ match_id, showIcons = false }) => {
  const [teams, setTeams] = useState([]); // 팀 데이터를 가져옴
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchMatchResults = async () => {
      try {
        const response = await fetch("http://localhost:8080/match/results", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ match_id }),
        });

        if (!response.ok) {
          throw new Error("매치 데이터를 가져오는 데 실패했습니다.");
        }

        const data = await response.json();
        setTeams(data); // 데이터를 설정
        console.log("Fetched match data:", data);
      } catch (err) {
        console.error("Error fetching match data:", err);
        setError(err.message);
      }
    };

    fetchMatchResults();
  }, [match_id]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!teams || teams.length === 0) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  // 고정된 라운드 배치
  const roundSchedule = [
    { home: "A", away: "B" },
    { home: "A", away: "C" },
    { home: "B", away: "C" },
    { home: "B", away: "A" },
    { home: "C", away: "A" },
    { home: "C", away: "B" },
    { home: "A", away: "B" },
    { home: "A", away: "C" },
    { home: "B", away: "C" },
  ];

  // A, B, C 팀으로 데이터 매칭
  const teamMap = {
    A: teams[0] || { team_name: "A팀", embulum_path: "/path/to/default-emblem.png" },
    B: teams[1] || { team_name: "B팀", embulum_path: "/path/to/default-emblem.png" },
    C: teams[2] || { team_name: "C팀", embulum_path: "/path/to/default-emblem.png" },
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h4 className={styles.title}>일정 및 결과</h4>
      </div>
      <div className={styles.content}>
        {roundSchedule.map((match, index) => (
          <div key={index} className={styles.resultRow}>
            {/* 홈 팀 */}
            <div className={styles.teamInfo}>
              <img
                src={teamMap[match.home].embulum_path}
                alt={`${teamMap[match.home].team_name} emblem`}
                className={styles.teamEmblem}
              />
              <span className={styles.teamText}>{teamMap[match.home].team_name}</span>
            </div>
            {/* 라운드 시간 (고정 텍스트 추가 가능) */}
            <div className={styles.scoreBlock}>
              <span className={styles.score}>{`0 : 0`}</span>
            </div>
            {/* 원정 팀 */}
            <div className={styles.teamInfo}>
              <span className={styles.teamText}>{teamMap[match.away].team_name}</span>
              <img
                src={teamMap[match.away].embulum_path}
                alt={`${teamMap[match.away].team_name} emblem`}
                className={styles.teamEmblem}
              />
            </div>
            {showIcons && (
              <div className={styles.iconBlock}>
                <FaPlay className={styles.icon} onClick={openModal} />
                <FaDownload className={styles.icon} onClick={openModal} />
              </div>
            )}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <span>매치평가 알림</span>
              <button
                className={styles.modalCloseButton}
                onClick={closeModal}
              >
                X
              </button>
            </div>
            <p>영상을 시청 및 다운로드 하시려면 상호평가를 완료해야 합니다.</p>
            <div className={styles.modalButtons}>
              <button className={styles.evaluateButton}>평가하러 가기</button>
              <button className={styles.backButton} onClick={closeModal}>
                돌아가기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResultAndVideo;
