"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";

export default function PerfilUsuario() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    async function LoadUser() {
      try {
        const response = await fetch(`/api/usuarios/${user.id}/alldata`);
        const data = await response.json();
        setCurrentUser(data.data); // Accedemos a data.data según tu JSON
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    }
    LoadUser();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Usuario no encontrado
          </h2>
        </div>
      </div>
    );
  }

  const adoptedPets =
    currentUser.solicitudes?.filter((s) => s.estado === "aceptado") || [];
  const pendingPets =
    currentUser.solicitudes?.filter((s) => s.estado !== "aceptado") || [];
  const unreadNotifications =
    currentUser.notificaciones?.filter((n) => !n.leido) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header del perfil */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-32"></div>

          <div className="px-6 pb-6 -mt-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
              <div className="flex items-end">
                <div className="w-32 h-32 bg-white p-2 rounded-full shadow-lg">
                  <div className="w-full h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">
                      {currentUser.nombre?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="ml-6 mb-4">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {currentUser.nombre}
                  </h1>
                  <p className="text-black">{currentUser.email}</p>
                  <div className="flex items-center gap-4 mt-5">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {currentUser.rol}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      Miembro desde{" "}
                      {new Date(
                        currentUser.solicitudes[0]?.fecha
                      ).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4 md:mt-0">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {currentUser.solicitudes?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Solicitudes</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {adoptedPets.length}
                  </div>
                  <div className="text-sm text-gray-600">Adopciones</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {currentUser.notificaciones?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Notificaciones</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mascotas adoptadas */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              🏠 Mascotas Adoptadas
              <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                {adoptedPets.length}
              </span>
            </h2>

            {adoptedPets.length > 0 ? (
              <div className="space-y-4">
                {adoptedPets.slice(0, 5).map((solicitud) => (
                  <div
                    key={solicitud.id}
                    className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        Solicitud #{solicitud.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Adoptado el{" "}
                        {new Date(solicitud.fecha).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-sm">
                      ✅ Aceptado
                    </span>
                  </div>
                ))}
                {adoptedPets.length > 5 && (
                  <p className="text-center text-gray-500 text-sm">
                    +{adoptedPets.length - 5} adopciones más...
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No hay mascotas adoptadas aún</p>
              </div>
            )}
          </div>

          {/* Notificaciones recientes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              🔔 Notificaciones Recientes
              {unreadNotifications.length > 0 && (
                <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                  {unreadNotifications.length} sin leer
                </span>
              )}
            </h2>

            {currentUser.notificaciones?.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {currentUser.notificaciones.slice(0, 10).map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-lg border ${
                      notif.leido
                        ? "bg-gray-50 border-gray-200"
                        : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-800">
                        {notif.contexto}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(notif.fecha).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{notif.mensaje}</p>
                    {!notif.leido && (
                      <div className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded text-xs mt-2">
                        Nuevo
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No hay notificaciones</p>
              </div>
            )}
          </div>

          {/* Solicitudes pendientes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              ⏳ Solicitudes Pendientes
            </h2>
            {pendingPets.length > 0 ? (
              <div className="space-y-3">
                {pendingPets.map((solicitud) => (
                  <div
                    key={solicitud.id}
                    className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">
                          Solicitud #{solicitud.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(solicitud.fecha).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm">
                        {solicitud.estado}
                      </span>
                    </div>
                    {solicitud.descripcion && (
                      <p className="text-sm text-gray-700 mt-2">
                        {solicitud.descripcion}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No hay solicitudes pendientes</p>
              </div>
            )}
          </div>

          {/* Estadísticas adicionales */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              📊 Estadísticas
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {currentUser.solicitudes?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Total solicitudes</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {adoptedPets.length}
                </div>
                <div className="text-sm text-gray-600">Adopciones exitosas</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(
                    (adoptedPets.length /
                      (currentUser.solicitudes?.length || 1)) *
                      100
                  )}
                  %
                </div>
                <div className="text-sm text-gray-600">Tasa de éxito</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {pendingPets.length}
                </div>
                <div className="text-sm text-gray-600">Pendientes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
