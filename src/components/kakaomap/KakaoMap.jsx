// src/KakaoMap.jsx
// import React, { useRef, useEffect, useCallback } from 'react';
// import styles from './KakaoMap.module.css';

// const KakaoMap = ({ latitude = 37.5665, longitude = 126.9780 }) => {
//   const mapRef = useRef(null);

//   // 카카오맵 초기화 함수
//   const initializeMap = useCallback(() => {
//     if (mapRef.current && window.kakao) {
//       const container = mapRef.current;
//       const options = {
//         center: new window.kakao.maps.LatLng(latitude, longitude),
//         level: 3, // 확대 레벨
//       };
//       const map = new window.kakao.maps.Map(container, options);

//       // 마커 추가
//       const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
//       const marker = new window.kakao.maps.Marker({ position: markerPosition });
//       marker.setMap(map);
//     }
//   }, [latitude, longitude]);

//   useEffect(() => {
//     initializeMap();
//   }, [initializeMap]);

//   return <div ref={mapRef} className={styles.mapContainer}></div>;
// };

// export default KakaoMap;

// src/components/KakaoMap/KakaoMap.jsx

import React, { useEffect, useRef } from "react";
import styles from "./KakaoMap.module.css";

const KakaoMap = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && window.kakao) {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3, // 확대 레벨
      };
      const map = new window.kakao.maps.Map(container, options);

      // 마커 추가
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({ position: markerPosition });
      marker.setMap(map);
    }
  }, [latitude, longitude]);

  return <div ref={mapRef} className={styles.mapContainer}></div>;
};

export default KakaoMap;
