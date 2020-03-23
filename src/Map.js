
import React, { useRef, useEffect } from 'react';

import './Map.css';

const Map = props => {
  const mapRef = useRef();

  const { lng, lat, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: {lng, lat},
      zoom: zoom
    });

    new window.google.maps.Marker({ position: {lng, lat}, map: map });
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