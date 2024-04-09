import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./css/admin.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import StudentList from "./pages/studentList/StudentList";
import AdminList from "./pages/adminList/AdminList";
import EditUser from "./pages/editUser/editUser";
import StudentReport from "./pages/studentReport/StudentReport";
import HomePrognostic from "./pages/HomePrognostic";

const Admin = () => {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route element={<Home />} path="/admin" />
          <Route element={<HomePrognostic />} path="/homePrognostic" />
          <Route element={<AdminList />} path="/adminList" />
          <Route element={<EditUser />} path="/adminList/:adminListId" />
          <Route element={<StudentList />} path="/studentList" />
          <Route element={<StudentList />} path="/studentList" />
          {/* <Route element={<StudentReport />} path="/student-report" /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
