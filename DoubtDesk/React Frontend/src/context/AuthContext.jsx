// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext([{ id: '', name: '', role:'', token:'' }, () => {}]);

export function AuthProvider({ children }) {
     const [user, setUser] = useState({ id: '', name: '', role:'', token:'' });

     const login = (userData) => setUser(userData);
     const logout = () => setUser({ id: ''});

     return (
          <AuthContext.Provider value={{ user, login, logout }}>
               {children}
          </AuthContext.Provider>
     );
}

export const useAuth = () => useContext(AuthContext);