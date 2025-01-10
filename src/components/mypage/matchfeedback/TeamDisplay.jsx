import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./TeamDisplay.module.css";

const TeamDisplay = () => {
  const { matchId } = useParams();
  const [players, setPlayers] = useState([]);
  const [blacklist, setBlacklist] = useState([]);
  const currentUserId = Number(localStorage.getItem("id"));
  const teamImages = {
    red: "/images/redVest.png",
    yellow: "/images/yellowVest.png",
    blue: "/images/blueVest.png",
  };

  const fetchPlayers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/mypage/feedback/${matchId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setPlayers(data.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const fetchBlacklist = async () => {
    try {
      const response = await fetch(`http://localhost:8080/mypage/feedback/${matchId}/checkblack`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch blacklist:", await response.json());
        return;
      }

      const data = await response.json();
      setBlacklist(data.data.map((entry) => entry.black_user_id));
    } catch (error) {
      console.error("Error fetching blacklist:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
    fetchBlacklist();
  }, [matchId]);

  return (
    <div className={styles.container}>
      {Object.entries(teamImages).map(([teamName, teamImage], teamIndex) => (
        <div key={teamIndex} className={styles.teamColumn}>
          <div className={styles.teamHeader}>
            <img src={teamImage} alt={`${teamName} 이미지`} className={styles.teamImage} />
          </div>
          {players
            .filter((player) => player.user_team === teamIndex)
            .map((player) => {
              const displayText =
                blacklist.includes(player.user_id)
                  ? "블랙"
                  : player.status_code === 2
                  ? "불참"
                  : player.user_id === currentUserId
                  ? "나"
                  : player.user_number + 1;

              const playerClass =
                displayText === "블랙"
                  ? styles.blacklistUser
                  : displayText === "불참"
                  ? styles.absentUser
                  : displayText === "나"
                  ? styles.currentUser
                  : "";

              return (
                <div
                  key={player.user_id}
                  className={`${styles.playerButton} ${playerClass}`}
                >
                  {displayText}
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default TeamDisplay;
