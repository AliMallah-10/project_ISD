import React from "react";
// import ReactDOM from "react-dom/client";
// import * as React from "react";
// import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Spinner from "./DataDashBoard/Spinner";
import ProtectedRoute from "./DataDashBoard/ProtectedRoute";
import PublicRoute from "./DataDashBoard/PublicRoute";
import AuthProvider from "./DataDashBoard/AuthProvider";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Appointment from "./pages/Appointment";
import ErrPage from "./pages/ErrPage";
import DoctorCards from "./pages/DoctorCards";
import DashboardsManager from "./pages/DashboardManager";
import DashboardsCoManager from "./pages/DashboardCoManager";
import DashboardsDoctor from "./pages/DashboardDoctor";
import PageDoctor from "./pages/PagesOfDashBoards/PageDoctor";
import PageAppointment from "./pages/PagesOfDashBoards/PageAppointment";
import PageCoManager from "./pages/PagesOfDashBoards/PageCoManager";
import PageSchedule from "./pages/PagesOfDashBoards/PageSchedule";
import PageUsers from "./pages/PagesOfDashBoards/PageUsers";
import DpageAppointment from "./pages/PagesOfDashBoards/DpageAppointment";
import DpageSchedule from "./pages/PagesOfDashBoards/DpageSchedule";
import DpageProfile from "./pages/PagesOfDashBoards/DpageProfile";
import MPageAppointment from "./pages/PagesOfDashBoards/MPageAppointment";
import MPageDoctor from "./pages/PagesOfDashBoards/MPageDoctor";
import MPageSchedule from "./pages/PagesOfDashBoards/MPageSchedule";
import MPageProfile from "./pages/PagesOfDashBoards/MPageProfile";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="service" element={<Service />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="appointment"
              element={
                <ProtectedRoute>
                  <Appointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="login"
              element={
                // <PublicRoute>
                <Login />
                // </PublicRoute>
              }
            />
            <Route
              path="register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            <Route path="doctors" element={<DoctorCards />} />
          </Route>
          <Route path="*" element={<ErrPage />} />

          <Route
            path="dashBoardManager"
            element={
              <ProtectedRoute>
                <DashboardsManager />
              </ProtectedRoute>
            }
          >
            <Route path="applyDoctor" element={<PageDoctor />} />
            <Route path="appoinymentEdits" element={<PageAppointment />} />
            <Route path="co-manager" element={<PageCoManager />} />
            <Route path="apply-schedule" element={<PageSchedule />} />
            <Route path="usersget" element={<PageUsers />} />
          </Route>
          <Route
            path="coManagerDashboard"
            element={
              <ProtectedRoute>
                <DashboardsCoManager />
              </ProtectedRoute>
            }
          >
            <Route path="MappoinymentEdits" element={<MPageAppointment />} />
            <Route path="Mapply-doctor" element={<MPageDoctor />} />
            <Route path="Mapply-Schedule" element={<MPageSchedule />} />
            <Route path="Mprofile" element={<MPageProfile />} />
          </Route>
          <Route
            path="doctorDashboard"
            element={
              <ProtectedRoute>
                <DashboardsDoctor />
              </ProtectedRoute>
            }
          >
            <Route path="appoinymentEditsDoc" element={<DpageAppointment />} />
            <Route path="apply-doctorDoc" element={<DpageSchedule />} />
            <Route path="profileDoc" element={<DpageProfile />} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
