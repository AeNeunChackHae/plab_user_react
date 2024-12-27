// src/providers/LocationProvider.jsx
import React, { useEffect, useState } from "react";
import { getCoordinatesFromAddress } from "./LocationService";

const LocationProvider = ({ full_address, children }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!full_address) return;

      const coordinates = await getCoordinatesFromAddress(full_address);
      if (coordinates) {
        setLocation(coordinates);
      }
    };

    fetchLocation();
  }, [full_address]);

  if (!location) {
    return <p>위치 데이터를 불러오는 중입니다...</p>;
  }

  return children(location);
};

export default LocationProvider;
