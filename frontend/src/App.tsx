import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import MainRoutes from "./routes/Routes";

const App: React.FC = () => {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <MainRoutes />
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
