import "../../../scss/prognostic.scss";
import Prognostic_Questions from "./components/Prognostic_Questions";
import Prognostic_Questions_Tracker from "./components/Prognostic_Questions_Tracker";

const Prognostic = () => {
  return (
    <div className="prognosticBox">
      <div className="prognostic box2">
        <Prognostic_Questions />
      </div>
    </div>
  );
};

export default Prognostic;
