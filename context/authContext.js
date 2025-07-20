"use client";
import { Children, createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const response = await fetch("http://localhost:3000/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, pas: password }),
    });
    const data = await response.json();
    // Asignar el usuaro para que este disponible en el contexto
    setUser(data.usuario);
    // Asignar el token al localStorage
    localStorage.setItem("auth-token", data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
