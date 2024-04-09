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

interface StudentErrorData {
  student_id: number;
  fundamentals_programming_error: number;
  data_structure_algorithm_error: number;
  computer_hardware_error: number;
  networking_error: number;
  total_errors: number; // Added this line for the total errors
}

const ContinuousFrequencyOfErrors = () => {
  const [studentErrorData, setStudentErrorData] = useState<StudentErrorData[]>(
    []
  );

  useEffect(() => {
    const fetchErrorData = async () => {
      try {
        const response = await axios.get<StudentErrorData[]>(
          `${AUTH_API_URL}/continuous_frequency_of_error`
        );
        setStudentErrorData(response.data);
      } catch (error) {
        console.error("Error fetching student error data:", error);
      }
    };

    fetchErrorData();
  }, []);

  return (
    <div className="widgetLg">
      <span className="widgetLgTitle">
        Continuous Frequency of Errors per Subject
      </span>
      <ResponsiveContainer width="100%" aspect={5 / 2}>
        <BarChart data={studentErrorData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="student_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="fundamentals_programming_error"
            fill="#8884d8"
            name="Fundamentals Programming"
          />
          <Bar
            dataKey="data_structure_algorithm_error"
            fill="#82ca9d"
            name="Data Structure Algorithm"
          />
          <Bar
            dataKey="computer_hardware_error"
            fill="#ffc658"
            name="Computer Hardware"
          />
          <Bar dataKey="networking_error" fill="#d0ed57" name="Networking" />
          <Bar dataKey="total_errors" fill="#ff6f61" name="Total Errors" />{" "}
          {/* Added this line for the total errors bar */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContinuousFrequencyOfErrors;
