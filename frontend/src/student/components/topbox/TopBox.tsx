import React, { useEffect, useState } from "react";
import "../../scss/topbox.scss"; // Import your CSS for styling
import { Link } from "react-router-dom";
import { AUTH_API_URL } from "../../../api/loginAuth";

// Horizontal Profile component
const TopBox = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
  });

  useEffect(() => {
    fetch(AUTH_API_URL + "/students_name")
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        } else {
          throw new Error("Student not found");
        }
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching student's name", error);
      });
  }, []);

  return (
    <div className="horizontal-profile">
      <div className="profile-picture">
        <img
          src="https://scontent.fmnl17-2.fna.fbcdn.net/v/t39.30808-6/419654266_2286775524846673_3533614623869205871_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=bd92f5&_nc_eui2=AeEmBGrz3zeOu-NLQW2Hbspowp7dYthyVZTCnt1i2HJVlC9akJYd7yOqKPR3OwHwen78ZVe6ZCRx_Tk3_E_TZRdX&_nc_ohc=Hy-HVG26nKoAX-vCqOZ&_nc_ht=scontent.fmnl17-2.fna&oh=00_AfBhkLP1scTbXGZs34LY9s8pFPgDZ8ZK9_60vtkXKWSY9g&oe=65B7C6DE"
          alt=""
        />
      </div>
      <div className="profile-details">
        <h2>
          {userData.firstname} {userData.lastname}
        </h2>
        <p>{userData.username}</p>
        <Link to="/student">
          <button className="view-details-button">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default TopBox;
