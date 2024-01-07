import React, { useState } from "react";
import "./RegiserStyles.css";
import { Form, Input, message, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../DataDashBoard/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onfinishHandler = async () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    try {
      dispatch(showLoading());
      const res = await axios.post("http://localhost:3000/Users/register", {
        username,
        password,
        names,
        email,
        role: "patient",
      });
      dispatch(hideLoading());
      if (res.status === 201) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message, "Register Error!");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong Or Same Email Or Username");
    }
  };
  return (
    <>
      <div className="form-container ">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
          <h3 className="text-center text-sign">Register From</h3>

          <Form.Item label="Name" name="names">
            <Input
              type="text"
              required
              onChange={(e) => setNames(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Username" name="username">
            <Input
              type="text"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Confirm Password" name="confirmPassword">
            <Input.Password
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>

          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          <a href="#" onClick={() => navigate("/login")} className="m-2">
            Already user login here
          </a>

          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
