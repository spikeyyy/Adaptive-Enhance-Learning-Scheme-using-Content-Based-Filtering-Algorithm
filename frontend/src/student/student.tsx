import React from "react";
import { Route, Routes } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import StudentHome from "./pages/Home";
import Prognostic from "./pages/exams/prognostic/Prognostic";
import Diagnostic from "./pages/exams/diagnostic/Diagnostic";

const Student = () => {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route element={<StudentHome />} path="/student" />
          <Route element={<Prognostic />} path="/prognostic" />
          <Route element={<Diagnostic />} path="/diagnostic" />
        </Routes>
      </div>
    </div>
  );
};

export default Student;
