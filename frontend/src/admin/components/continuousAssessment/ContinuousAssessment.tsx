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

interface ScoreItem {
  student_id: number;
  final_fundamentals_programming_score: number;
  final_data_structure_algorithm_score: number;
  final_computer_hardware_score: number;
  final_networking_score: number;
}

interface ChartDataItem {
  name: string;
  fundamentals_programming_score: number;
  data_structure_algorithm_score: number;
  computer_hardware_score: number;
  networking_score: number;
}

const ContinuousAssessment = () => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  useEffect(() => {
    // Replace with your Flask endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get<ScoreItem[]>(
          `${AUTH_API_URL}/total_scores_by_category_per_student`
        );
        const formattedData: ChartDataItem[] = response.data.map(
          (item: ScoreItem) => ({
            name: `Student ${item.student_id}`,
            fundamentals_programming_score:
              item.final_fundamentals_programming_score,
            data_structure_algorithm_score:
              item.final_data_structure_algorithm_score,
            computer_hardware_score: item.final_computer_hardware_score,
            networking_score: item.final_networking_score,
          })
        );
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="widgetLg">
      <span className="widgetLgTitle">Continuous Assessment Scores</span>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="fundamentals_programming_score" fill="#8884d8" />
          <Bar dataKey="data_structure_algorithm_score" fill="#82ca9d" />
          <Bar dataKey="computer_hardware_score" fill="#84c2d8" />
          <Bar dataKey="networking_score" fill="#d88488" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContinuousAssessment;
