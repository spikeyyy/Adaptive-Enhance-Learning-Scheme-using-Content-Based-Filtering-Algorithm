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
import TotalPersonalizedScoresStudent from "../components/totalPersonalizedScore/TotalPersonalizedScoresStudent";
import PersonalizedFreqOfErrors from "../components/personalizedFrequencyOfErrors/PersonalizedFreqOfErrors";
import PersonalizedScoresPerSuject from "../components/PersonalizedScoresPerCategory/PersonalizedScoresPerCategory";
import PersonalizedScoresPerCategory from "../components/PersonalizedScoresPerCategory/PersonalizedScoresPerCategory";

const HomePrognostic = () => {
  return (
    <div className="home">
      <FeaturedInfo />
      <TotalPersonalizedScoresStudent />
      {/* <Frequency /> */}
      <PersonalizedFreqOfErrors />
      <PersonalizedScoresPerSuject />
      <ContinouousAssesmentScores />
      <PersonalizedScoresPerCategory />
    </div>
  );
};

export default HomePrognostic;
