import React from "react";
import "./Avatar.scss";

interface AvatarProps {
  className?: string;
  style?: React.CSSProperties;
  image: string;
  alt: string;
  width?: string;
}
const Avatar: React.FC<AvatarProps> = ({
  className,
  style,
  image,
  alt,
  width,
}) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width: width, height: width }} />
    </div>
  );
};

export default Avatar;
