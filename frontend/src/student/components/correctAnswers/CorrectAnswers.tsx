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
    fetch(AUTH_API_URL + "/total_correct_answers")
      .then((response) => response.json())
      .then((correctData) => {
        fetch(AUTH_API_URL + "/total_error_count")
          .then((response) => response.json())
          .then((errorData) => {
            const formattedData: SubjectDataItem[] = [
              {
                name: "Correct Answers",
                value: correctData.total_correct_answers,
                color: "#8884d8",
              },
              {
                name: "Incorrect Answers",
                value: errorData.total_error_count,
                color: "#FF8042",
              },
            ];
            setSubjectData(formattedData);
          })
          .catch((error) =>
            console.error("Error fetching total error count: ", error)
          );
      })
      .catch((error) =>
        console.error("Error fetching total correct answers: ", error)
      );
  }, []);

  return (
    <div className="pieChartBox">
      <span className="pieChartTitle">Scores</span>
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
