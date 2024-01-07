import React, { useState } from "react";
import "./RegiserStyles.css";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../DataDashBoard/alertSlice";
import { setUser } from "../../DataDashBoard/UserSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  //form handler
  const onfinishHandler = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post("http://localhost:3000/Users/login", {
        username,
        password,
      });
      dispatch(hideLoading());

      if (res.status === 200) {
        dispatch(setUser(res.data));
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        const userRole = res.data.role;
        if (userRole === "manager") {
          navigate("/dashBoardManager");
        } else if (userRole === "co-manager") {
          navigate("/coManagerDashboard");
        } else if (userRole === "doctor") {
          navigate("/doctorDashboard");
        } else if (userRole === "patient") {
          navigate("/");
        }
        message.success("Login Successfully");

        // navigate("/dashBoardManager");
      } else {
        if (res.status === 401 && res.data.message === "Invalid Password") {
          setLoginError("Invalid Password");
        } else {
          setLoginError("Something went wrong or Username not found");
        }
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong.Check the Username Or Password");
    }
  };
  return (
    <div className="form-container ">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register-form login-form"
      >
        <h3 className="text-center text-sign">Login From</h3>

        <Form.Item label="Username" name="username">
          <Input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}

        <a href="#" className="m-2" onClick={() => navigate("/register")}>
          Not a user Register here
        </a>

        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
