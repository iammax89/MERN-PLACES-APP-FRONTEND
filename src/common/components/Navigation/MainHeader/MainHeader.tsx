import React from "react";
import "./MainHeader.scss";

export const MainHeader: React.FC = ({ children }) => {
  return <header className="main-header">{children}</header>;
};
