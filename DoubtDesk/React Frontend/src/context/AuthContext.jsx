import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("doubtdesk_user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to restore session:", error);

      localStorage.removeItem("doubtdesk_user");
      localStorage.removeItem("doubtdesk_access_token");
      localStorage.removeItem("doubtdesk_refresh_token");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = ({ user, accessToken, refreshToken }) => {
    setUser(user);

    localStorage.setItem("doubtdesk_user", JSON.stringify(user));
    localStorage.setItem("doubtdesk_access_token", accessToken);
    localStorage.setItem("doubtdesk_refresh_token", refreshToken);
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("doubtdesk_user");
    localStorage.removeItem("doubtdesk_access_token");
    localStorage.removeItem("doubtdesk_refresh_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}