import React, { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
        //   console.log("Updated location:", latitude, longitude);
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => console.error("Error getting location:", error),
        {
          enableHighAccuracy: true,
        }
      );
    };

    // Initial call
    updateLocation();

    // Repeat every 5 seconds (5000 ms)
    const intervalId = setInterval(updateLocation, 5000);

    // Cleanup
    return () => clearInterval(intervalId);
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      {currentPosition ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={17}
        >
          <Marker position={currentPosition} />
        </GoogleMap>
      ) : (
        <p>Fetching your location...</p>
      )}
    </LoadScript>
  );
};

export default LiveTracking;
