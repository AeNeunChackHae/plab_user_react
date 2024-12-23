import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import styles from './MatchDetails.module.css';
import LocationProvider from '../../location/LocationProvider'; // LocationProvider 사용
import KakaoMap from '../../kakaomap/KakaoMap';

const MatchDetails = ({ match_start_time, stadium_name, full_address }) => {
  const stickyRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showMap, setShowMap] = useState(false); // 지도 표시 여부
  const [status, setStatus] = useState(""); // 매치 상태
  const [currentTime, setCurrentTime] = useState(new Date()); // 현재 시간

  const matchDate = useMemo(() => new Date(match_start_time), [match_start_time]);

  const calculateStatus = useCallback(() => {
    const now = currentTime;
    const diffInMilliseconds = matchDate - now;
    const diffDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

    if (matchDate < now) {
      return "past";
    } else if (diffDays > 10) {
      return "earlyBird";
    } else if (diffDays >= 0 && diffMinutes > 10) {
      return "regular";
    } else {
      return "closed";
    }
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

    // 1분마다 현재 시간 갱신
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 1분 = 60,000ms

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [calculateStatus]);

  const handleToggleMap = () => {
    setShowMap((prev) => !prev); // 지도 보이기/숨기기 토글
  };


  return (
    <div
      ref={stickyRef}
      className={`${styles.matchDetails} ${isSticky ? styles.sticky : ""}`}
    >
      {/* 경기 시간 */}
      <div className={styles.matchTime}>{new Date(match_start_time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</div>

      {/* 경기장 정보 */}
      <div className={styles.matchPlace}>
        <h1 className={styles.title}>
          <a href="/stadium/247/info/">{stadium_name}</a>
        </h1>
        <div className={styles.wtgTool}>
          <span className={styles.address}>{full_address}</span>
          <span
            className={styles.copy}
            onClick={() =>
              navigator.clipboard.writeText(full_address)
            }
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

      {/* 지도 표시 */}
      {showMap && (
        <LocationProvider full_address={full_address}>
          {(location) => (
            <div className={styles.mapContainer}>
              <KakaoMap latitude={location.latitude} longitude={location.longitude} />
            </div>
          )}
        </LocationProvider>
      )}

      {/* 매치 상태에 따른 요금 UI */}
      <div className={styles.matchFee}>
        {status === "earlyBird" && (
          <div className={styles.statusBlock}>
            <div className={styles.contentBlock}>
              <span className={`${styles.money} ${styles.strikeThrough}`}>
                10,000원
              </span>
              <span className={styles.money}>5,000원</span>
              <div className={styles.discountText}>
                지금 신청하면 50% 할인!
              </div>
            </div>
            <button className={styles.applyButton}>신청하기</button>
          </div>
        )}

        {status === "regular" && (
          <div className={styles.statusBlock}>
            <div className={styles.contentBlock}>
              <span className={styles.money}>10,000원</span>
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
              <span className={styles.money}>10,000원</span>
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
              <span className={styles.money}>10,000원</span>
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

