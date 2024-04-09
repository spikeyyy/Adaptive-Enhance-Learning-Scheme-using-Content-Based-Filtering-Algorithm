import { ResponsiveContainer, BarChart, Bar, Tooltip } from "recharts";
import { data } from "../../../dummy/dummy";
import "../../scss/barChartBox.scss";

const BarChartBox = () => {
  return (
    <div className="barChartBox">
      <span className="barChartBoxTitle">Item Analysis</span>
      <div className="barChart">
        <ResponsiveContainer width="100%" height={110}>
          <BarChart data={data}>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey="uv" fill="#00A9FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
