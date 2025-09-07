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
      setIsLoading(true);
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
      setIsLoading(false);
    }

    if (user) {
      loadNotifications(user.id);
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner text="Obteniendo notificaciones" />
        </div>
      ) : (
        <>
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-8 rounded-2xl shadow-lg border border-purple-200 max-w-md w-full">
                <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Sin notificaciones
                </h3>
                <p className="text-gray-600">
                  No hay nuevas notificaciones en este momento
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header sticky con acciones */}
              <div className="sticky top-0 z-20 bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 shadow-md">
                <div className="flex justify-between items-center">
                  <h2 className="text-white font-bold text-lg">
                    Notificaciones
                  </h2>
                  <div className="flex gap-3">
                    <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm">
                      📋 Marcar como leídas
                    </button>
                    <button className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                      🗑️ Eliminar todas
                    </button>
                  </div>
                </div>
              </div>

              {/* Lista de notificaciones */}
              <div className="max-h-[600px] overflow-y-auto">
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

              {/* Contador de notificaciones */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  Mostrando {notifi.length} notificación
                  {notifi.length !== 1 ? "es" : ""}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
