import Link from "next/link";

export default function Home() {
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
          <Link
            href="/mascotas"
            className="bg-white shadow-md rounded-lg p-6 hover:bg-purple-50 transition-colors border border-purple-200"
          >
            <div className="text-3xl mb-2">🐶</div>
            <h2 className="text-xl font-semibold text-purple-500">Mascotas</h2>
          </Link>

          <Link
            href="/about"
            className="bg-white shadow-md rounded-lg p-6 hover:bg-purple-50 transition-colors border border-purple-200"
          >
            <div className="text-3xl mb-2">📖</div>
            <h2 className="text-xl font-semibold text-purple-500">
              Sobre Nosotros
            </h2>
          </Link>

          <Link
            href="/notificaciones"
            className="bg-white shadow-md rounded-lg p-6 hover:bg-purple-50 transition-colors border border-purple-200"
          >
            <div className="text-3xl mb-2">🔔</div>
            <h2 className="text-xl font-semibold text-purple-500">
              Notificaciones
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
