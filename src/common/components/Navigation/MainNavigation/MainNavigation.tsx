import React, { Fragment, useState } from "react";
import "./MainNavigation.scss";
import { MainHeader } from "../MainHeader/MainHeader";
import { Link } from "react-router-dom";
import { NavLinks } from "../NavLinks/NavLinks";
import { SideDrawer } from "../SideDrawer/SideDrawer";
import { Backdrop } from "../../UIElements/Backdrop/Backdrop";

export const MainNavigation: React.FC = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const sideDrawer = (
    <SideDrawer show={isOpenDrawer} onClick={() => setIsOpenDrawer(false)}>
      <nav className="main-navigation__drawer-nav">
        <NavLinks />
      </nav>
    </SideDrawer>
  );

  const backdrop = <Backdrop onClick={() => setIsOpenDrawer(false)} />;

  return (
    <Fragment>
      {isOpenDrawer && backdrop}
      {sideDrawer}
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={() => setIsOpenDrawer(true)}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">My Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  );
};
