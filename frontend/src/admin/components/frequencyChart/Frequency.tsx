import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import axios from "axios";
import "../../css/charts.css";
import { AUTH_API_URL } from "../../../api/loginAuth";

interface StudentErrorCount {
  student_id: number;
  total_error_count: number;
}

const Charts = () => {
  const [studentErrorCounts, setStudentErrorCounts] = useState<
    StudentErrorCount[]
  >([]);

  useEffect(() => {
    const fetchErrorCounts = async () => {
      try {
        const response = await axios.get<StudentErrorCount[]>(
          `${AUTH_API_URL}/fetch_total_error_count_per_student`
        );
        setStudentErrorCounts(response.data);
      } catch (error) {
        console.error("Error fetching student error counts:", error);
      }
    };

    fetchErrorCounts();
  }, []);

  const data = studentErrorCounts.map((item) => ({
    name: `Student ${item.student_id}`,
    "Total Errors": item.total_error_count,
  }));

  return (
    <div className="chart">
      <span className="chartTitle">Total Frequency of Errors</span>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <BarChart width={150} height={40} data={data}>
          <XAxis dataKey="name" />
          <Bar dataKey="Total Errors" fill="#8884d8" />
          <Tooltip />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
