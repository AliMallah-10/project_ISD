import "./Contact.css";
import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (formData.subject.trim() === "") {
      newErrors.subject = "Subject is required";
      valid = false;
    }

    if (formData.message.trim() === "") {
      newErrors.message = "Message is required";
      valid = false;
    }

    if (valid) {
      // Form submission logic here
      console.log("Form submitted:", formData);
    }

    setErrors(newErrors);
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <>
      <div className="container-fluid py-5">
        <div className="container contact">
          <div className="row g-5">
            <div
              className="col-xl-4 col-lg-6 wow slideInUp"
              data-wow-delay="0.1s"
            >
              <div className="bg-light rounded h-100 p-5">
                <div className="section-title">
                  <h5 className="position-relative d-inline-block text-primary text-uppercase">
                    Contact Us
                  </h5>
                  <h1 className="display-6 mb-4">Feel Free To Contact Us</h1>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-geo-alt fs-1 text-primary me-3"></i>
                  <div className="text-start">
                    <h5 className="mb-0">Our Office</h5>
                    <span>123 Street, New York, USA</span>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-envelope-open fs-1 text-primary me-3"></i>
                  <div className="text-start">
                    <h5 className="mb-0">Email Us</h5>
                    <span>info@example.com</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-phone-vibrate fs-1 text-primary me-3"></i>
                  <div className="text-start">
                    <h5 className="mb-0">Call Us</h5>
                    <span>+012 345 6789</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 wow slideInUp"
              data-wow-delay="0.3s"
            >
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <input
                      type="text"
                      className={`form-control border-0 bg-light px-4 ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Your Name"
                      style={{ height: "55px" }}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      className={`form-control border-0 bg-light px-4 ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      placeholder="Your Email"
                      style={{ height: "55px" }}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      className={`form-control border-0 bg-light px-4 ${
                        errors.subject ? "is-invalid" : ""
                      }`}
                      placeholder="Subject"
                      style={{ height: "55px" }}
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    {errors.subject && (
                      <div className="invalid-feedback">{errors.subject}</div>
                    )}
                  </div>
                  <div className="col-12">
                    <textarea
                      className={`form-control border-0 bg-light px-4 py-3 ${
                        errors.message ? "is-invalid" : ""
                      }`}
                      rows="5"
                      placeholder="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    {errors.message && (
                      <div className="invalid-feedback">{errors.message}</div>
                    )}
                  </div>

                  <div className="col-12">
                    <button
                      className="btn btn-secondary w-100 py-3 clear-btn"
                      type="button"
                      onClick={handleClear}
                    >
                      Clear
                    </button>
                  </div>

                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3 send-message"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div
              className="col-xl-4 col-lg-12 wow slideInUp"
              data-wow-delay="0.6s"
            >
              <iframe
                className="position-relative rounded w-100 h-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d848031.9623371948!2d35.84741004999999!3d33.8735578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17028422aaad%3A0xcc7d34096c00f970!2sLebanon!5e0!3m2!1sen!2slb!4v1696678029750!5m2!1sen!2slb"
                style={{ minHeight: "400px", border: "0" }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                title="Google Maps - Location in Lebanon"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
