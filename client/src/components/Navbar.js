import React from "react";
import { Link, useParams } from "react-router-dom";
import Auth from "../../src/utils/auth";

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
      <li className="navbar-li">
        <Link to="search">
          <span className="navbar-span">Search</span>
        </Link>
      </li>
      <li className="navbar-li">
        <Link to="Post">
          <span className="navbar-span">Post New</span>
        </Link>
      </li>
      {Auth.loggedIn() ? (
        <div className="navbar-loggedIn">
          <li className="navbar-li">
            <Link to="/">
              {" "}
              {/* Link to user's profile eventually */}
              <Link to={`/profile/${Auth.getProfile().data._id}`}>
                <span className="navbar-span">
                  Welcome back{" "}
                  <span className="text-warning">
                    {Auth.getProfile().data.userName}
                  </span>
                  !
                </span>
              </Link>
            </Link>
          </li>
          <li className="navbar-li">
            <Link to="/">
              <span onClick={Auth.logout} className="navbar-span">
                Log out
              </span>
            </Link>
          </li>
        </div>
      ) : (
        <li className="navbar-li">
          <Link to="/login">
            <span className="navbar-span">Login or Sign up!</span>
          </Link>
        </li>
      )}
    </div>
  );
}

export default Navbar;
