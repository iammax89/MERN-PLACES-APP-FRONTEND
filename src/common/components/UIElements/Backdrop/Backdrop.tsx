import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.scss";

interface BackdropProps {
  onClick: () => void;
}

export const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
  const backdrop = document.getElementById("backdrop-hook");

  if (backdrop) {
    return ReactDOM.createPortal(
      <div className="backdrop" onClick={onClick}></div>,
      backdrop
    );
  } else {
    return null;
  }
};
