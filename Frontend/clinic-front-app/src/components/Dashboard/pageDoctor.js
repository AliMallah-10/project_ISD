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

const { Option } = Select;

function PageDoctor() {
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState(null);
  const [doctors, setDoctors] = useState([]); // Only doctors
  const [form] = Form.useForm();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchType, setSearchType] = useState("username"); // Default to "username"
  const [doctorCount, setDoctorCount] = useState(0); // New state variable for count

  useEffect(() => {
    // Fetch all doctors when the component mounts
    fetchDoctors();
  }, []);

  const handleSearchUser = (doctor) => {
    setUserData(doctor);
    form.setFieldsValue(doctor);
  };

  const showDeleteConfirmation = (doctor) => {
    setUserData(doctor);
    setIsDeleteModalVisible(true);
  };

  const showAddDoctorForm = () => {
    setIsAddModalVisible(true);
  };

  const handleAddDoctor = async (values) => {
    try {
      await axios.post("http://localhost:3000/Users/register", values);
      message.success("Doctor added successfully");
      setIsAddModalVisible(false);
      form.resetFields();
      fetchDoctors(); // Refresh the list of doctors
    } catch (error) {
      console.error("Error adding doctor:", error);
      message.error("Failed to add Doctor");
    }
  };

  const handleSearch = async () => {
    try {
      let response;
      if (/^[0-9a-fA-F]{24}$/.test(searchValue)) {
        response = await axios.get(
          `http://localhost:3000/Users/user/${searchValue}`
        );
      } else if (searchType === "username") {
        response = await axios.get(
          `http://localhost:3000/Users/username/${searchValue}`
        );
      } else if (searchType === "name") {
        response = await axios.get(
          `http://localhost:3000/Users/getByNames/${searchValue}`
        );
      }

      const user = response.data.user;

      if (user && user.role === "doctor") {
        setDoctors([user]);
        setUserData(user);
        form.setFieldsValue(user);
        setNotFoundMessage("");
        setSearchPerformed(true);
      } else {
        setDoctors([]);
        setUserData(null);
        form.resetFields();
        setNotFoundMessage("Doctor not found. Please try again.");
        setSearchPerformed(false);
      }
    } catch (error) {
      setNotFoundMessage("Doctor not found. Please try again.");
      console.error("Error searching for doctor:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Users");
      const doctorsData = response.data.users.filter(
        (user) => user.role === "doctor"
      );
      setDoctors(doctorsData);
      setDoctorCount(doctorsData.length); // Update the count
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedDoctorData = form.getFieldsValue();
      await axios.put(
        `http://localhost:3000/Users/updateUser/${userData._id}`,
        updatedDoctorData
      );
      message.success("Doctor updated successfully");
      setUserData(null);
      setSearchValue("");
      form.resetFields();
      fetchDoctors();
      setSearchPerformed(false);
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/Users/deleteUser/${userData._id}`
      );
      message.success("Doctor deleted successfully");
      setUserData(null);
      setIsDeleteModalVisible(false);
      setSearchValue("");
      form.resetFields();
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleCancel = () => {
    setSearchValue("");
    form.resetFields();
    fetchDoctors();
    setUserData(null);
    form.resetFields();
    setSearchPerformed(false);
  };

  return (
    <div className="text-Form">
      <h1>Manage Doctors</h1>
      <div className="input-container">
        <Select
          value={searchType}
          onChange={(value) => setSearchType(value)}
          className="search-type-select"
        >
          <Option value="username">Search by Username</Option>
          <Option value="name">Search by Name</Option>
        </Select>

        <Input
          className="search-input"
          placeholder="Enter username or ID to search"
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
      {userData && (
        <Form form={form} onFinish={handleUpdate}>
          <Form.Item name="username" label="Username" className="form-item">
            <Input disabled />
          </Form.Item>
          <Form.Item name="role" label="Role" className="form-item">
            <Select defaultValue={userData.role} style={{ width: "100%" }}>
              <Option value="doctor">Doctor</Option>
              <Option value="co-manager">Co-Manager</Option>
              <Option value="patient">Patient</Option>
            </Select>
          </Form.Item>
          <Form.Item name="names" label="Name" className="form-item">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" className="form-item">
            <Input />
          </Form.Item>
          <Form.Item className="form-item">
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button
              className="btnDelete"
              type="danger"
              onClick={() => setIsDeleteModalVisible(true)}
            >
              Delete
            </Button>
            <Button className="btnCancel" type="default" onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
      {userData ? null : (
        <div>
          <Divider />
          <div className="title-container">
            <div></div>
            <p>Total Doctors: {doctors.length}</p>
          </div>
          <div className="user-list-container">
            <div className="user-info-table">
              <div className="user-info-row">
                <span className="info-title-cell">Name</span>
                <span className="info-title-cell">Username</span>
                <span className="info-title-cell">Email</span>
                <span className="info-title-cell">Actions</span>
              </div>

              {doctors.map((doctor) => (
                <div key={doctor._id} className="user-info-row">
                  <div className="info-cell">{doctor.names}</div>
                  <div className="info-cell">{doctor.username}</div>
                  <div className="info-cell">{doctor.email}</div>
                  <div className="info-cell">
                    <Button
                      type="primary"
                      onClick={() => handleSearchUser(doctor)}
                    >
                      Update
                    </Button>
                    <Button
                      className="btnDelete"
                      type="danger"
                      onClick={() => showDeleteConfirmation(doctor)}
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
        className="add-doctor-button"
        type="primary"
        onClick={showAddDoctorForm}
      >
        Add Doctor
      </Button>
      <Modal
        title="Add Doctor"
        visible={isAddModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsAddModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} onFinish={handleAddDoctor}>
          <Form.Item
            name="names"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter the username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            initialValue="doctor"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select disabled>
              <Option value="doctor">Doctor</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Delete Doctor"
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this doctor?</p>
      </Modal>
    </div>
  );
}

export default PageDoctor;
