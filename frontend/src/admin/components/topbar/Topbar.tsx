import { useEffect, useState } from "react";
import { AUTH_API_URL } from "../../../api/loginAuth";
import logo from "../../../img/logo.png";
import pic from "../../../img/pic.jpg";
import "../../css/topbar.css";

const Topbar = () => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    fetch(AUTH_API_URL + "/admin_name")
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          throw new Error("Admin not found");
        }
      })
      .then((data) => {
        setAdminName(data.firstname);
      })
      .catch((error) => {
        console.error("Error fetching admin's name: ", error);
      });
  }, []);

  return (
    <div className="topbar">
      <div className="topBarWrapper">
        <div className="topLeft">
          <span className="logo">
            <img src={logo} alt="" style={{ width: "200px", height: "auto" }} />
          </span>
        </div>
        <div className="topRight">
          <img
            src={pic}
            alt=""
            className="topAvatar"
            style={{ width: "50px", height: "50px" }}
          />
          {/* <span className="adminName">{adminName}</span> */}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
