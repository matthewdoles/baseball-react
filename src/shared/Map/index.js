import React, { useEffect, useRef } from 'react';

import './index.css';

const Map = ({ lng, lat, zoom, className, style }) => {
  const mapRef = useRef();

  useEffect(() => {
    const googleScript = document.getElementById('google-map-script');
    const loadMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lng, lat },
        zoom: zoom,
      });
      new window.google.maps.Marker({ position: { lng, lat }, map: map });
    };

    if (window.google) {
      loadMap();
    }

    googleScript.addEventListener('load', () => {
      loadMap();
    });
  }, [lat, lng, zoom]);

  return <div ref={mapRef} className={`Map ${className}`} style={style}></div>;
};

export default Map;
