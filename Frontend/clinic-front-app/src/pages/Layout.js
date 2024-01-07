import React from "react";

import Navbar from "../components/Navbar/Navbar.js";
import Footer from "../components/Footer/Footer";
import TopBar from "../components/TopBar/Topbar";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <TopBar />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
