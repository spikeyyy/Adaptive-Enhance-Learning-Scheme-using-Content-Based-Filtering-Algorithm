import { Routes, Route } from "react-router-dom";
import Login from "../components/login/Login";
import Student from "../student/student";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import Admin from "../admin/admin";
import Missing from "../components/error/Missing";
import Home from "../admin/pages/Home";
import StudentHome from "../student/pages/Home";
import StudentList from "../admin/pages/studentList/StudentList";
import AdminList from "../admin/pages/adminList/AdminList";
import EditUser from "../admin/pages/editUser/editUser";
import Prognostic from "../student/pages/exams/prognostic/Prognostic";
import Diagnostic from "../student/pages/exams/diagnostic/Diagnostic";
import Register from "../components/register/Register";
import HomePrognostic from "../admin/pages/HomePrognostic";

const AppRoutes = () => {
  return (
    <Routes>
      {/*public routes, anyone can access this page */}
      <Route element={<Login />} path="/*" />
      <Route element={<Register />} path="/register" />
      <Route element={<Missing />} path="*" />

      {/*admin page */}

      <Route element={<Admin />}>
        <Route element={<Home />} path="/admin" />
        <Route element={<HomePrognostic />} path="/homePrognostic" />
        <Route element={<AdminList />} path="/adminList" />
        <Route element={<EditUser />} path="/adminList/:adminListId" />
        <Route element={<StudentList />} path="/studentList" />
        {/* <Route element={<StudentReport />} path="/student-report" /> */}
      </Route>

      {/*student page */}
      <Route element={<Student />}>
        <Route element={<StudentHome />} path="/student" />
        <Route element={<Prognostic />} path="/prognostic" />
        <Route element={<Diagnostic />} path="/diagnostic" />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
