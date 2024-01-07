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
function PageUsers() {
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [form] = Form.useForm();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [userCount, setUserCount] = useState(0); // New state variable for count

  useEffect(() => {
    // Fetch all users when the component mounts
    fetchAllUsers();
  }, []);

  const handleSearchUser = (user) => {
    setUserData(user);
    form.setFieldsValue(user);
  };

  // Define the function to show the delete confirmation modal
  const showDeleteConfirmation = (user) => {
    setUserData(user);
    setIsDeleteModalVisible(true);
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

      if (user) {
        // Set the search results to the found user
        setSearchPerformed(true);
        // setAllUsers([user]);
        setUserData(user);
        form.setFieldsValue(user);
        // setNotFoundMessage(""); // Clear the not found message
      } else {
        // If the user is not found, reset the search results
        setAllUsers([]);
        setUserData(null);
        form.resetFields();
        setNotFoundMessage("User not found. Please try again.");
        setSearchPerformed(false);
      }
    } catch (error) {
      setNotFoundMessage("User not found. Please try again."); // Set the not found message
      console.error("Error searching for user:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/Users");
      const users = response.data.users;
      setAllUsers(users);
      setUserCount(users.length); // Update the user count
    } catch (error) {
      console.error("Error fetching all users:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedUserData = form.getFieldsValue();
      await axios.put(
        `http://localhost:3000/Users/updateUser/${userData._id}`,
        updatedUserData
      );
      message.success("User updated successfully");
      // Optionally, clear the form or reset the state
      setUserData(null);
      setSearchValue("");
      form.resetFields();
      fetchAllUsers(); // Refresh the list of users
      setSearchPerformed(false);
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/Users/deleteUser/${userData._id}`
      );
      message.success("User deleted successfully");
      setUserData(null);
      setIsDeleteModalVisible(false);
      setSearchValue("");
      form.resetFields();
      fetchAllUsers(); // Refresh the list of users
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error (e.g., show an error message)
    }
  };
  const handleCancel = () => {
    // Clear the searchValue and reset the form fields
    setSearchValue("");
    form.resetFields();
    fetchAllUsers();
    setUserData(null); // Clear the appointment data
    form.resetFields(); // Reset the form fields
    // Set searchPerformed to false
    setSearchPerformed(false);
  };

  return (
    <div className="text-Form">
      <h1>Manage Users</h1>
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
      {/* Display the not found message */}
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

        //style={{ width: "100%" }}
      )}
      {userData ? null : (
        <div>
          <div className="title-container">
            <div></div>
            <p>Total Users: {userCount}</p>
          </div>

          <div className="user-list-container">
            <div className="user-info-table">
              <div className="user-info-row">
                <div className="info-title-cell">Name</div>
                <div className="info-title-cell">Username</div>
                <div className="info-title-cell">Email</div>
                <div className="info-title-cell">Actions</div>
              </div>
              {allUsers.map((user) => (
                <div key={user._id} className="user-info-row">
                  <div className="info-cell">{user.names}</div>
                  <div className="info-cell">{user.username}</div>
                  <div className="info-cell">{user.email}</div>
                  <div className="info-cell">
                    <Button
                      type="primary"
                      onClick={() => handleSearchUser(user)}
                    >
                      Update
                    </Button>
                    <Button
                      className="btnDelete"
                      type="danger"
                      onClick={() => showDeleteConfirmation(user)}
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
        title="Delete User"
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
}

export default PageUsers;
