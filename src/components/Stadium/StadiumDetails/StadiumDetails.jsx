// 더미 공지 내용 (추후 DB에서 가져올 값으로 교체) 아래 주석 참고
// const [noticeContent, setNoticeContent] = useState('');

// useEffect(() => {
//   // 예시 API 호출로 데이터 가져오기
//   fetch('/api/notice')
//     .then((res) => res.json())
//     .then((data) => setNoticeContent(data.notice));
// }, []);

// <pre className={styles.noticeContent}>{noticeContent}</pre>;


import React, { useState, useRef } from "react";
import FacilitiesContent from "../Reservations/FacilitiesContent/FacilitiesContent";
import StadiumList from "../Reservations/StadiumList/StadiumList";
import StadiumRules from "../Reservations/StadiumRules/StadimRules";
import MatchSchedule from "../MatchSchedule/MatchSchedule";
import ReviewContent from "../ReviewContent/ReviewContent";
import styles from "./StadiumDetails.module.css";
import MapTab from "../Reservations/MapTab/MapTab";
import StadiumTerms from "../Reservations/StadiumTerms/StadiumTerms";
import TeamList from "../TeamContent/TeamList";

// DB에서 가져오는 데이터를 가정한 더미 데이터
const DUMMY_STADIUM_INFO = {
  area: "서울 / 영등포구",
  name: "서울 영등포 EA SPORTS FC(더에프필드)",
  address: "서울특별시 영등포구 선유로 138",
};

const DUMMY_NOTICE = ` 
1. 스킬 피치 - 야외에 있는 20m x 8m 레슨 전용 구장

2. 풋볼랩 - 실내에 있는 16m x 16m 구장
  - 8m x 8m 실내 공 훈련 가능
  - 8m x 8m 실내 공간은 GYM 세션 진행 (운동 기구 구비)
`;

