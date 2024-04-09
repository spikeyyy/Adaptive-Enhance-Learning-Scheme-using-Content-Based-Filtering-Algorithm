import { useEffect, useState } from "react";
import "../../css/featuredInfo.css";
import { ArrowUpwardRounded } from "@mui/icons-material";
import { AUTH_API_URL } from "../../../api/loginAuth";
import axios from "axios";
import { Link } from "react-router-dom";
const FeaturedInfo = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    axios
      .get(AUTH_API_URL + "/count_users")
      .then((response) => {
        const data = response.data;
        setAdminCount(data.number_of_admins);
        setStudentCount(data.number_of_students);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  return (
    <div className="featured">
      {/* <div className="featuredItem">
        <Link to="/adminList">
          <span className="featuredTitle">Admins</span>
          <div className="featuredUserCountContainer">
            <span className="featuredUserCount">{adminCount}</span>
            <span className="featuredUserRate">
              <ArrowUpwardRounded className="featuredIcon negative" />
            </span>
          </div>
          <div className="featuredSub">View Details</div>
        </Link>
      </div> */}
      <div className="featuredItem">
        <Link to="/studentList">
          <span className="featuredTitle">Students</span>
          <div className="featuredUserCountContainer">
            <span className="featuredUserCount">{studentCount}</span>
            <span className="featuredUserRate">
              <ArrowUpwardRounded className="featuredIcon" />
            </span>
          </div>
          <div className="featuredSub">View Details</div>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedInfo;
