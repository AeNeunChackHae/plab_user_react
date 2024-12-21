// src/providers/LocationProvider.jsx
import React, { useEffect, useState } from "react";
import { getCoordinatesFromAddress } from "../Location/LocationService";

const LocationProvider = ({ fullAddress, children }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!fullAddress) return;

      const coordinates = await getCoordinatesFromAddress(fullAddress);
      if (coordinates) {
        setLocation(coordinates);
      }
    };

    fetchLocation();
  }, [fullAddress]);

  if (!location) {
    return <p>위치 데이터를 불러오는 중입니다...</p>;
  }

  return children(location);
};

export default LocationProvider;
