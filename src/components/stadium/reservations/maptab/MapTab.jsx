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
                  onClick={() => {
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                      navigator.clipboard.writeText(fullAddress)
                        .then(() => {
                          alert("주소가 복사되었습니다!");
                        })
                        .catch((err) => {
                          console.error("주소 복사 실패:", err);
                          alert("주소 복사 중 오류가 발생했습니다.");
                        });
                    } else {
                      // 호환되지 않는 브라우저의 경우
                      prompt("주소 복사가 지원되지 않는 환경입니다. 아래 텍스트를 복사하세요:", fullAddress);
                    }
                  }}
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
