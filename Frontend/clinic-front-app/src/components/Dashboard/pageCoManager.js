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

function PageCoManager() {
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState(null);
  const [coManagers, setCoManagers] = useState([]); // Only co-managers
  const [form] = Form.useForm();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [coManagerCount, setCoManagerCount] = useState(0); // New state variable for count

  useEffect(() => {
    // Fetch all co-managers when the component mounts
    fetchCoManagers();
  }, []);

  const handleSearchUser = (coManager) => {
    setUserData(coManager);
    form.setFieldsValue(coManager);
  };

  // Define the function to show the delete confirmation modal
  const showDeleteConfirmation = (coManager) => {
    setUserData(coManager);
    setIsDeleteModalVisible(true);
  };
  const showAddCoManagerForm = () => {
    setIsAddModalVisible(true);
  };
  const handleAddCoManager = async (values) => {
    try {
      // Send a POST request to your server to add a co-manager
      await axios.post("http://localhost:3000/Users/register", values);
      message.success("Co-Manager added successfully");
      setIsAddModalVisible(false);
      form.resetFields();
      fetchCoManagers(); // Refresh the list of co-managers
    } catch (error) {
      console.error("Error adding co-manager:", error);
      message.error("Failed to add Co-Manager");
    }
  };

  const handleSearch = async () => {
    try {
      let response;

      // Check if the searchValue appears to be an ID or a username
      if (/^[0-9a-fA-F]{24}$/.test(searchValue)) {
        // If it matches a valid ID format (24 characters), search by ID
        response = await axios.get(
          `http://localhost:3000/Users/user/${searchValue}`
        );
      } else {
        // Otherwise, search by username
        response = await axios.get(
          `http://localhost:3000/Users/username/${searchValue}`
        );
      }

      const user = response.data.user;

      if (user && user.role === "co-manager") {
        // Display only co-managers
        setCoManagers([user]);
        setUserData(user);
        form.setFieldsValue(user);
        setNotFoundMessage(""); // Clear the not found message
        // Set searchPerformed to true when a search is performed
        setSearchPerformed(true);
      } else {
        // If the user is not found or is not a co-manager, reset the search results
        setCoManagers([]);
        setUserData(null);
        form.resetFields();
        setNotFoundMessage("Co-Manager not found. Please try again.");
        // Set searchPerformed to false when no results are found
        setSearchPerformed(false);
      }
    } catch (error) {
      setNotFoundMessage("Co-Manager not found. Please try again."); // Set the not found message
      console.error("Error searching for co-manager:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const fetchCoManagers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Users");
      const coManagersData = response.data.users.filter(
        (user) => user.role === "co-manager"
      );
      setCoManagers(coManagersData);
      setCoManagerCount(coManagersData.length); // Update the count
    } catch (error) {
      console.error("Error fetching co-managers:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedCoManagerData = form.getFieldsValue();
      await axios.put(
        `http://localhost:3000/Users/updateUser/${userData._id}`,
        updatedCoManagerData
      );
      message.success("Co-Manager updated successfully");
      // Optionally, clear the form or reset the state
      setUserData(null);
      setSearchValue("");
      form.resetFields();
      fetchCoManagers(); // Refresh the list of co-managers
      // Set searchPerformed to false when the update is complete
      setSearchPerformed(false);
    } catch (error) {
      console.error("Error updating co-manager:", error);
      // Handle error (e.g., show an error message)
    }
  };
  const handleCancel = () => {
    // Clear the searchValue and reset the form fields
    setSearchValue("");
    form.resetFields();
    fetchCoManagers();
    setUserData(null); // Clear the appointment data
    form.resetFields(); // Reset the form fields
    // Set searchPerformed to false
    setSearchPerformed(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/Users/deleteUser/${userData._id}`
      );
      message.success("Co-Manager deleted successfully");
      setUserData(null);
      setIsDeleteModalVisible(false);
      setSearchValue("");
      form.resetFields();
      fetchCoManagers(); // Refresh the list of co-managers
    } catch (error) {
      console.error("Error deleting co-manager:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="text-Form">
      <h1>Manage Co-Managers</h1>
      <div className="input-container">
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
      )}{" "}
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
            <p>Total Co-Managers: {coManagers.length}</p>
          </div>
          <div className="user-list-container">
            <div className="user-info-table">
              <div className="user-info-row">
                <span className="info-title-cell">Name</span>
                <span className="info-title-cell">Username</span>
                <span className="info-title-cell">Email</span>
                <span className="info-title-cell">Actions</span>
              </div>

              {coManagers.map((coManager) => (
                <div key={coManager._id} className="user-info-row">
                  <div className="info-cell">{coManager.names}</div>
                  <div className="info-cell">{coManager.username}</div>
                  <div className="info-cell">{coManager.email}</div>
                  <div className="info-cell">
                    <Button
                      type="primary"
                      onClick={() => handleSearchUser(coManager)}
                    >
                      Update
                    </Button>
                    <Button
                      className="btnDelete"
                      type="danger"
                      onClick={() => showDeleteConfirmation(coManager)}
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
        className="add-co-manager-button"
        type="primary"
        onClick={showAddCoManagerForm}
      >
        Add Co-Manager
      </Button>
      <Modal
        title="Add Co-Manager"
        visible={isAddModalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsAddModalVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} onFinish={handleAddCoManager}>
          {/* Form fields for adding a co-manager */}
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
            initialValue="co-manager"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select disabled>
              <Option value="co-manager">Co-Manager</Option>
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
        title="Delete Co-Manager"
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this co-manager?</p>
      </Modal>
    </div>
  );
}

export default PageCoManager;
