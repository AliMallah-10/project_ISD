import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FirstView.css";

function FirstView() {
  return (
    <div>
      <div>
        <section id="home" className="d-flex align-items-center">
          <div className="container">
            <h1>
              Welcome to Clinic <br /> Healthcare
            </h1>
            <h2>
              We are a team of Specialized Doctors.
              <br />
              "Your devotion and care bring healing, comfort, and hope."
            </h2>
            <a href="#about" className="learnBtn">
              Learn More
            </a>
          </div>
        </section>
      </div>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <main id="main" />
      </div>

      <section id="featured-services" className="featured-services">
        <div className="container" data-aos="fade-up">
          <div className="row">
            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="icon-box" data-aos="fade-up" data-aos-delay={100}>
                <div className="icon">
                  <i className="fas fa-heartbeat" />
                </div>
                <h4 className="title">
                  <a href="about"> Normal Checkup</a>
                </h4>
                <p className="description">
                  Preventive care starts with a normal checkup. Trust us to
                  monitor your health and catch potential issues early
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="icon-box" data-aos="fade-up" data-aos-delay={400}>
                <div className="icon">
                  <i className="fas fa-dna" />
                </div>
                <h4 className="title">
                  <a href="about">Blood Test</a>
                </h4>
                <p className="description">
                  Know your health inside out with our through blood tests. Your
                  well-being is our priority
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="icon-box" data-aos="fade-up" data-aos-delay={300}>
                <div className="icon">
                  <i className="fas fa-temperature-high" />
                </div>
                <h4 className="title">
                  <a href="about">Body Temperature</a>
                </h4>
                <p className="description">
                  Stay vigilant with body temperature monitoring. Your health
                  and safety matter to us
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
              <div className="icon-box" data-aos="fade-up" data-aos-delay={200}>
                <div className="icon">
                  <i className="fas fa-hand-holding-medical" />
                </div>
                <h4 className="title">
                  <a href="about">Medicine use</a>
                </h4>
                <p className="description">
                  Managing your health with medicines? Count on us for reliable
                  information and support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid banner mb-5">
        <div className="container">
          <div className="row gx-0">
            <div className="col-lg-4 wow zoomIn" data-wow-delay="0.1s">
              <div
                className="bg d-flex flex-column p-5"
                style={{ height: "300px" }}
              >
                <h3 className="text mb-3">Opening Hours</h3>
                <div className="d-flex justify-content-between text mb-3">
                  <h6 className="text mb-0">Mon - Fri</h6>
                  <p className="mb-0"> 8:00am - 8:00pm</p>
                </div>
                <div className="d-flex justify-content-between text mb-3">
                  <h6 className="text mb-0">Saturday</h6>
                  <p className="mb-0"> 8:00am - 5:00pm</p>
                </div>
                <div className="d-flex justify-content-between text mb-3">
                  <h6 className="text mb-0">Sunday</h6>
                  <p className="mb-0"> 8:00am - 2:00pm</p>
                </div>
                <a className="btn btn-light" href="about">
                  Appointment
                </a>
              </div>
            </div>
            <div className="col-lg-4 wow zoomIn" data-wow-delay="0.3s">
              <div
                className="bg d-flex flex-column p-5"
                style={{ height: "300px" }}
              >
                <h3 className="text mb-3">Search A Doctor</h3>

                {/* Search Form  By date*/}
                <input
                  type="date"
                  className="form-select bg-light border-0 mb-3"
                  placeholder="Appointment Date"
                  data-target="#date1"
                  data-toggle="datetimepicker"
                  style={{ height: "55px" }}
                  name="date"
                  required
                />

                <select
                  defaultValue="0"
                  className="form-select bg-light border-0 mb-3"
                  style={{ height: "40px" }}
                >
                  <option selected value="0">
                    Select A Service
                  </option>
                  <option value={1}>Service 1</option>
                  <option value={2}>Service 2</option>
                  <option value={3}>Service 3</option>
                </select>
                <a className="btn btn-light" href="about">
                  Search Doctor
                </a>
              </div>
            </div>

            <div className="col-lg-4 wow zoomIn" data-wow-delay="0.6s">
              <div
                className="bg d-flex flex-column p-5"
                style={{ height: "300px" }}
              >
                <h3 className="text mb-3">Make Appointment</h3>
                <p className="text">
                  Schedule Your Appointment for Expert Care and Personalized
                  Service
                </p>
                <h2 className="text mb-0">+961 70 111 222</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstView;
