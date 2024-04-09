import React from "react";
import "../css/home.css";
import FeaturedInfo from "../components/widgets/FeaturedInfo";
import Charts from "../components/charts/Charts";
import WidgetSm from "../components/widgetSm/WidgetSm";
import WidgetLg from "../components/widgetLg/WidgetLg";
import Frequency from "../components/frequencyChart/Frequency";
import ItemAnalysis from "../components/continuousAssessment/ContinuousAssessment";
import Result from "../components/result/Result";
import ContinouousAssesmentScores from "../components/continuousAssessment/ContinuousAssessment";
import ContinuousScores from "../components/ContinuousScores/ContinuousScores";
import ContinuousFrequencyOfErrors from "../components/ContinuousFrequencyOfErrors/ContinuousFrequencyOfErrors";
import DiagnosticTotal from "../components/diagnosticTotal/DiagnosticTotal";

const Home = () => {
  return (
    <div className="home">
      <FeaturedInfo />
      <DiagnosticTotal />
      <Charts />
      {/* <Frequency /> */}
      <WidgetLg />
      <Result />
      <ContinouousAssesmentScores />
      <ContinuousScores />
      <ContinuousFrequencyOfErrors />
    </div>
  );
};

export default Home;
