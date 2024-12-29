import React from "react";
import KakaoMap from "../../../kakaomap/KakaoMap";
import LocationProvider from "../../../location/LocationProvider";
import styles from "./MapTab.module.css";

const MapTab = ({ fullAddress }) => {
  if (!fullAddress) {
    return <div className={styles.error}>주소 정보가 없습니다.</div>;
  }

  return (
    <div id="tab-map" className={styles.stadiumLocationContainer}>
      <div className={styles.stadiumSectionHeader}>
        <div className={styles.stadiumSectionTitle}>
          <h3>위치</h3>
        </div>
      </div>
      {/* fullAddress를 LocationProvider에 전달 */}
      <LocationProvider full_address={fullAddress}>
        {(location) => (
          <>
            <div className={styles.stadiumLocationMap}>
              {/* KakaoMap에 location 정보를 전달 */}
              {location ? (
                <KakaoMap latitude={location.latitude} longitude={location.longitude} />
              ) : (
                <div className={styles.loading}>지도를 불러오는 중...</div>
              )}
            </div>
            <div className={styles.stadiumLocationAddress}>
              <p>
                {fullAddress}
                <span
                  className={styles.stadiumLocationAddressCopy}
                  onClick={() => navigator.clipboard.writeText(fullAddress)}
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
