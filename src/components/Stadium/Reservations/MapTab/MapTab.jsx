// // MapTab.jsx
// import React from "react";
// import KakaoMap from "../../../KakaoMap/KakaoMap";
// import styles from "./MapTap.module.css";

// // 더미 데이터
// const LOCATION_DATA = {
//   latitude: 37.5252,
//   longitude: 126.8964,
//   address: "서울특별시 영등포구 선유로 138"
// };

// const MapTab = () => {
//   return (
//     <div id="tab-map" className={styles.stadiumLocationContainer}>
//       <div className={styles.stadiumSectionHeader}>
//         <div className={styles.stadiumSectionTitle}>
//           <h3>위치</h3>
//         </div>
//       </div>
//       <div className={styles.stadiumLocationMap}>
//         {/* KakaoMap 컴포넌트 */}
//         <KakaoMap latitude={LOCATION_DATA.latitude} longitude={LOCATION_DATA.longitude} />
//       </div>
//       <div className={styles.stadiumLocationAddress}>
//         <p>
//           {LOCATION_DATA.address}
//           <span
//             className={styles.stadiumLocationAddressCopy}
//             onClick={() => navigator.clipboard.writeText(LOCATION_DATA.address)}
//           >
//             주소 복사
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default MapTab;


// src/components/MapTab/MapTab.jsx
import React from "react";
import KakaoMap from "../../../KakaoMap/KakaoMap";
import LocationProvider from "../../../Location/LocationProvider";
import styles from "./MapTab.module.css";
import DUMMY_STADIUM_INFO from "../../../dummyData/StadiumDummyData"; // 더미 데이터 가져오기

const MapTab = () => {
  const stadium = DUMMY_STADIUM_INFO[0]; // 첫 번째 경기장 데이터 선택

  return (
    <div id="tab-map" className={styles.stadiumLocationContainer}>
      <div className={styles.stadiumSectionHeader}>
        <div className={styles.stadiumSectionTitle}>
          <h3>위치</h3>
        </div>
      </div>
      <LocationProvider fullAddress={stadium.full_address}>
        {(location) => (
          <>
            <div className={styles.stadiumLocationMap}>
              <KakaoMap latitude={location.latitude} longitude={location.longitude} />
            </div>
            <div className={styles.stadiumLocationAddress}>
              <p>
                {stadium.full_address}
                <span
                  className={styles.stadiumLocationAddressCopy}
                  onClick={() => navigator.clipboard.writeText(stadium.full_address)}
                >
                  주소 복사
                </span>
              </p>
            </div>
          </>
        )}
      </LocationProvider>
    </div>
  );
};

export default MapTab;
