import { useEffect, useState } from "react";
import { LoginRounded } from "@mui/icons-material";
import "../../scss/chartBox.scss";
import { Link } from "react-router-dom";
import { ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";
import { data } from "../../../dummy/dummy";
import { AUTH_API_URL } from "../../../api/loginAuth";

const ChartBox = () => {
  const [loginCount, setLoginCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    fetch(AUTH_API_URL + "/login_counter")
      .then((response) => response.json())
      .then((data) => setLoginCount(data.loginCounter))
      .catch((error) => console.error("Error fetching login count:", error));
  }, []);

  useEffect(() => {
    if (totalUsers > 0) {
      const percentage = (loginCount / totalUsers) * 100;
      setPercentage(percentage);
    }
  }, [loginCount, totalUsers]);

  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <LoginRounded />
          <span className="boxTitle">Login Counter</span>
        </div>
        <span className="boxTotal">{loginCount}</span>
        <Link to="/student">View details</Link>
      </div>
      <div className="chartInfo">
        <div className="charts">
          <ResponsiveContainer width="100%" height="70%">
            <LineChart data={data}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 110 }}
              />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span className="percentage">{percentage}%</span>
          <span className="duratin">this day</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
