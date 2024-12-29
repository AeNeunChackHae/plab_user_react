import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import styles from "./MatchDetails.module.css";
import LocationProvider from "../../location/LocationProvider";
import KakaoMap from "../../kakaomap/KakaoMap";
import { Link, useNavigate } from "react-router-dom";

const MatchDetails = ({ match_id }) => {
  const stickyRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [status, setStatus] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [matchDetails, setMatchDetails] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // useNavigate 훅 추가

  const fetchMatchDetails = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/match/details", {
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
      setMatchDetails(data);
    } catch (err) {
      console.error("매치 세부 정보 로드 오류:", err);
      setError("매치 데이터를 가져오는 데 실패했습니다.");
    }
  }, [match_id]);

  useEffect(() => {
    if (match_id) {
      fetchMatchDetails();
    }
  }, [fetchMatchDetails, match_id]);

  const matchDate = useMemo(
    () => (matchDetails ? new Date(matchDetails.match_start_time) : null),
    [matchDetails]
  );

  const calculateStatus = useCallback(() => {
    if (!matchDate) return "";
    const now = currentTime;
    const diffInMilliseconds = matchDate - now;
    const diffDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

    return matchDate < now
      ? "past"
      : diffDays > 10
      ? "earlyBird"
      : diffDays >= 0 && diffMinutes > 10
      ? "regular"
      : "closed";
  }, [matchDate, currentTime]);

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };

    setStatus(calculateStatus());
    window.addEventListener("scroll", handleScroll);

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [calculateStatus]);

  const handleToggleMap = () => {
    setShowMap((prev) => !prev);
  };

  const handleApplyClick = () => {
    const userId = localStorage.getItem("id"); // 로컬스토리지에서 유저 ID 가져오기
    if (!userId) {
      console.error("User ID가 로컬스토리지에 없습니다.");
      return;
    }
    if (status === "earlyBird" || status === "regular") {
      navigate(`/order/${userId}`, { state: { from: `/match/${match_id}`}}); // 신청하기 클릭 시 유저 ID를 경로로 추가
    }
  };

  const pricing = useMemo(() => {
    if (!matchDetails) return {};
    const matchType = matchDetails.match_type;
    if (matchType === 0) {
      return {
        regularPrice: 10000,
        discountPrice: 5000,
        discountText: "지금 신청하면 50% 할인!",
      };
    } else if (matchType === 1) {
      return {
        regularPrice: 80000,
        discountPrice: 64000,
        discountText: "지금 신청하면 20% 할인!",
      };
    }
    return {
      regularPrice: 0,
      discountPrice: 0,
      discountText: "",
    };
  }, [matchDetails]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!matchDetails) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  const { match_start_time, stadium_name, full_address, stadium_id } = matchDetails;

  return (
    <div ref={stickyRef} className={`${styles.matchDetails} ${isSticky ? styles.sticky : ""}`}>
      <div className={styles.matchTime}>
        {new Date(match_start_time).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}
      </div>
      <div className={styles.matchPlace}>
        <h1 className={styles.title}>
          <Link to={`/stadium/${stadium_id}/info/`}>{stadium_name}</Link>
        </h1>
        <div className={styles.wtgTool}>
          <span className={styles.address}>{full_address}</span>
          <span
            className={styles.copy}
            onClick={() => navigator.clipboard.writeText(full_address)}
          >
            주소 복사
          </span>
          <span
            id="toggleMap"
            onClick={handleToggleMap}
            className={styles.map}
          >
            {showMap ? "지도 닫기" : "지도 보기"}
          </span>
        </div>
      </div>
      {showMap && (
        <LocationProvider full_address={full_address}>
          {(location) => {
            return location ? (
              <KakaoMap latitude={location.latitude} longitude={location.longitude} />
            ) : null;
          }}
        </LocationProvider>
      )}
      <div className={styles.matchFee}>
        {status === "earlyBird" && (
          <div className={styles.statusBlock}>
            <div className={styles.contentBlock}>
              <span className={`${styles.money} ${styles.strikeThrough}`}>
                {pricing.regularPrice.toLocaleString()}원
              </span>
              <span className={styles.money}>
                {pricing.discountPrice.toLocaleString()}원
              </span>
              <div className={styles.discountText}>{pricing.discountText}</div>
            </div>
            <button className={styles.applyButton} onClick={handleApplyClick}>
              신청하기
            </button>
          </div>
        )}
        {status === "regular" && (
          <div className={styles.statusBlock}>
            <div className={styles.contentBlock}>
              <span className={styles.money}>
                {pricing.regularPrice.toLocaleString()}원
              </span>
              <span> / 2시간</span>
              <div className={styles.matchend}>
                매치 시작 10분 전까지 신청 가능
              </div>
            </div>
            <button className={styles.applyButton} onClick={handleApplyClick}>
              신청하기
            </button>
          </div>
        )}
        {status === "closed" && (
          <div className={styles.statusBlock}>
            <div className={styles.contentBlock}>
              <span className={styles.money}>
                {pricing.regularPrice.toLocaleString()}원
              </span>
              <span> / 2시간</span>
              <div className={styles.matchClosed}>신청이 마감되었습니다</div>
            </div>
            <button className={styles.disabledButton} disabled>
              마감되었습니다
            </button>
          </div>
        )}
        {status === "past" && (
          <div className={styles.statusBlock}>
            <div className={styles.contentBlock}>
              <span className={styles.money}>
                {pricing.regularPrice.toLocaleString()}원
              </span>
              <span> / 2시간</span>
              <div className={styles.matchEnded}>종료된 매치입니다</div>
            </div>
            <button className={styles.disabledButton} disabled>
              종료된 매치
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchDetails;
