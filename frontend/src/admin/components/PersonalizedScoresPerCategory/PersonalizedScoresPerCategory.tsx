import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";
import "../../css/widgetLg.css";
import { AUTH_API_URL } from "../../../api/loginAuth";

const PersonalizedScoresPerCategory = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${AUTH_API_URL}/total_personalized_plan_scores`
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
      <span className="widgetLgTitle">
        Personalized Total Scores per Subject
      </span>
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
          >
            <LabelList
              dataKey="total_fundamentals_programming_score"
              position="top"
            />
          </Bar>
          <Bar
            dataKey="total_data_structure_algorithm_score"
            fill="#82ca9d"
            name="Data Structure Algorithm"
          >
            <LabelList
              dataKey="total_data_structure_algorithm_score"
              position="top"
            />
          </Bar>
          <Bar
            dataKey="total_computer_hardware_score"
            fill="#ffc658"
            name="Computer Hardware"
          >
            <LabelList dataKey="total_computer_hardware_score" position="top" />
          </Bar>
          <Bar
            dataKey="total_networking_score"
            fill="#d0ed57"
            name="Networking"
          >
            <LabelList dataKey="total_networking_score" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PersonalizedScoresPerCategory;
