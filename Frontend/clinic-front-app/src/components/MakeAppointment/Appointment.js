import React, { useState, useEffect } from "react";
import "./Appointment.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function Appointment() {
  const navigate = useNavigate();

  const [time, setTime] = useState("");

  const [patientNumber, setPatientNumber] = useState("");
  const [patientName, setPatientName] = useState("");
  const [date, setDate] = useState("");
  const [services, setServices] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(""); // Store the selected doctor's name

  // Function to fetch the list of doctors
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Users/doctors"); // Access the Express route for getting doctors
      setDoctors(response.data.doctors); // Assuming the response has a "doctors" property
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors(); // Fetch doctors when the component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/Appointments/createA",
        {
          patientNumber,
          patientName,
          date,
          time,
          services,
          doctorName: selectedDoctor,
        }
      );

      if (response.status === 201) {
        // Appointment was created successfully
        message.success("Appointment created Successfully");
        console.log("Appointment created:");

        navigate("/");
      }
    } catch (error) {
      message.error("Please check your input. Please choose a future date.");

      console.error("Error creating appointment:", error);
    }
  };

  const clearForm = async () => {
    setPatientNumber("");
    setPatientName("");
    setDate("");
    setTime("");
  };
  return (
    <>
      <div
        className="container-fluid bg-primary bg-appointment mb-5 wow fadeInUp"
        data-wow-delay="0.1s"
        style={{ marginTop: "90px" }}
      >
        <div className="container appointment">
          <div className="row gx-5">
            <div className="col-lg-6 py-5">
              <div className="py-5">
                <h1 className="display-5 text-white mb-4">
                  We Are A Certified and Award Winning Dental Clinic You Can
                  Trust
                </h1>
                <p className="text-white mb-0">
                  Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing
                  kasd ipsum. Dolor ea et dolore et at sea ea at dolor, justo
                  ipsum duo rebum sea invidunt voluptua. Eos vero eos vero ea et
                  dolore eirmod et. Dolores diam duo invidunt lorem. Elitr ut
                  dolores magna sit. Sea dolore sanctus sed et. Takimata
                  takimata sanctus sed.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="appointment-form h-100 d-flex flex-column justify-content-center text-center p-5 wow "
                data-wow-delay="0.6s"
              >
                <h1 className="text-white mb-4">Make Appointment</h1>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <select
                        required
                        className="form-select bg-light border-0"
                        style={{ height: "55px" }}
                        name="services"
                        onChange={(e) => setServices(e.target.value)}
                      >
                        <option defaultValue>Select A Service</option>
                        <option value="Teeth Cleaning">Teeth Cleaning</option>
                        <option value="Dental Checkup">Dental Checkup</option>
                        <option value="Teeth Whitening">Teeth Whitening</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6">
                      <select
                        className="form-select bg-light border-0"
                        style={{ height: "55px" }}
                        name="doctorName"
                        value={selectedDoctor} // Set the selectedDoctor state as the value
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                      >
                        {/* <option defaultValue>Select Doctor</option>
                        <option value="Dr. Ali Mallah">Dr. Ali Mallah</option>
                        <option value="Dr. Mohammad Jaber">
                          Dr. Mohammad Jaber
                        </option>
                        <option value="Dr. Jaafar Mousa">
                          Dr. Jaafar Mousa
                        </option> */}
                        <option defaultValue>Select Doctor</option>
                        {doctors.map((doctor) => (
                          <option key={doctor._id} value={doctor.names}>
                            Dr. {doctor.names}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 col-sm-6">
                      <input
                        required
                        type="text"
                        className="form-control bg-light border-0"
                        placeholder="Your Name"
                        style={{ height: "55px" }}
                        name="patientName"
                        onChange={(e) => setPatientName(e.target.value)}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <input
                        required
                        type="number"
                        className="form-control bg-light border-0"
                        placeholder="Your Number"
                        style={{ height: "55px" }}
                        name="patientNumber"
                        onChange={(e) => setPatientNumber(e.target.value)}
                      />
                    </div>

                    <div className="col-12 col-sm-6">
                      <div
                        // className="date"
                        id="date1"
                        data-target-input="nearest"
                      >
                        <input
                          type="date"
                          className="form-control bg-light border-0"
                          placeholder="Appointment Date"
                          data-target="#date1"
                          data-toggle="datetimepicker"
                          style={{ height: "55px" }}
                          name="date"
                          required
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div
                        className="time"
                        id="time1"
                        data-target-input="nearest"
                      >
                        <input
                          type="time"
                          className="form-control bg-light border-0 "
                          placeholder="Appointment Time"
                          data-target="#time1"
                          data-toggle="datetimepicker"
                          style={{ height: "55px" }}
                          name="time"
                          required
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-secondary w-100 py-3 clear-btn"
                        type="button"
                        onClick={clearForm}
                      >
                        Clear
                      </button>
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-dark w-100 py-3 send-message"
                        type="submit"
                      >
                        Make Appointment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointment;
