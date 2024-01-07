import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  message,
  List,
  Divider,
  Modal,
  Select,
} from "antd";
import axios from "axios";
import "./pageuser.css";

function PageAppointment() {
  const [searchValue, setSearchValue] = useState("");
  const [appointmentData, setAppointmentData] = useState(null);
  const [allAppointments, setAllAppointments] = useState([]);
  const [form] = Form.useForm();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [searchType, setSearchType] = useState("patient");
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    // Fetch all appointments when the component mounts
    fetchAllAppointments();
  }, []);

  const handleSearchAppointment = (appointment) => {
    setAppointmentData(appointment);
    form.setFieldsValue(appointment);
  };

  // Define the function to show the delete confirmation modal
  const showDeleteConfirmation = (appointment) => {
    setIsDeleteModalVisible(true);
  };

  const handleSearch = async () => {
    try {
      let response;

      if (searchType === "patient") {
        response = await axios.get(
          `http://localhost:3000/Appointments/ByPatientName/${searchValue}`
        );
      } else {
        response = await axios.get(
          `http://localhost:3000/Appointments/ByDoctorName/${searchValue}`
        );
      }

      const appointments = response.data.appointments;

      if (appointments.length > 0) {
        // Set the search results to the found appointments
        setSearchPerformed(true);
        setAllAppointments(appointments);
        // setAppointmentData(appointments[0]); // Display the first appointment
        // form.setFieldsValue(appointments[0]);
        setNotFoundMessage(""); // Clear the not found message
      } else {
        // If no appointments are found, reset the search results
        setAllAppointments([]);
        setAppointmentData(null);
        form.resetFields();
        setNotFoundMessage("No appointments found. Please try again.");
        setSearchPerformed(false);
      }
    } catch (error) {
      setNotFoundMessage("No appointments found. Please try again.");
      console.error("Error searching for appointments:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const fetchAllAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Appointments");
      const appointments = response.data;
      setAllAppointments(appointments);
    } catch (error) {
      console.error("Error fetching all appointments:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedAppointmentData = form.getFieldsValue();
      await axios.put(
        `http://localhost:3000/Appointments/updateA/${appointmentData._id}`,
        updatedAppointmentData
      );
      message.success("Appointment updated successfully");
      setAppointmentData(null);
      setSearchValue("");
      form.resetFields();
      fetchAllAppointments(); // Refresh the list of appointments
      setSearchPerformed(false);
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleDeleteApp = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/Appointments/deleteA/${appointmentData._id}`
      );
      message.success("Appointment deleted successfully");
      setAppointmentData(null);
      setIsDeleteModalVisible(false);
      setSearchValue("");
      form.resetFields();
      fetchAllAppointments(); // Refresh the list of appointments
    } catch (error) {
      console.error("Error deleting appointment:", error);
      console.log(error);
    }
  };
  const handleCancel = () => {
    // Clear the searchValue and reset the form fields
    setSearchValue("");
    form.resetFields();
    fetchAllAppointments();
    setAppointmentData(null); // Clear the appointment data
    form.resetFields(); // Reset the form fields
    // Set searchPerformed to false
    setSearchPerformed(false);
  };
  function formatDate(dateString) {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }

  return (
    <div className="text-Form">
      <h1>Manage Appointments</h1>
      <div className="input-container">
        <Select
          value={searchType}
          onChange={(value) => setSearchType(value)}
          className="search-type-select"
        >
          <Select.Option value="patient">Search by Patient</Select.Option>
          <Select.Option value="doctor">Search by Doctor</Select.Option>
        </Select>
        <Input
          className="search-input"
          placeholder="Enter patient or doctor name to search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button className="search-button" type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      {notFoundMessage && (
        <p className="not-found-message">{notFoundMessage}</p>
      )}
      {appointmentData && (
        <Form form={form} onFinish={handleUpdate}>
          <Form.Item
            name="patientName"
            label="Patient Name"
            className="form-item"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="doctorName"
            label="Doctor Name"
            className="form-item"
          >
            <Input />
          </Form.Item>
          <Form.Item name="services" label="Services" className="form-item">
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date" className="form-item">
            <Input />
          </Form.Item>
          <Form.Item name="time" label="Time" className="form-item">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" className="form-item">
            <Input />
          </Form.Item>
          <Form.Item className="form-item">
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button
              className="btnDelete"
              type="danger"
              onClick={() => showDeleteConfirmation(appointmentData)}
            >
              Delete
            </Button>
            <Button className="btnCancel" type="default" onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
      {appointmentData ? null : (
        <div>
          <Divider />
          <div className="title-container">
            <div></div>
            <p>Total Appointments: {allAppointments.length}</p>
          </div>
          <div className="user-list-container">
            <div className="user-info-table">
              <div className="user-info-row">
                <span className="info-title-cell">Patient Name</span>
                <span className="info-title-cell">Doctor Name</span>
                <span className="info-title-cell">Services</span>
                <span className="info-title-cell">Date</span>
                <span className="info-title-cell">Time</span>
                <span className="info-title-cell">Actions</span>
              </div>

              {allAppointments.map((appointment) => (
                <div key={appointment._id} className="user-info-row">
                  <div className="info-cell">{appointment.patientName}</div>
                  <div className="info-cell">{appointment.doctorName}</div>
                  <div className="info-cell">{appointment.services}</div>
                  <div className="info-cell">
                    {formatDate(appointment.date)}
                  </div>
                  <div className="info-cell">{appointment.time}</div>
                  <div className="info-cell">
                    <Button
                      type="primary"
                      onClick={() => handleSearchAppointment(appointment)}
                    >
                      Update
                    </Button>
                    <Button
                      className="btnDelete"
                      type="danger"
                      onClick={() => showDeleteConfirmation(appointment)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal
        title="Delete Appointment"
        visible={isDeleteModalVisible}
        onOk={handleDeleteApp}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this appointment?</p>
      </Modal>
    </div>
  );
}

export default PageAppointment;
