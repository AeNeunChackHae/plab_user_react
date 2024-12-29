import React, { useState, useEffect, useRef } from "react";
import FacilitiesContent from "../reservations/facilitiescontent/FacilitiesContent";
import StadiumList from "../reservations/stadiumlist/StadiumList";
import StadiumRules from "../reservations/stadiumrules/StadimRules";
import MatchSchedule from "../matchschedule/MatchSchedule";
import ReviewContent from "../reviewcontent/ReviewContent";
import styles from "./StadiumDetails.module.css";
import MapTab from "../reservations/maptab/MapTab";
import StadiumTerms from "../reservations/stadiuterms/StadiumTerms";

const StadiumDetails = ({ stadiumId }) => {
  const [stadiumInfo, setStadiumInfo] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null); // 지도 컴포넌트를 참조하기 위한 ref
  const [selectedTab, setSelectedTab] = useState("facilities"); // 초기 탭 설정
  const [selectedDate, setSelectedDate] = useState("");

  const handleShowMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" }); // 지도 뷰로 스크롤 이동
    }
  }; 
  const handleDateChange = (date) => {
    setSelectedDate(date); // 선택된 날짜 업데이트
  };

  useEffect(() => {
    const fetchStadiumDetails = async () => {
      try {
        const response = await fetch("http://localhost:8080/stadium/details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stadium_id: stadiumId }),
        });

        if (!response.ok) {
          throw new Error("경기장 데이터를 가져오는 데 실패했습니다.");
        }

        const data = await response.json();

        // 데이터 확인
        // console.log("Fetched data:", data);

        setStadiumInfo(data);
      } catch (err) {
        console.error("Error fetching stadium details:", err);
        setError(err.message);
      }
    };

    fetchStadiumDetails();
  }, [stadiumId]);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!stadiumInfo) {
    return <div className={styles.loading}>로딩 중...</div>;
  }
  // console.log('스타디움에서 받는 값들',stadiumInfo)

  return (
    <div className={styles.stadiumDetails}>
      {/* 상단 경기장 정보 */}
      <div className={styles.stadiumInfo}>
        <p className={styles.stadiumInfo__area}>
          {stadiumInfo.main_region_name} / {stadiumInfo.sub_region_name}
        </p>
        <p className={styles.stadiumInfo__name}>{stadiumInfo.stadium_name}</p>
        <div className={styles.stadiumInfo__addressWrapper}>
          <span className={styles.stadiumInfo__address}>
            {stadiumInfo.full_address}
          </span>
          <span
            className={styles.stadiumInfo__addressCopy}
            onClick={() =>
              navigator.clipboard.writeText(stadiumInfo.full_address)
            }
          >
            주소 복사
          </span>
          <span
            className={styles.stadiumInfo__addressMap}
            onClick={handleShowMap}
          >
            지도 보기
          </span>
        </div>
      </div>

      {/* 공지사항 */}
      <div className={styles.stadiumInfo__noticeWrapper}>
        <div className={styles.stadiumInfo__notice}>
          <b>공지</b>
          <pre className={styles.noticeContent}>{stadiumInfo.notice}</pre>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className={styles.tabNavigation}>
        <div className={styles.navigationWrapper}>
          <div
            className={`${styles.navigationItem} ${
              selectedTab === "facilities" ? styles.selected : ""
            }`}
            onClick={() => setSelectedTab("facilities")}
          >
            시설 및 예약
          </div>
          <div
            className={`${styles.navigationItem} ${
              selectedTab === "social" ? styles.selected : ""
            }`}
            onClick={() => setSelectedTab("social")}
          >
            소셜 매치
          </div>
          <div
            className={`${styles.navigationItem} ${
              selectedTab === "review" ? styles.selected : ""
            }`}
            onClick={() => setSelectedTab("review")}
          >
            구장 리뷰
          </div>
        </div>
      </div>

      {/* 탭 내용 */}
      <div className={styles.tabContent}>
        {selectedTab === "facilities" && (
          <>
            <div>
              <FacilitiesContent  onDateChange={handleDateChange}/>
              <StadiumList stadiumId={stadiumId} selectedDate={selectedDate}/>
            </div>
            <div className={styles.componentWrapper}>
              <StadiumRules stadiumId={stadiumId} />
            </div>
            <div ref={mapRef} className={styles.componentWrapper}>
              <MapTab fullAddress={stadiumInfo.full_address} />
            </div>
            <div className={styles.componentWrapper}>
              <StadiumTerms stadiumId={stadiumId} />
            </div>
          </>
        )}
        {selectedTab === "social" && (
          <div>
            <FacilitiesContent onDateChange={handleDateChange} />
            <MatchSchedule stadiumId={stadiumId} selectedDate={selectedDate} />
          </div>
        )}
        {selectedTab === "review" && (
          <div>
            <ReviewContent stadiumId={stadiumId}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default StadiumDetails;
