import React from "react";
import ReactDOM from "react-dom";
import "./SideDrawer.scss";
import { CSSTransition } from "react-transition-group";

interface SideDrawerProps {
  show: boolean;
  onClick: () => void;
}
export const SideDrawer: React.FC<SideDrawerProps> = ({
  children,
  show,
  onClick,
}) => {
  const aside: JSX.Element = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside onClick={onClick} className="side-drawer">
        {children}
      </aside>
    </CSSTransition>
  );
  const drawer = document.getElementById("drawer-hook");
  if (drawer) {
    return ReactDOM.createPortal(aside, drawer);
  }
  return null;
};
