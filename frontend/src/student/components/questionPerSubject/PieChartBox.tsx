import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import "../../scss/pieChartBox.scss";
import { AUTH_API_URL } from "../../../api/loginAuth";

interface SubjectDataItem {
  name: string;
  value: number;
  color: string;
}

const PieChartBox = () => {
  const [subjectData, setSubjectData] = useState<SubjectDataItem[]>([]);

  useEffect(() => {
    fetch(AUTH_API_URL + "/get_error_counts?student_id=1")
      .then((response) => response.json())
      .then((data) => {
        const formattedData: SubjectDataItem[] = [
          {
            name: "DS and Algorithm",
            value: data.data_structure_algorithm_error,
            color: "#0088FE",
          },
          {
            name: "Basic Programming",
            value: data.fundamentals_programming_error,
            color: "#00C49F",
          },
          {
            name: "Hardware",
            value: data.computer_hardware_error,
            color: "#FFBB28",
          },
          {
            name: "Networking",
            value: data.networking_error,
            color: "#FF8042",
          },
        ];
        setSubjectData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        // Handle the error appropriately in your application
      });
  }, []);

  return (
    <div className="pieChartBox">
      <span className="pieChartTitle">Frequency of Errors</span>
      <div className="pieChart">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={subjectData}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {subjectData.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="subjectOptions">
          {subjectData.map((item) => (
            <div className="option" key={item.name}>
              <div className="title">
                <div className="dot" style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
              </div>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartBox;
