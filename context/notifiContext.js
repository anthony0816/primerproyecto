"use client";
import { createContext, useContext } from "react";
import { useState } from "react";
import { VerifyForNewNotifications, CreateNotificacion } from "@/libs/api";

const Emergent_NotifiContext = createContext();

export function Emergent_NotifiProvider({ children }) {
  const [notification, setNotification] = useState("");
  const [newNotifications, setNewNotifications] = useState(null);

  const ShowNotification = (text) => {
    setNotification(text);
    setTimeout(() => {
      setNotification("");
    }, 10000);
  };

  const VerifyNewNotifications = async (id) => {
    const data = await VerifyForNewNotifications(id);
    const {estado, cantidad} = data
    if(estado){
      setNewNotifications(cantidad)
      return
    }
    setNewNotifications(null);
  };

  const CreateNotifi = async (usuario_id, descrip, contexto, currentUserId) => {
    const response =  await CreateNotificacion(usuario_id, descrip, contexto);
    await VerifyNewNotifications(currentUserId);
    return response
  };

  

  return (
    <Emergent_NotifiContext.Provider
      value={{
        notification,
        ShowNotification,
        VerifyNewNotifications,
        newNotifications,
        setNewNotifications,
        CreateNotifi
      }}
    >
      {children}
    </Emergent_NotifiContext.Provider>
  );
}

export function useNotifi() {
  const context = useContext(Emergent_NotifiContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
