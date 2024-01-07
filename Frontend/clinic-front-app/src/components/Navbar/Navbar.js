import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();
  // Check if the user is already logged in (you can use a token or any other method)
  useEffect(() => {
    const token = localStorage.getItem("token"); // You might use a different way to check login status
    const role = localStorage.getItem("role"); // Get the user's role from local storage
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleManager = () => {
    navigate("/dashBoardManager");
  };

  const handleCoManager = () => {
    navigate("/coManagerDashboard");
    // window.location.href = "/coManagerDashboard";
  };
  const handleDoctor = () => {
    navigate("/doctorDashboard");
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform any necessary logout actions, e.g., clearing the token
    window.location.reload();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center">
        <h1 className="logo me-auto">
          <a href="/">Clinic-CARE</a>
        </h1>
        <nav className="navbar order-last order-lg-0">
          <ul>
            <li>
              <a className="nav-link scrollto active" href="/">
                Home
              </a>
            </li>
            <li>
              {/* <a
                className="nav-link scrollto"
                href="/about"
                onClick={handleAboutClick}
              >
                About
              </a> */}
              <Link className="nav-link scrollto" to="/about">
                About
              </Link>
            </li>
            <li>
              {/* <a className="nav-link scrollto" href="/service">
                Services
              </a> */}
              <Link className="nav-link scrollto" to="/service">
                Services
              </Link>
            </li>
            <li>
              {/* <a className="nav-link scrollto" href="/doctors">
                Doctors
              </a> */}
              <Link className="nav-link scrollto" to="/doctors">
                Doctors
              </Link>
            </li>
            <li>
              {/* <a className="nav-link scrollto" href="/contact">
                Contact
              </a> */}
              <Link className="nav-link scrollto" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle" />
        </nav>
        <Link to="appointment" className="appointment-btn scrollto">
          <span className="d-none d-md-inline">Make an</span> Appointment
        </Link>
        {/* <a href="login" className="appointment-btn scrollto">
           Login/SignUp
        </a> */}
        <div>
          {userRole === "doctor" ? (
            <button className="appointment-btn scrollto" onClick={handleDoctor}>
              Doctor Dashboard
            </button>
          ) : userRole === "manager" ? (
            <button
              className="appointment-btn scrollto"
              onClick={handleManager}
            >
              Manager Dashboard
            </button>
          ) : userRole === "co-manager" ? (
            <button
              className="appointment-btn scrollto"
              onClick={handleCoManager}
            >
              Co-Manager Dashboard
            </button>
          ) : isLoggedIn ? (
            <button className="appointment-btn scrollto" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <a href="login" className="appointment-btn scrollto">
              Login/SignUp
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
