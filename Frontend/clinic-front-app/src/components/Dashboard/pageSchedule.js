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

function PageSchedule() {
  const [searchValue, setSearchValue] = useState("");
  const [scheduleData, setScheduleData] = useState(null);
  const [allSchedules, setAllSchedules] = useState([]);
  const [form] = Form.useForm();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [searchType, setSearchType] = useState("doctor");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Users/doctors");
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  useEffect(() => {
    // Fetch all schedules when the component mounts
    fetchAllSchedules();
    fetchDoctors();
  }, []);

  const handleSearchSchedule = (schedule) => {
    setScheduleData(schedule);
    form.setFieldsValue(schedule);
  };

  // Define the function to show the delete confirmation modal
  const showDeleteConfirmation = (schedule) => {
    setScheduleData(schedule);
    setIsDeleteModalVisible(true);
  };
  const showAddScheduleForm = () => {
    setIsAddModalVisible(true);
  };

  const handleAddSchedule = async (values) => {
    try {
      // Send a POST request to your server to add a schedule
      await axios.post(
        "http://localhost:3000/Doctorschedule/createDoctor",
        values
      );
      message.success("Schedule added successfully");
      setIsAddModalVisible(false);
      form.resetFields();
      fetchAllSchedules(); // Refresh the list of schedules
    } catch (error) {
      console.error("Error adding schedule:", error);
      message.error("Failed to add Schedule");
    }
  };
  const handleSearch = async () => {
    try {
      let response;

      if (searchType === "doctor") {
        response = await axios.get(
          `http://localhost:3000/Doctorschedule/doctorName/${searchValue}`
        );
      } else if (searchType === "day") {
        response = await axios.get(
          `http://localhost:3000/Doctorschedule/day/${searchValue}`
        );
      }

      const schedules = response.data;

      if (schedules.length > 0) {
        // Set the search results to the found schedules
        setSearchPerformed(true);
        setAllSchedules(schedules);
        setNotFoundMessage(""); // Clear the not found message
      } else {
        // If no schedules are found, reset the search results
        setAllSchedules([]);
        setScheduleData(null);
        form.resetFields();
        setNotFoundMessage("No schedules found. Please try again.");
        setSearchPerformed(false);
      }
    } catch (error) {
      setNotFoundMessage("No schedules found. Please try again.");
      console.error("Error searching for schedules:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const fetchAllSchedules = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Doctorschedule");
      const schedules = response.data;
      setAllSchedules(schedules);
    } catch (error) {
      console.error("Error fetching all schedules:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedScheduleData = form.getFieldsValue();
      await axios.put(
        `http://localhost:3000/Doctorschedule/updateDoctor/${scheduleData._id}`,
        updatedScheduleData
      );
      message.success("Schedule updated successfully");
      setScheduleData(null);
      setSearchValue("");
      form.resetFields();
      fetchAllSchedules(); // Refresh the list of schedules
      setSearchPerformed(false);
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  const handleDeleteSchedule = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/Doctorschedule/deleteDoctor/${scheduleData._id}`
      );
      message.success("Schedule deleted successfully");
      setScheduleData(null);
      setIsDeleteModalVisible(false);
      setSearchValue("");
      form.resetFields();
      fetchAllSchedules(); // Refresh the list of schedules
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const handleCancel = () => {
    // Clear the searchValue and reset the form fields
    setSearchValue("");
    form.resetFields();
    fetchAllSchedules();
    setScheduleData(null); // Clear the schedule data
    form.resetFields(); // Reset the form fields
    // Set searchPerformed to false
    setSearchPerformed(false);
  };

  return (
    <div className="text-Form">
      <h1>Manage Doctor Schedules</h1>
      <div className="input-container">
        <Select
          value={searchType}
          onChange={(value) => setSearchType(value)}
          className="search-type-select"
        >
          <Select.Option value="doctor">Search by Doctor</Select.Option>
          <Select.Option value="day">Search by Day</Select.Option>
        </Select>
        <Input
          className="search-input"
          placeholder="Enter doctor name or day to search"
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
      {scheduleData && (
        <Form form={form} onFinish={handleUpdate}>
          <Form.Item
            name="nameDoctor"
            label="Doctor Name"
            className="form-item"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item name="services" label="Services" className="form-item">
            <Input />
          </Form.Item>
          <Form.Item name="day" label="Day" className="form-item">
            <Input />
          </Form.Item>
          <Form.Item name="start_time" label="Start Time" className="form-item">
            <Input />
          </Form.Item>
          <Form.Item name="end_time" label="End Time" className="form-item">
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
              onClick={() => showDeleteConfirmation(scheduleData)}
            >
              Delete
            </Button>
            <Button className="btnCancel" type="default" onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
      {scheduleData ? null : (
        <div>
          <Divider />
          <div className="title-container">
            <div></div>
            <p>Total Schedules: {allSchedules.length}</p>
          </div>
          <div className="user-list-container">
            <div className="user-info-table">
              <div className="user-info-row">
                <span className="info-title-cell">Doctor Name</span>
                <span className="info-title-cell">Services</span>
                <span className="info-title-cell">Day</span>
                <span className="info-title-cell">Start Time</span>
                <span className="info-title-cell">End Time</span>
                <span className="info-title-cell">Actions</span>
              </div>

              {allSchedules.map((schedule) => (
                <div key={schedule._id} className="user-info-row">
                  <div className="info-cell">{schedule.nameDoctor}</div>
                  <div className="info-cell">
                    {schedule.services.join(", ")}
                  </div>
                  <div className="info-cell">{schedule.day.join(", ")}</div>
                  <div className="info-cell">{schedule.start_time}</div>
                  <div className="info-cell">{schedule.end_time}</div>
                  <div className="info-cell">
                    <Button
                      type="primary"
                      onClick={() => handleSearchSchedule(schedule)}
                    >
                      Update
                    </Button>
                    <Button
                      className="btnDelete"
                      type="danger"
                      onClick={() => showDeleteConfirmation(schedule)}
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

      <Button
        className="add-schedule-button"
        type="primary"
        onClick={showAddScheduleForm}
      >
        Add Schedule
      </Button>

      <Modal
        title="Add Schedule"
        visible={isAddModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsAddModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} onFinish={handleAddSchedule}>
          {/* Form fields for adding a schedule */}
          <Form.Item
            name="nameDoctor"
            label="Doctor Name"
            rules={[
              { required: true, message: "Please enter the doctor's name" },
            ]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="Select Doctor"
              value={scheduleData ? scheduleData.nameDoctor : undefined}
              onChange={(value) => form.setFieldsValue({ nameDoctor: value })}
            >
              <Select.Option value="" disabled>
                Select Doctor
              </Select.Option>
              {doctors.map((doctor) => (
                <Select.Option key={doctor._id} value={doctor.names}>
                  Dr. {doctor.names}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="services"
            label="Services"
            rules={[
              { required: true, message: "Please enter at least one service" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="day"
            label="Day"
            rules={[
              { required: true, message: "Please enter at least one day" },
            ]}
          >
            <Select
              mode="multiple" // Set mode to "multiple" to allow multiple selections
            >
              {daysOfWeek.map((day) => (
                <Select.Option key={day} value={day}>
                  {day}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="start_time"
            label="Start Time"
            rules={[{ required: true, message: "Please enter the start time" }]}
          >
            <Input type="time" />
          </Form.Item>
          <Form.Item
            name="end_time"
            label="End Time"
            rules={[{ required: true, message: "Please enter the end time" }]}
          >
            <Input type="time" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please enter the status" }]}
          >
            <Select>
              <Select.Option value="scheduled">Scheduled</Select.Option>
              <Select.Option value="cancelled">Cancelled</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Delete Schedule"
        visible={isDeleteModalVisible}
        onOk={handleDeleteSchedule}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this schedule?</p>
      </Modal>
    </div>
  );
}

export default PageSchedule;
