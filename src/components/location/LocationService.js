// src/services/LocationService.js
export const getCoordinatesFromAddress = async (address) => {
    const GOOGLE_API_KEY = "AIzaSyBLBo_Hr76EMgkrxMjOBP4npba8VtvWTQU"; // 구글 지도 API 키를 여기에 추가
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${GOOGLE_API_KEY}`;
  
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
  
      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        return { latitude: location.lat, longitude: location.lng };
      } else {
        throw new Error(`Geocoding failed: ${data.status}`);
      }
    } catch (error) {
      console.error("주소 변환 중 오류 발생:", error);
      return null;
    }
  };
  