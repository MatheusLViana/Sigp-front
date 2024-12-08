import React, { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await api.post("/login/", { email, password });
      const { access_token, refresh_token } = response.data;

      // Armazena os tokens no localStorage
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      setIsAuthenticated(true);
    } catch (error) {
      throw error; // Propaga o erro para ser tratado no componente Login
    }
  };

  const logout = () => {
    // Remove os tokens e atualiza o estado de autenticação
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
