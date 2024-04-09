import { Link, useLocation } from "react-router-dom";
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
} from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuth } from "../../../utils/AuthContext";
import { useState } from "react";

export default function Sidebar() {
  const { logoutUser } = useAuth();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Diagnostic</h3>
          <ul className="sidebarList">
            <li
              className={`sidebarListItem ${
                location.pathname === "/student" ? "active" : ""
              }`}
            >
              <Link to="/student" onClick={() => handleLinkClick("/student")}>
                <HomeRounded className="sidebarIcon" />
                Diagnostic Exam
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Prognostic</h3>
          <ul className="sidebarList">
            {/* <li
              className={`sidebarListItem ${
                location.pathname === "/diagnostic" ? "active" : ""
              }`}
            >
              <Link
                to="/diagnostic"
                onClick={() => handleLinkClick("/diagnostic")}
              >
                <PeopleRounded className="sidebarIcon" />
                Diagnostic
              </Link>
            </li> */}
            <li
              className={`sidebarListItem ${
                location.pathname === "/prognostic" ? "active" : ""
              }`}
            >
              <Link
                to="/prognostic"
                onClick={() => handleLinkClick("/prognostic")}
              >
                <AssessmentRounded className="sidebarIcon" />
                Prognostic Exam
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Settings</h3>
          <ul className="sidebarList">
            {/* <li
              className={`sidebarListItem ${
                location.pathname === "/theme" ? "active" : ""
              }`}
            >
              <Link to="/theme" onClick={() => handleLinkClick("/theme")}>
                <DarkModeRounded className="sidebarIcon" />
                Theme
              </Link>
            </li> */}

            <li className="sidebarListItem" onClick={logoutUser}>
              <Link to="/logout" onClick={() => handleLinkClick("/logout")}>
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
