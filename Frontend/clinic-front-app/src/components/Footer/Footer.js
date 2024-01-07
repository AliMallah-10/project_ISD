import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

function Footer() {
  return (
    <footer
      className="text-center text-lg-start bg-light text-muted"
      style={{ backgroundColor: "#1977cc", fontSize: "18px" }}
    >
      <section
        className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
        style={{ backgroundColor: "#1977cc" }}
      >
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="https://github.com/AliMallah-10" className="me-4 text-reset">
            <i className="fab fa-facebook-f " />
          </a>
          <a href="https://github.com/AliMallah-10" className="me-4 text-reset">
            <i className="fab fa-twitter" />
          </a>
          <a href="https://www.w3schools.com/" className="me-4 text-reset">
            <i className="fab fa-google" />
          </a>
          <a href="https://github.com/AliMallah-10" className="me-4 text-reset">
            <i className="fab fa-instagram" />
          </a>
          <a href="https://github.com/AliMallah-10" className="me-4 text-reset">
            <i className="fab fa-linkedin" />
          </a>
          <a href="https://github.com/AliMallah-10" className="me-4 text-reset">
            <i className="fab fa-github" />
          </a>
        </div>
      </section>

      <section style={{ backgroundColor: "#1977cc" }}>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3" />
                Clinic-CARE
              </h6>
              <p>
                At <span style={{ fontWeight: "bold" }}>Clinic-CARE</span>, our
                mission is to provide compassionate and comprehensive healthcare
                services to improve the health and well-being of our community.
                We are dedicated to delivering patient-centered care with a
                focus on excellence and empathy.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a href="Home" className="text-reset">
                  Angular
                </a>
              </p>
              <p>
                <a href="Home" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="Home" className="text-reset">
                  Vue
                </a>
              </p>
              <p>
                <a href="Home" className="text-reset">
                  Laravel
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="Home" className="text-reset">
                  Home
                </a>
              </p>
              <p>
                <a href="about" className="text-reset">
                  About
                </a>
              </p>
              <p>
                <a href="service" className="text-reset">
                  Services
                </a>
              </p>
              <p>
                <a href="doctors" className="text-reset">
                  Doctors
                </a>
              </p>
              <p>
                <a href="contact" className="text-reset">
                  Contact
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i class="fas fa-map-marker me-3 info"></i> Beirut,Hamra street
              </p>
              <p>
                <i className="fas fa-envelope me-3 info" />
                clinic@example.com
              </p>
              <p>
                <i className="fas fa-phone me-3 info" />+ 961 70 987 789
              </p>
              <p>
                <i className="fas fa-print me-3 info" /> + 961 70 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{
          backgroundColor: "#1977cc",
        }}
      >
        © 2023 Copyright:
        <a
          className="text-reset fw-bold"
          href="https://github.com/AliMallah-10"
        >
          AAM.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