const StadiumDetails = () => {
  const mapRef = useRef(null); // 지도 컴포넌트를 참조하기 위한 ref

  const handleShowMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" }); // 지도 뷰로 스크롤 이동
    }
  };

  const [selectedTab, setSelectedTab] = useState("facilities"); // 초기 탭 설정

  return (
    <div className={styles.stadiumDetails}>
      {/* 상단 경기장 정보 */}
      <div className={styles.stadiumInfo}>
        <p className={styles.stadiumInfo__area}>{DUMMY_STADIUM_INFO.area}</p>
        <p className={styles.stadiumInfo__name}>{DUMMY_STADIUM_INFO.name}</p>
        <div className={styles.stadiumInfo__addressWrapper}>
          <span className={styles.stadiumInfo__address}>
            {DUMMY_STADIUM_INFO.address}
          </span>
          <span
            className={styles.stadiumInfo__addressCopy}
            onClick={() =>
              navigator.clipboard.writeText(DUMMY_STADIUM_INFO.address)
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
          <pre className={styles.noticeContent}>{DUMMY_NOTICE}</pre>
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
              selectedTab === "team" ? styles.selected : ""
            }`}
            onClick={() => setSelectedTab("team")}
          >
            팀
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
            <div >
              <FacilitiesContent />
              <StadiumList />
            </div>
            <div className={styles.componentWrapper}>
              <StadiumRules />
            </div>
            <div ref={mapRef} className={styles.componentWrapper}>
              <MapTab />
            </div>
            <div className={styles.componentWrapper}>
              <StadiumTerms/>
            </div>
          </>
        )}
        {selectedTab === "social" && (
          <div >
            <FacilitiesContent />
            <MatchSchedule />
          </div>
        )}
        {selectedTab === "team" && (
          <div >
            <TeamList/>
          </div>
        )}
        {selectedTab === "review" && (
          <div >
            <ReviewContent />
          </div>
        )}
      </div>
    </div>
  );
};

export default StadiumDetails;


// // DB에서 가져오는 데이터를 가정한 더미 데이터
// // src/components/StadiumDetails.jsx
// import DUMMY_STADIUM_INFO from "../../dummyData/StadiumDummyData";
// import React, { useState, useEffect, useRef } from "react";
// import FacilitiesContent from "../Reservations/FacilitiesContent/FacilitiesContent";
// import StadiumList from "../Reservations/StadiumList/StadiumList";
// import StadiumRules from "../Reservations/StadiumRules/StadimRules";
// import MatchSchedule from "../MatchSchedule/MatchSchedule";
// import ReviewContent from "../ReviewContent/ReviewContent";
// import styles from "./StadiumDetails.module.css";
// import KakaoMap from "../../KakaoMap/KakaoMap";
// import StadiumTerms from "../Reservations/StadiumTerms/StadiumTerms";
// import TeamList from "../TeamContent/TeamList";

// const StadiumDetails = () => {
//   const mapRef = useRef(null);
//   const [selectedTab, setSelectedTab] = useState("facilities");
//   const [coordinates, setCoordinates] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const currentStadium = DUMMY_STADIUM_INFO[0];

//   useEffect(() => {
//     const fetchCoordinates = async () => {
//       if (window.kakao && window.kakao.maps) {
//         window.kakao.maps.load(() => {
//           const geocoder = new window.kakao.maps.services.Geocoder();
//           geocoder.addressSearch(currentStadium.full_address, (results, status) => {
//             if (status === window.kakao.maps.services.Status.OK) {
//               const { y: latitude, x: longitude } = results[0];
//               setCoordinates({ latitude, longitude });
//               setLoading(false);
//             } else {
//               console.error("주소 검색 실패:", currentStadium.full_address);
//               setLoading(false);
//             }
//           });
//         });
//       }
//     };

//     fetchCoordinates();
//   }, [currentStadium.full_address]);

//   const handleShowMap = () => {
//     if (mapRef.current) {
//       mapRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <div className={styles.stadiumDetails}>
//       <div className={styles.stadiumInfo}>
//         <p className={styles.stadiumInfo__area}>{currentStadium.area}</p>
//         <p className={styles.stadiumInfo__name}>{currentStadium.name}</p>
//         <div className={styles.stadiumInfo__addressWrapper}>
//           <span className={styles.stadiumInfo__address}>
//             {currentStadium.full_address}
//           </span>
//           <span
//             className={styles.stadiumInfo__addressCopy}
//             onClick={() =>
//               navigator.clipboard.writeText(currentStadium.full_address)
//             }
//           >
//             주소 복사
//           </span>
//           <span
//             className={styles.stadiumInfo__addressMap}
//             onClick={handleShowMap}
//           >
//             지도 보기
//           </span>
//         </div>
//       </div>

//       <div className={styles.tabNavigation}>
//         <div className={styles.navigationWrapper}>
//           <div
//             className={`${styles.navigationItem} ${
//               selectedTab === "facilities" ? styles.selected : ""
//             }`}
//             onClick={() => setSelectedTab("facilities")}
//           >
//             시설 및 예약
//           </div>
//           <div
//             className={`${styles.navigationItem} ${
//               selectedTab === "social" ? styles.selected : ""
//             }`}
//             onClick={() => setSelectedTab("social")}
//           >
//             소셜 매치
//           </div>
//           <div
//             className={`${styles.navigationItem} ${
//               selectedTab === "team" ? styles.selected : ""
//             }`}
//             onClick={() => setSelectedTab("team")}
//           >
//             팀
//           </div>
//           <div
//             className={`${styles.navigationItem} ${
//               selectedTab === "review" ? styles.selected : ""
//             }`}
//             onClick={() => setSelectedTab("review")}
//           >
//             구장 리뷰
//           </div>
//         </div>
//       </div>

//       <div className={styles.tabContent}>
//         {selectedTab === "facilities" && (
//           <>
//             <div>
//               <FacilitiesContent />
//               <StadiumList />
//             </div>
//             <div className={styles.componentWrapper}>
//               <StadiumRules />
//             </div>
//             <div ref={mapRef} className={styles.componentWrapper}>
//               {loading ? (
//                 <p>지도를 로드 중입니다...</p>
//               ) : coordinates ? (
//                 <KakaoMap
//                   latitude={coordinates.latitude}
//                   longitude={coordinates.longitude}
//                 />
//               ) : (
//                 <p>지도를 불러오는 데 실패했습니다.</p>
//               )}
//             </div>
//             <div className={styles.componentWrapper}>
//               <StadiumTerms />
//             </div>
//           </>
//         )}
//         {selectedTab === "social" && (
//           <div>
//             <FacilitiesContent />
//             <MatchSchedule />
//           </div>
//         )}
//         {selectedTab === "team" && (
//           <div>
//             <TeamList />
//           </div>
//         )}
//         {selectedTab === "review" && (
//           <div>
//             <ReviewContent />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StadiumDetails;
