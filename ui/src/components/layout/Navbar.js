import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ title }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <Link to="/">{title}</Link>
      </h1>
      <ul>
        <li>
          <Link to="/drag-drop-demo">DragDrop demo</Link>
        </li>
        <li>
          <Link to="/dynamic">Dynamic Chart</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Flow Chart"
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired
};

export default Navbar;
