"use client";
import { useLoadingRouter } from "./RouterProvider";
import { useEffect, useState } from "react";
export default function GlobalLoader({ children }) {
  const [loading, setLoading] = useState(false);
  const { isLoading } = useLoadingRouter();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="text-center">
          {/* Loader principal con animación de pulsación */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            {/* Círculo exterior con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full animate-pulse shadow-lg"></div>

            {/* Círculo interior con animación de escala */}
            <div className="absolute inset-4 bg-white rounded-full animate-ping"></div>

            {/* Centro con logo/icono */}
            <div className="absolute inset-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🐾</span>
            </div>
          </div>

          {/* Texto con animación de fade */}
          <div className="animate-pulse">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Cargando
            </h2>
            <p className="text-gray-500">Por favor, espere un momento...</p>
          </div>

          {/* Puntos animados */}
          <div className="flex justify-center mt-4 space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
