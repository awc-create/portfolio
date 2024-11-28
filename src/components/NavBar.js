import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav aria-label="Site" className="vertical-menu">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/book-online"
            className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
          >
            Book Online
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
