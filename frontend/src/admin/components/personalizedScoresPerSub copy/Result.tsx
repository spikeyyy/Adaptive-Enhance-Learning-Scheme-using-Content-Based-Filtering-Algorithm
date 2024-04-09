import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";
import "../../css/widgetLg.css";
import { AUTH_API_URL } from "../../../api/loginAuth";

const Result = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${AUTH_API_URL}/category_scores_per_student`
        );
        if (response.data) {
          setChartData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="widgetLg">
      <span className="widgetLgTitle">Diagnostic Scores per subject</span>
      <ResponsiveContainer width="100%" aspect={5 / 2}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="student_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="total_fundamentals_programming_score"
            fill="#8884d8"
            name="Fundamentals Programming"
          />
          <Bar
            dataKey="total_data_structure_algorithm_score"
            fill="#82ca9d"
            name="Data Structure Algorithm"
          />
          <Bar
            dataKey="total_computer_hardware_score"
            fill="#ffc658"
            name="Computer Hardware"
          />
          <Bar
            dataKey="total_networking_score"
            fill="#d0ed57"
            name="Networking"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Result;
