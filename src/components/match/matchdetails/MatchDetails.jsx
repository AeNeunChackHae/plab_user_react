import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import styles from "./MatchDetails.module.css";
import LocationProvider from "../../location/LocationProvider"; 
import KakaoMap from "../../kakaomap/KakaoMap";
import { Link } from "react-router-dom";

const MatchDetails = ({ match_id }) => {
  const stickyRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [status, setStatus] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [matchDetails, setMatchDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchMatchDetails = useCallback(async () => {
    try {
      // console.log("Fetching match details for match_id:", match_id); // 디버깅용 로그
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
      // console.log("API 응답 데이터:", data); // 확인용 로그
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

  useEffect(() => {
    if (matchDetails) {
      // console.log("현재 매치 세부 정보 상태:", matchDetails); // 디버깅용 콘솔
    }
  }, [matchDetails]);

  const calculateStatus = useCallback(() => {
    if (!matchDate) return "";
    const now = currentTime;
    const diffInMilliseconds = matchDate - now;
    const diffDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

    const statusResult = matchDate < now
      ? "past"
      : diffDays > 10
      ? "earlyBird"
      : diffDays >= 0 && diffMinutes > 10
      ? "regular"
      : "closed";

    // console.log("계산된 상태:", statusResult); // 디버깅용 콘솔
    return statusResult;
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
    console.log("지도 보기 상태:", !showMap); // 디버깅용 콘솔
  };

  const pricing = useMemo(() => {
    if (!matchDetails) return {};
    const matchType = matchDetails.match_type;
    // console.log("현재 매치 타입:", matchType); // 디버깅용 콘솔
    if (matchType === 0) { // 소셜 매치
      return {
        regularPrice: 10000,
        discountPrice: 5000,
        discountText: "지금 신청하면 50% 할인!",
      };
    } else if (matchType === 1) { // 팀 매치
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
  // console.log("렌더링에 사용될 데이터:", { match_start_time, stadium_name, full_address, stadium_id }); // 디버깅용 콘솔

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
            // console.log("LocationProvider에서 받은 위치 데이터:", location); // 디버깅용 콘솔
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
            <button className={styles.applyButton}>신청하기</button>
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
            <button className={styles.applyButton}>신청하기</button>
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
