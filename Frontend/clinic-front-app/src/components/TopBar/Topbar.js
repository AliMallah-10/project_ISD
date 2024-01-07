import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Topbar.css";

function Topbar() {
  return (
    <div id="topbar" className="d-flex align-items-center fixed-top">
      <div className="container d-flex justify-content-between">
        <div className="contact-info d-flex align-items-center">
          <i className="bi bi-envelope" />{" "}
          <a href="mailto:contact@example.com">Clinic@example.com</a>
          <i className="bi bi-phone" /> +961 70 987 789
        </div>
        <div className="d-none d-lg-flex social-links align-items-center">
          <a href="Home" className="facebook">
            <i className="bi bi-facebook" />
          </a>
          <a href="Home" className="instagram">
            <i className="bi bi-instagram" />
          </a>
          <a href="Home" className="twitter">
            <i className="bi bi-twitter" />
          </a>
          <a href="Home" className="linkedin">
            <i className="bi bi-linkedin" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
