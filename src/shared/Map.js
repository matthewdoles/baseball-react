import React, { useRef, useEffect } from 'react';

import './Map.css';

const Map = (props) => {
  const mapRef = useRef();

  const { lng, lat, zoom } = props;

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

  return (
    <div
      ref={mapRef}
      className={`Map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
