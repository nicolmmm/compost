import React from "react";

function Navbar({ currentPage, setCurrentPage }) {
  return (
    <div className="navbar">
      <div className="header-titles">
        <h1 className="primary-heading">comPOST</h1>
        <h5 className="secondary-heading"> Making a Difference</h5>
      </div>
      <li
        onClick={() => setCurrentPage("Home")}
        className={currentPage === "Home" ? "navbar-tab-active" : "navbar-tab"}
      >
        <span>Home</span>
      </li>
      <li
        onClick={() => setCurrentPage("Login")}
        className={currentPage === "Login" ? "navbar-tab-active" : "navbar-tab"}
      >
        <span>Login or Sign up!</span>
      </li>
    </div>
  );
}

export default Navbar;
