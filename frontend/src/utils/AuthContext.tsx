import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AUTH_API_URL } from "../api/loginAuth";
import "tailwindcss/tailwind.css";

interface AuthContextValue {
  loginUser: (userInfo: userInfo) => void;
  logoutUser: () => void;
  auth: boolean;
}

interface AuthContextProps {
  children: React.ReactNode;
}

interface userInfo {
  username: string;
  password: string;
  role: string;
}

export const AuthContext = createContext<AuthContextValue>({
  loginUser: () => {},
  logoutUser: () => {},
  auth: false,
});

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(Boolean);

  useEffect(() => {
    setLoading(false);
  }, []);

  const loginUser = async (userInfo: userInfo) => {
    setLoading(true);

    try {
      const response = await axios.post(AUTH_API_URL + "/login", {
        username: userInfo.username,
        password: userInfo.password,
        role: userInfo.role,
      });

      if (response.data.message === "Login successful") {
        setAuth(true);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {};

  const contextData = {
    auth,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl font-semibold relative">
            Loading
            <span
              className="inline-block ml-1 animate-bounceAndColorChange"
              style={{
                animationDelay: "0.5s",
              }}
            >
              ...
            </span>
          </p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
