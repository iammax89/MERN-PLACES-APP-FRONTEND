import React, { useRef, useEffect } from "react";

import "./Map.scss";
interface MapProps {
  className?: string;
  style?: React.CSSProperties;
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}
export const Map: React.FC<MapProps> = ({ className, style, center, zoom }) => {
  const googleMapRef = useRef<any>();

  useEffect(() => {
    const googleMap = new (window as any).google.maps.Map(
      googleMapRef.current,
      {
        center: center,
        zoom: zoom,
      }
    );

    new (window as any).google.maps.Marker({
      position: center,
      map: googleMap,
    });
  }, [center, zoom]);
  return (
    <div ref={googleMapRef} className={`map ${className}`} style={style}></div>
  );
};
