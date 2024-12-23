import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import styles from './MatchDetails.module.css';
import LocationProvider from '../../location/LocationProvider'; // LocationProvider 사용
import KakaoMap from '../../kakaomap/KakaoMap';


const MatchDetails = ({ matchStartTime, stadiumName, fullAddress, matchType }) => {
  const stickyRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [status, setStatus] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

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

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [calculateStatus]);

  const handleToggleMap = () => setShowMap((prev) => !prev);

  const pricing = useMemo(() => {
    if (matchType === 0) { // 소셜 매치
      return {
        regularPrice: 10000,
        discountPrice: 5000,
        discountText: '지금 신청하면 50% 할인!'
      };
    } else if (matchType === 1) { // 팀 매치
      return {
        regularPrice: 80000,
        discountPrice: 64000,
        discountText: '지금 신청하면 20% 할인!'
      };
    }
    return {
      regularPrice: 0,
      discountPrice: 0,
      discountText: ''
    };
  }, [matchType]);

  return (
    <div ref={stickyRef} className={`${styles.matchDetails} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles.matchTime}>
        {new Date(matchStartTime).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
      </div>
      <div className={styles.matchPlace}>
        <h1 className={styles.title}><a href="/stadium/247/info/">{stadiumName}</a></h1>
        <div className={styles.wtgTool}>
          <span className={styles.address}>{fullAddress}</span>
          <span className={styles.copy} onClick={() => navigator.clipboard.writeText(fullAddress)}>주소 복사</span>
          <span id="toggleMap" onClick={handleToggleMap} className={styles.map}>{showMap ? "지도 닫기" : "지도 보기"}</span>
        </div>
      </div>
      {showMap && <LocationProvider fullAddress={fullAddress}>
        {(location) => <KakaoMap latitude={location.latitude} longitude={location.longitude} />}
      </LocationProvider>}

      <div className={styles.matchFee}>
        {status === 'earlyBird' && (
          <div className={styles.statusBlock}>
            <div className={styles.contentBlock}>
              <span className={`${styles.money} ${styles.strikeThrough}`}>{pricing.regularPrice.toLocaleString()}원</span>
              <span className={styles.money}>{pricing.discountPrice.toLocaleString()}원</span>
              <div className={styles.discountText}>{pricing.discountText}</div>
            </div>
            <button className={styles.applyButton}>신청하기</button>
          </div>
        )}
        {status === 'regular' && (
          <div className={styles.statusBlock}>
            <div className={styles.contentBlock}>
              <span className={styles.money}>{pricing.regularPrice.toLocaleString()}원</span>
              <span> / 2시간</span>
              <div className={styles.matchend}>매치 시작 10분 전까지 신청 가능</div>
            </div>
            <button className={styles.applyButton}>신청하기</button>
          </div>
        )}
        {status === 'closed' && (
          <div className={styles.statusBlock}>
            <div className={styles.contentBlock}>
              <span className={styles.money}>{pricing.regularPrice.toLocaleString()}원</span>
              <span> / 2시간</span>
              <div className={styles.matchClosed}>신청이 마감되었습니다</div>
            </div>
            <button className={styles.disabledButton} disabled>마감되었습니다</button>
          </div>
        )}
        {status === 'past' && (
          <div className={styles.statusBlock}>
            <div className={styles.contentBlock}>
              <span className={styles.money}>{pricing.regularPrice.toLocaleString()}원</span>
              <span> / 2시간</span>
              <div className={styles.matchEnded}>종료된 매치입니다</div>
            </div>
            <button className={styles.disabledButton} disabled>종료된 매치</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchDetails;
