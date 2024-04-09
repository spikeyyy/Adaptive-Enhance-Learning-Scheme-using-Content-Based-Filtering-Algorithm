import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface AuthContext {
  auth: boolean;
}

const ProtectedRoutes = () => {
  const { auth } = useAuth() as AuthContext;
  return auth ? <Outlet /> : <Navigate to="/" />;

  // const { auth } = useAuth() as AuthContext;
  // return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
