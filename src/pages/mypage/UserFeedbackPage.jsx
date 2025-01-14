import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import UserFeedbackForm from "../../components/mypage/feedback/UserFeedbackForm.jsx";
import TeamDisplay from "../../components/mypage/feedback/TeamDisplay.jsx";
import styles from "./UserFeedbackPage.module.css";
import { config } from '../../config';

const FeedbackPage = () => {
  const api = config.aws.ec2_host_user
  const { matchId } = useParams();
  const currentUserId = Number(localStorage.getItem("id"));
  const [players, setPlayers] = useState([]);
  const [blacklist, setBlacklist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlayers = useCallback(async () => {
    try {
      const response = await fetch(
        `${api}/mypage/feedback/${matchId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch players.");
        return;
      }

      const data = await response.json();
      setPlayers(data.data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  }, [matchId, api]);

  const fetchBlacklist = useCallback(async () => {
    try {
      const response = await fetch(
        `${api}/mypage/feedback/${matchId}/checkblack`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch blacklist:", await response.json());
        return;
      }

      const data = await response.json();
      setBlacklist(data.data.map((entry) => entry.black_user_id));
    } catch (error) {
      console.error("Error fetching blacklist:", error);
    }
  }, [matchId, api]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchPlayers(), fetchBlacklist()])
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [fetchPlayers, fetchBlacklist]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>소셜매치 유저 피드백</h1>
      <p className={styles.subTitle}>구성원 및 정보</p>
      <div className={styles.teamDisplayWrapper}>
        <TeamDisplay
          players={players}
          blacklist={blacklist}
          matchId={matchId}
          currentUserId={currentUserId}
        />
      </div>

      <div className={styles.feedbackInstruction}>
        <h2>피드백 안내</h2>
        <p>경기 진행을 위한 피드백을 작성해 주세요! <br /> 한 번 제출한 피드백은 수정이 불가합니다. 신중히 작성해 주세요.</p>
        <div className={styles.listContainer}>
          <ul>
            <li>칭찬 또는 비매너 피드백 중 최소 하나는 작성해야 합니다.</li>
            <li>각 피드백은 한 명의 선수에게만 작성 가능합니다.</li>
            <li>블랙리스트 등록은 매치당 최대 한 명만 가능합니다.</li>
            <li>등록된 블랙리스트는 마이페이지에서 확인할 수 있습니다.</li>
          </ul>
        </div>
      </div>

      <div className={styles.feedbackFormWrapper}>
        <UserFeedbackForm
          players={players}
          blacklist={blacklist}
          matchId={matchId}
          currentUserId={currentUserId}
        />
      </div>
    </div>
  );
};

export default FeedbackPage;
