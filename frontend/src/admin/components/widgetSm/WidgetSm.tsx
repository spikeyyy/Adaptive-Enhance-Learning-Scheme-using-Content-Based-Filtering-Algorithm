import { Visibility } from "@mui/icons-material";
import "../../css/widgetSm.css";
import { useEffect, useState } from "react";
import { AUTH_API_URL } from "../../../api/loginAuth";
import axios from "axios";

interface UserData {
  username: String;
  name: String;
}

const WidgetSm = () => {
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    axios
      .get(AUTH_API_URL + "/get_users")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Registered Student</span>
      <ul className="widgetSmlist">
        {userData.map((user, index) => (
          <li className="widgetSmListItem" key={index}>
            <img
              src="https://assetsio.reedpopcdn.com/Luffy-Gear-5-eyes-and-smiling.jpg?width=1200&height=900&fit=crop&quality=100&format=png&enable=upscale&auto=webp"
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.name}</span>
              <span className="widgetSmUserTitle">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSm;
