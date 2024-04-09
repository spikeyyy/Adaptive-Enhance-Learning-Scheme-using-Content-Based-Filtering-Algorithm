import "../../scss/tinyChartBox.scss";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { data } from "../../../dummy/dummy";

const TinyChartBox = () => {
  return (
    <div className="tinyChartBox">
      <div className="tinyChartBoxTitle">Level of Progress every day</div>
      <div className="tinyChart">
        <ResponsiveContainer width="100%" height={130}>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* <XAxis dataKey="name" /> */}
            {/* <YAxis /> */}
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#B15EFF"
              fill="#B15EFF"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TinyChartBox;
