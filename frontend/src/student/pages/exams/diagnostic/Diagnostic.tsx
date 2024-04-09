import "../../../scss/diagnostic.scss";

import Diagnostic_Questions from "./components/Diagnostic_Questions";
import Diagnostic_Questions_Tracker from "./components/Diagnostic_Questions_Tracker";

const Diagnostic = () => {
  return (
    <div className="diagnosticBox">
      <div className="diagnostic box2">
        {/* dito ko irerender 'yung set of questions and its answers */}
        <Diagnostic_Questions />
      </div>
    </div>
  );
};

export default Diagnostic;
