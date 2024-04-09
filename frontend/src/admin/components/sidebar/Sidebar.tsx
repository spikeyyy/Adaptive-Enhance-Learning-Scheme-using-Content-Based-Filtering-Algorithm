import { Link } from "react-router-dom";
import "../../css/sidebar.css";
import {
  HomeRounded,
  DarkModeRounded,
  LogoutRounded,
  PeopleRounded,
  AssessmentRounded,
  MessageRounded,
  NotificationsRounded,
  SchoolRounded,
  UploadFileRounded,
  UploadRounded,
} from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuth } from "../../../utils/AuthContext";
import { useState } from "react";
import { AUTH_API_URL } from "../../../api/loginAuth";

export default function Sidebar() {
  const { logoutUser } = useAuth();
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      // Create a FormData object to build a multipart/form-data request
      const formData = new FormData();
      // Append the file to the formData object
      // The 'file' in append() must match the name expected on the server side
      formData.append("file", file);

      // Perform the fetch request to upload the file to your Flask endpoint
      fetch(AUTH_API_URL + "/upload_questions", {
        // Update this URL to match your Flask server's host and port
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          // Handle success response, possibly updating the UI to indicate the upload was successful
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors here, such as by showing an error message to the user
        });
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li
              className={`sidebarListItem ${
                location.pathname === "/admin" ? "active" : ""
              }`}
            >
              <Link to="/admin" onClick={() => handleLinkClick("/admin")}>
                <HomeRounded className="sidebarIcon" />
                Continuous Assessment
              </Link>
            </li>
            <li
              className={`sidebarListItem ${
                location.pathname === "/homePrognostic" ? "active" : ""
              }`}
            >
              <Link
                to="/homePrognostic"
                onClick={() => handleLinkClick("/prognosticComponent")}
              >
                <HomeRounded className="sidebarIcon" />
                Personalized Learning
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Admin of list</h3>
          <ul className="sidebarList">
            <li
              className={`sidebarListItem ${
                location.pathname === "/adminList" ? "active" : ""
              }`}
            >
              <Link
                to="/adminList"
                onClick={() => handleLinkClick("/adminList")}
              >
                {" "}
                <PeopleRounded className="sidebarIcon" />
                Admins
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Student list</h3>
          <ul className="sidebarList">
            <li
              className={`sidebarListItem ${
                location.pathname === "/studentList" ? "active" : ""
              }`}
            >
              <Link
                to="/studentList"
                onClick={() => handleLinkClick("/studentList")}
              >
                {" "}
                <SchoolRounded className="sidebarIcon" />
                Students
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Settings</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              {/* Hide the default input and trigger it via an icon or button */}
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
              <label htmlFor="fileInput">
                <UploadRounded className="sidebarIcon" />
                Import Questions
              </label>
            </li>
            <li className="sidebarListItem" onClick={logoutUser}>
              <Link to="/logout">
                {" "}
                <LogoutRounded className="sidebarIcon" />
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
