import Navbar from "./Navbar";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { useState } from "react";

export default function Page() {
  const [currentPage, setCurrentPage] = useState("Home");

  const renderPage = () => {
    if (currentPage === "Home") {
      return <Home />;
    }
    if (currentPage === "Login") {
      return <Login setCurrentPage={setCurrentPage} />;
    }
    if (currentPage === "SignUp") {
      return <SignUp />;
    }
  };

  return (
    <div className="body">
      <div className="head-and-body">
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="rendered-page">{renderPage()}</div>
      </div>
    </div>
  );
}
