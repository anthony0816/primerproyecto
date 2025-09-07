export default function P404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Animación/Ilustración */}
        <div className="mb-8">
          <div className="relative mx-auto w-64 h-64">
            {/* Planeta */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-purple-200 rounded-full"></div>

            {/* Nave espacial perdida */}
            <div className="absolute top-20 left-20">
              <div className="relative">
                {/* Cuerpo de la nave */}
                <div className="w-16 h-8 bg-gray-700 rounded-t-lg"></div>
                {/* Cabina */}
                <div className="absolute -top-2 left-4 w-8 h-8 bg-blue-500 rounded-full"></div>
                {/* Alas */}
                <div className="absolute -bottom-2 -left-2 w-20 h-4 bg-gray-600 rounded"></div>
                {/* Luz de búsqueda */}
                <div className="absolute top-4 -right-1">
                  <div className="w-4 h-1 bg-yellow-300 rounded-r-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Estrellas */}
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-pulse"
                style={{
                  top: `${20 + i * 10}%`,
                  left: `${30 + i * 8}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Texto principal */}
        <h1 className="text-9xl font-bold text-purple-600 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          ¡Ups! Página no encontrada
        </h2>

        <p className="text-gray-600 mb-8">
          La página que estás buscando parece haberse perdido en el espacio.
          Quizás fue abducida por aliens o simplemente nunca existió.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            🚀 Volver al Inicio
          </a>

          <a
            href="/contacto"
            className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            📞 Reportar Problema
          </a>
        </div>

        {/* Búsqueda opcional */}
        <div className="mt-8">
          <p className="text-sm text-gray-500 mb-2">
            ¿O prefieres buscar algo?
          </p>
          <div className="flex max-w-xs mx-auto">
            <input
              type="text"
              placeholder="Buscar en el sitio..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-500 text-white px-4 py-2 rounded-r-lg hover:bg-purple-600 transition-colors">
              🔍
            </button>
          </div>
        </div>

        {/* Mensaje divertido */}
        <div className="mt-8 p-4 bg-purple-100 rounded-lg">
          <p className="text-sm text-purple-800">
            <strong>Dato curioso:</strong> El error 404 es como el Bigfoot de
            internet - todos hablan de él, pero nadie sabe realmente dónde está.
          </p>
        </div>
      </div>
    </div>
  );
}
