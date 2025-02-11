import React, { useEffect, useRef, useState } from "react";

const Map = ({ latitude, longitude }) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDibCdcK4JBV60aFaIFohHe3PXEeuDIBww`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setMapLoaded(true);
      };

    document.head.appendChild(script);
    }, []);

    useEffect(() => {
      if (mapLoaded && latitude && longitude) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: latitude, lng: longitude },
          zoom: 14,
        });
  
        new window.google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
        });
      }
    }, [mapLoaded, latitude, longitude]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "450px",
        marginTop: "20px",
        borderRadius: "8px",
      }}
    />
  );
};

export default Map;
