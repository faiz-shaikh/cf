import React from "react";
import { Link, IndexLink } from "react-router";

const Header = () => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">
        Home
      </IndexLink>
      {" | "}
      <Link to="/cheapflights-dashboard" activeClassName="active">
        Cheapflights Dashboard
      </Link>
      {" | "}
      <Link to="/cache-config" activeClassName="active">
        Cache Config
      </Link>
      {" | "}
      <Link to="/manual-fare-upload" activeClassName="active">
        Manual Fare Upload
      </Link>
    </nav>
  );
};

export default Header;
