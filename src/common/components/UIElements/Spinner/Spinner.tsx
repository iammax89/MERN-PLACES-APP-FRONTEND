import React from "react";

import "./Spinner.scss";

interface SpinnerProps {
  asOverlay: boolean;
}
const Spinner: React.FC<SpinnerProps> = ({ asOverlay }) => {
  return (
    <div className={`${asOverlay && "loading-spinner__overlay"}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Spinner;
