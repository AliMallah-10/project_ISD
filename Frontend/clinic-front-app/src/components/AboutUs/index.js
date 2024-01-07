import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styleA.css";

function About() {
  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>About Us</h2>
          <p>
            Welcome to <span style={{ fontWeight: "bold" }}>Clinic-CARE</span>,
            your trusted healthcare partner. With a dedicated team of
            experienced healthcare professionals, we are committed to providing
            the highest quality medical care to our patients. Your well-being is
            our top priority.
          </p>
        </div>

        <div className="row">
          <div className="col-xl-5 col-lg-6 video-box d-flex justify-content-center align-items-stretch position-relative">
            {/* i add the dot to link */}
            <a
              href="https://youtu.be/h39m-e8JHDc"
              className="glightbox play-btn mb-4"
            >
              .
            </a>
          </div>

          <div className="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
            <div className="icon-box">
              <div className="icon">
                <i className="bx bx-heart"></i>
              </div>
              <h4 className="title">
                <a href="Home">HEALTH IS WEALTH</a>
              </h4>
              <p className="description">
                At <span style={{ fontWeight: "bold" }}>Clinic-CARE</span>, we
                firmly believe that health is wealth. We are dedicated to
                helping you achieve and maintain optimal health, so you can
                truly experience the richness of life.
              </p>
            </div>

            <div className="icon-box">
              <div className="icon">
                <i className="bx bx-health"></i>
              </div>
              <h4 className="title">
                <a href="Home">EMERGENCY</a>
              </h4>
              <p className="description">
                Emergency care when you need it most. Our dedicated team is
                available 24/7 to provide immediate medical attention in
                critical situations. Your safety and well-being are our top
                priorities.
              </p>
            </div>

            <div className="icon-box">
              <div className="icon">
                <i className="bx bx-help-circle"></i>
              </div>
              <h4 className="title">
                <a href="service">SERVICES</a>
              </h4>
              <p className="description">
                Our services extend far beyond medical treatment; they encompass
                care, compassion, and dedication. We are here to serve you with
                a diverse array of healthcare solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
