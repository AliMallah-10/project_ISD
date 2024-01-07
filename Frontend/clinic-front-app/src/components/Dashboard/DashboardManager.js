import React from "react";
import "./dashboardManager.css";
import { ManagerDashboard } from "../../DataDashBoard/dataDashB";
import { Link, Outlet } from "react-router-dom";
import { message } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "../../DataDashBoard/UserSlice";

function DashboardManager() {
  const user = useSelector(selectUser);
  const userlogin = user && <p>{user.username}</p>;
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
            {ManagerDashboard.map((menu) => {
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
              <p>Manager DashBoard</p>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-contact">
              <i class="fa-sharp fa-solid fa-bell"> </i>
              {/* {user && <p>{user.username}</p>}
               */}
              {userlogin}
            </div>
          </div>

          <div className="body">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardManager;
