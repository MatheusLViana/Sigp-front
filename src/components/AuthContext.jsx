import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await api.post("/login/", { email, password });
      const { access_token, refresh_token, nome_completo } = response.data;

      // Armazena os tokens e informações do usuário no localStorage
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("nome_completo", nome_completo);

      setUser({ nome_completo, email });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("nome_completo");
    setUser(null);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const nomeCompleto = localStorage.getItem("nome_completo");

    if (accessToken && nomeCompleto) {
      setUser({ nome_completo: nomeCompleto });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
