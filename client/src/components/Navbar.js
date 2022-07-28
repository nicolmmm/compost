import React from "react";
import { Link, useParams } from "react-router-dom";

function Navbar({ currentPage, setCurrentPage }) {
  return (
    <div className="navbar">
      {" "}
      <div className="header-titles">
        <Link to="/">
          {" "}
          <h1 className="primary-heading">comPOST</h1>{" "}
        </Link>
        <h5 className="secondary-heading"> Making a Difference</h5>
      </div>
      <li>
        <Link to="/">
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link to="/login">
          <span>Login or Sign up!</span>
        </Link>
      </li>
    </div>
  );
}

export default Navbar;
