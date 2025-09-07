"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const response = await fetch("/api/usuarios/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, pas: password }),
    });
    const data = await response.json();
    // Asignar el usuaro para que este disponible en el contexto
    if (data.usuario) {
      setUser(data.usuario);
    }
    // Asignar el token al localStorage
    localStorage.setItem("auth-token", data.token);
    return data.usuario;
  };

  const logout = async () => {
    localStorage.removeItem("auth-token");
    const response = await fetch(
      "http://localhost:3000/api/usuarios/auth/logout",
      {
        method: "POST",
      }
    );
    const data = response.json();
    setUser(null);
    return data;
  };

  const verify_auth = async () => {
    const response = await fetch("/api/usuarios/auth/verify-auth");
    const data = await response.json();

    const { user } = data;

    if (!user) {
      return null;
    } else {
      return user;
    }
  };
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, verify_auth }}>
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
