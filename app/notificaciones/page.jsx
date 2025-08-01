"use client";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { NotificationCard } from "@/components/NotificationCard";
import { MarcarNotificacionesComoLeidas, FetchNotifi } from "@/libs/api";
import { useNotifi } from "@/context/notifiContext";
import LoadingSpinner from "@/components/LoadindSniper";

export default function Notificaciones() {
  const { user } = useAuth();
  const { VerifyNewNotifications } = useNotifi();
  const [notifi, setnotifi] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadNotifications(id) {
      setIsLoading(true)
      const notificaciones = await FetchNotifi(id);
      setnotifi(notificaciones);
      if (notificaciones.length < 1) {
        setIsEmpty(true);
      }
      // CONTINUAR NO EL CODIGO DE HACER QUE LAS NOTIFICACIONE SE MARQUEN COMO LEIDAS
      const res = await MarcarNotificacionesComoLeidas(id);
      console.log("respuesta de la actualizacion de las notificaciones", res);
      // Para actualizar el estado del icono de las notificaciones
      VerifyNewNotifications(id);
      setIsLoading(false)
    }

    if (user) {
      loadNotifications(user.id);
    }
  }, [user]);

  return (
    <>
      {isLoading? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <LoadingSpinner text={"Obteniendo notificaciones"} />
        </div>
      ) : (
        <>
          {isEmpty ? (
            <div className=" bg-purple-300 p-5 rounded m-auto max-w-1/2 min-w-1/4 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <strong>no hay nuevas noificaciones </strong>
            </div>
          ) : (
            <div className="max-w-1/3 m-auto">
              <div className="sticky top-15 z-50 bg-purple-300">
                <div className="flex justify-between ">
                  <button>Marcar como leidas </button>
                  <button>eliminar todas </button>
                </div>
              </div>
              {notifi.map((notifi) => (
                <NotificationCard
                  key={notifi.id}
                  context={notifi.contexto}
                  descrip={notifi.mensaje}
                  leido={notifi.leido}
                  fecha={notifi.fecha}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
