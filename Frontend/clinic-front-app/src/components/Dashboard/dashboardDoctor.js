import React from "react";
import "./dashboardManager.css";
import { DoctorMenu } from "../../DataDashBoard/dataDashB";
import { Link } from "react-router-dom";
import { message } from "antd";

import { useSelector } from "react-redux";
import { selectUser } from "../../DataDashBoard/UserSlice";

function DashboardDoctor() {
  const user = useSelector(selectUser);
  const handlerLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
  };

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>Clinic Logo</h6>
            <hr />
          </div>
          <div className="menu">
            {DoctorMenu.map((menu) => {
              return (
                <>
                  <div key={menu.id} className="menu-item">
                    <i className={menu.icon}></i>
                    <Link className="link" to={menu.path}>
                      {menu.name}
                    </Link>
                  </div>
                </>
              );
            })}
            <div className="menu-item" onClick={handlerLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link className="link" to="/login">
                Logout
              </Link>
            </div>
            <div className="dash">
              <i class="fa-solid fa-gauge"></i>
              <p>Doctor DashBoard</p>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-contact">
              <i class="fa-sharp fa-solid fa-bell"> </i>
              {user && <p>{user.username}</p>}
            </div>
          </div>

          <div className="body"></div>
        </div>
      </div>
    </div>
  );
}

export default DashboardDoctor;
