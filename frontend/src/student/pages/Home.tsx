import BarChartBox from "../components/barChartBox/BarChartBox";
import ChartBox from "../components/loginCounterBox/ChartBox";
import TopBox from "../components/topbox/TopBox";
import PieChartBox from "../components/questionPerSubject/PieChartBox";
import "../scss/home.scss";
import DiagnosticChartBox from "../components/diagnosticChartBox/DiagnosticChartBox";
import PrognosticChartBox from "../components/prognosticChartBox/PrognosticChartBox";
import TinyChartBox from "../components/tinyChartBox/TinyChartBox";
import CorrectAnswers from "../components/correctAnswers/CorrectAnswers";
import { useEffect, useState } from "react";
import axios from "axios";
import { AUTH_API_URL } from "../../api/loginAuth";
import Diagnostic from "./exams/diagnostic/Diagnostic";

const StudentHome = () => {
  return (
    <div className="homeBox">
      <div className="box box2">
        <Diagnostic />
      </div>
      {/* <div className="box box3">
        <PieChartBox />
      </div>
      <div className="box box3">
        <CorrectAnswers />
      </div>
      <div className="box box4">
        <BarChartBox />
      </div>
      <div className="box box5">
        <TinyChartBox />
      </div>

      <div className="box box8">
        <DiagnosticChartBox />
      </div>
      <div className="box box8">
        <PrognosticChartBox />
      </div> */}
    </div>
  );
};

export default StudentHome;
