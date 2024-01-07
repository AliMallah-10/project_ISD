import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ServiceCard.css";

function ServicesSection() {
  return (
    <section id="services" className="services">
     
      <div className="container">
        <div className="section-title">
          <h2>Services</h2>
          <p>
            Welcome to <span style={{ fontWeight: "bold" }}>Clinic-CARE</span>,
            where your health is our priority. Explore our wide range of
            healthcare services designed to meet your needs. Your health is not
            just our mission; it's our passion. Experience healthcare that cares
            about you.
          </p>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="icon-box">
              <div className="icon">
                <i className="fas fa-heartbeat"></i>
              </div>
              <h4>
                <a href="Home">Regular Checkup</a>
              </h4>
              <p>
                Our regular checkups are your first line of defense for
                maintaining good health. Preventive care today for a healthier
                tomorrow.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
            <div className="icon-box">
              <div className="icon">
                <i className="fas fa-pills"></i>
              </div>
              <h4>
                <a href="Home">Medicine</a>
              </h4>
              <p>
                We provide a wide range of medicines, ensuring you have access
                to the medications you need for a healthier life.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
            <div className="icon-box">
              <div className="icon">
                <i className="fas fa-hospital-user"></i>
              </div>
              <h4>
                <a href="Home">Pharmacist</a>
              </h4>
              <p>
                Meet our experienced pharmacists who are here to answer your
                questions and ensure you're on the right path to recovery.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
            <div className="icon-box">
              <div className="icon">
                <i className="fas fa-dna"></i>
              </div>
              <h4>
                <a href="Home">Blood Test</a>
              </h4>
              <p>
                Your health story starts with a simple blood test. Let us help
                you uncover the information you need to stay healthy.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
            <div className="icon-box">
              <div className="icon">
                <i className="fas fa-wheelchair"></i>
              </div>
              <h4>
                <a href="Home">Disabled Person</a>
              </h4>
              <p>
                Our services are tailored to support individuals with
                disabilities, ensuring they receive the care and attention they
                deserve.
              </p>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
            <div className="icon-box">
              <div className="icon">
                <i className="fas fa-notes-medical"></i>
              </div>
              <h4>
                <a href="Home">Health Post</a>
              </h4>
              <p>
                Stay informed and inspired with our health post. Your source for
                all things health and wellness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
