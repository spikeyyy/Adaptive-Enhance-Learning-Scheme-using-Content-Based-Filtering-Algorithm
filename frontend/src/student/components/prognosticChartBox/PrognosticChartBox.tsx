import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import "../../scss/prognosticChartBox.scss";
import { data } from "../../../dummy/dummy";

const PrognosticChartBox = () => {
  return (
    <div className="prognosticChartBox">
      <span className="prognosticChartBoxTitle">Prognostic Exam</span>
      <div className="prognosticChart">
        <ResponsiveContainer width="99%" height={300}>
          <BarChart data={data}>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
              cursor={{ fill: "none" }}
            />
            <Bar dataKey="uv" fill="#00A9FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PrognosticChartBox;
