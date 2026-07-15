import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <h2>
          <NavLink to="/about">Sleep Diary</NavLink>
        </h2>
        <ul style={{ listStyleType: "none", display: "flex" }}>
          <li style={{ marginRight: "20px" }}>
            <NavLink to="/diary" activeclassname="active">
              Sleep Data
            </NavLink>
          </li>
          <li style={{ marginRight: "20px" }}>
            <NavLink to="/tutorial" activeclassname="active">
              Tutorial
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
