import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  LabelList,
} from "recharts";
import axios from "axios";
import "../../css/charts.css";
import { AUTH_API_URL } from "../../../api/loginAuth";

interface StudentScore {
  student_id: number;
  total_score: number;
}

const TotalPersonalizedScoresStudent = () => {
  const [studentScores, setStudentScores] = useState<StudentScore[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get<StudentScore[]>(
          `${AUTH_API_URL}/total_personalized_scores`
        );
        setStudentScores(response.data);
      } catch (error) {
        console.error("Error fetching student scores:", error);
      }
    };

    fetchScores();
  }, []);

  const data = studentScores.map((item) => ({
    name: `${item.student_id}`,
    "Total Score": item.total_score,
  }));

  return (
    <div className="chart">
      <span className="chartTitle">Personalized Total Score</span>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <BarChart width={150} height={40} data={data}>
          <XAxis dataKey="name" />
          <Bar dataKey="Total Score" fill="#8884d8">
            {/* Add LabelList here */}
            <LabelList dataKey="Total Score" position="top" />
          </Bar>
          <Tooltip />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalPersonalizedScoresStudent;
