"use client";
import { forwardRef, useImperativeHandle, useState } from "react";
const ModalSolicitudes = forwardRef((props, ref) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [id_animal, setId_animal] = useState(null);
  const [loadingMap, setLoadingMap] = useState({});

  useImperativeHandle(ref, () => ({
    fetchSolicitudes: getSolicitudesFromBackend,
  }));

  async function getSolicitudesFromBackend(id) {
    setId_animal(id);
    const response = await fetch("http://localhost:3000/api/solicitudes/" + id);
    const data = await response.json();
    console.log("solicitudes", data);
    setSolicitudes(data);
    setIsOpen(true);
  }

  async function setEstadoSolicitud(solicitud, estado) {
    const response = await fetch(
      `http://localhost:3000/api/solicitudes/solicitud/${solicitud.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado: estado,
        }),
      }
    );

    const data = await response.json();
    console.log("Response from Update", data);
    setRefresh(!refresh);
  }

  async function handleAceptar(solicitud) {
    setLoadingMap((prev) => ({ ...prev, [solicitud.id]: true }));
    await setEstadoSolicitud(solicitud, "aceptado");
    await getSolicitudesFromBackend(id_animal);
    setLoadingMap((prev) => ({ ...prev, [solicitud.id]: false }));
  }

  async function handleDenegar(solicitud) {
    setLoadingMap((prev) => ({ ...prev, [solicitud.id]: true }));
    await setEstadoSolicitud(solicitud, "denegado");
    await getSolicitudesFromBackend(id_animal);
    setLoadingMap((prev) => ({ ...prev, [solicitud.id]: false }));
  }

  async function handleModificar(solicitud) {
    setLoadingMap((prev) => ({ ...prev, [solicitud.id]: true }));
    await setEstadoSolicitud(solicitud, "espera");
    await getSolicitudesFromBackend(id_animal);
    setLoadingMap((prev) => ({ ...prev, [solicitud.id]: false }));
  }

  if (isOpen == false) return null;
  return (
    <>
      <div className="fixed top-1/2 left-1/2 transform -translate-1/2 bg-indigo-500 p-4 rounded-lg">
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>
          <h1 className="text-center font-bold my-5">
            Solicitudes de adopcion {solicitudes[0].animal.nombre}
          </h1>
          <table className="min-w-full table-auto border border-gray-300 rounded-md shadow-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-center border-b">Usuario</th>
                <th className="px-4 py-2 text-center border-b">Fecha</th>
                <th className="px-4 py-2 text-center border-b">Estado</th>
                <th className="px-4 py-2 text-center border-b">Gestionar</th>
                <th className="px-4 py-2 text-center border-b cursor-pointer bg-red-300 hover:bg-red-400 transition">
                  Eliminar Todos
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {solicitudes.map((solicitud) => (
                <tr key={solicitud.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{solicitud.usuario.nombre}</td>
                  <td className="px-4 py-2">
                    {new Date(solicitud.fecha).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        solicitud.estado === "aceptado"
                          ? "bg-green-100 text-green-700"
                          : solicitud.estado === "espera"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {solicitud.estado}
                    </span>
                  </td>
                  <td>
                    {loadingMap[solicitud.id] ? (
                      <div>Procesando...</div>
                    ) : solicitud.estado === "espera" ? (
                      <div className="flex justify-around w-40">
                        <button
                          onClick={() => handleAceptar(solicitud)}
                          className="bg-green-200 rounded-lg p-1 hover:bg-green-300 transition duration-300"
                        >
                          Aceptar
                        </button>
                        <button
                          onClick={() => handleDenegar(solicitud)}
                          className="bg-red-400 rounded-lg p-1 hover:bg-red-300 transition duration-300"
                        >
                          Denegar
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-around">
                        <button
                          onClick={() => handleModificar(solicitud)}
                          className="bg-gray-500 rounded-lg p-1 hover:bg-gray-600 transition duration-300"
                        >
                          Modificar Estado
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className="flex justify-around">
                      <button className="bg-red-400 rounded p-1 cursor-pointer hover:bg-red-500 ">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
});
ModalSolicitudes.displayName = "ModalSolicitudes";
export default ModalSolicitudes;
