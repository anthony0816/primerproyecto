export function SolicitudesCard({ solicitud }) {
  const { id, usuario, animal, descripcion, estado, fecha } = solicitud;

  const estadoColor = {
    espera: "bg-yellow-100 text-yellow-800",
    aceptado: "bg-green-100 text-green-800",
    denegado: "bg-red-100 text-red-800",
  };

  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">#ID: {id}</span>
        <span
          className={`px-2 py-1 text-xs rounded ${estadoColor[estado] || "bg-gray-100 text-gray-800"}`}
        >
          {estado}
        </span>
      </div>

      <h2 className="text-lg font-semibold text-purple-700">
        {animal?.nombre} <span className="text-sm text-gray-500">({animal?.especie})</span>
      </h2>

      <p className="text-sm text-gray-600 mb-1">
        <strong>Usuario:</strong> {usuario?.nombre}
      </p>

      <p className="text-sm text-gray-600 mb-1">
        <strong>Descripción:</strong> {descripcion}
      </p>

      <p className="text-xs text-gray-400">
        <strong>Fecha:</strong>{" "}
        {new Date(fecha).toLocaleString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}
