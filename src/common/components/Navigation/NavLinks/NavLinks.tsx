import React, { useContext } from "react";
import "./NavLinks.scss";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";

interface NavLinksProps {
  id?: string;
}
export const NavLinks: React.FC<NavLinksProps> = ({ id }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to={`/u1/places`}>My Places</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Place</NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to="/auth" onClick={logout}>
            Log Out
          </NavLink>
        </li>
      )}
    </ul>
  );
};
