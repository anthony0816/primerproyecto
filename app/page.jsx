"use client";
import { useLoadingRouter } from "@/components/RouterProvider";

export default function Home() {
  const { router } = useLoadingRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white">
      <div className="max-w-xl w-full text-center space-y-8">
        <h1 className="text-4xl font-bold text-purple-600">
          🌸 Bienvenido a PetDash
        </h1>
        <p className="text-gray-700 text-lg">
          Tu espacio para gestionar adopciones, conocer más sobre nosotros y
          revisar notificaciones.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div
            onClick={() => router("/mascotas")}
            className=" cursor-pointer bg-white shadow-md rounded-lg p-6 hover:bg-purple-50 transition-colors border border-purple-200"
          >
            <div className="text-3xl mb-2">🐶</div>
            <h2 className="text-xl font-semibold text-purple-500">Mascotas</h2>
          </div>

          <div
            onClick={() => router("/about")}
            className=" cursor-pointer bg-white shadow-md rounded-lg p-6 hover:bg-purple-50 transition-colors border border-purple-200"
          >
            <div className="text-3xl mb-2">📖</div>
            <h2 className="text-xl font-semibold text-purple-500">
              Sobre Nosotros
            </h2>
          </div>

          <div
            onClick={() => router("/notificaciones")}
            className="bg-white shadow-md rounded-lg p-6 hover:bg-purple-50 transition-colors border border-purple-200"
          >
            <div className="text-3xl mb-2">🔔</div>
            <h2 className="text-xl font-semibold text-purple-500">
              Notificaciones
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
