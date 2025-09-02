"use client";
import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import { useAuth } from "@/context/authContext";
import { useNotifi } from "@/context/notifiContext";
import LoadingSpinner from "./LoadindSniper";

import ModalDenegarSolicitud from "./ModalDenegarSolicitud";
import { setEstadoSolicitud } from "@/libs/api";

const ModalSolicitudes = forwardRef((props, ref) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [id_animal, setId_animal] = useState(null);
  const [loadingMap, setLoadingMap] = useState({});
  const { user } = useAuth();
  const { CreateNotifi } = useNotifi();
  const ModalDenegarSolicitudRef = useRef();

  useImperativeHandle(ref, () => ({
    fetchSolicitudes: getSolicitudesFromBackend,
  }));
  function close() {
    setSolicitudes([]);
    setIsOpen(false);
  }

  async function getSolicitudesFromBackend(id) {
    setIsOpen(true);
    setId_animal(id);
    // await esperar(3000);
    const response = await fetch("http://localhost:3000/api/solicitudes/" + id);
    const data = await response.json();
    console.log("solicitudes", data);
    setSolicitudes(data);
  }


  async function handleAceptar(solicitud) {
    const usuarioId = solicitud.usuarioId;
    const nombreAnimal = solicitud.animal.nombre;
    const especie = solicitud.animal.especie;

    setLoadingMap((prev) => ({ ...prev, [solicitud.id]: true }));
    await setEstadoSolicitud(solicitud, "aceptado");
    await getSolicitudesFromBackend(id_animal);
    CreateNotifi(
      usuarioId,
      "Aceptado",
      `Su solicitud de adopcion de ${nombreAnimal} (${especie}) fue aceptada`,
      user.id
    );
    setLoadingMap((prev) => ({ ...prev, [solicitud.id]: false }));
  }

  async function handleDenegar(solicitud) {
    const Denegar = async () => {
      setLoadingMap((prev) => ({ ...prev, [solicitud.id]: true }));
      await setEstadoSolicitud(solicitud, "denegado");
      await getSolicitudesFromBackend(id_animal);
      setLoadingMap((prev) => ({ ...prev, [solicitud.id]: false }));
    };

    ModalDenegarSolicitudRef.current.open(
      solicitud.usuarioId,
      solicitud.animal.nombre,
      solicitud.animal.especie,
      Denegar,
      user.id
    );
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
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <ModalDenegarSolicitud ref={ModalDenegarSolicitudRef} />
        <div className="  bg-indigo-500 p-4 rounded-lg min-w-1/3">
          <div className="flex justify-end">
            <button
              onClick={() => close()}
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
              Solicitudes de adopcion {solicitudes[0]?.animal.nombre}
            </h1>

            {solicitudes.length > 0 ? (
              <table className="min-w-full table-auto border border-gray-300 rounded-md shadow-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-center border-b">Usuario</th>
                    <th className="px-4 py-2 text-center border-b">Fecha</th>
                    <th className="px-4 py-2 text-center border-b">Estado</th>
                    {user?.rol == "administrador" ? (
                      <>
                        <th className="px-4 py-2 text-center border-b">
                          Descripcion
                        </th>
                        <th className="px-4 py-2 text-center border-b">
                          Gestionar
                        </th>
                        <th className="px-4 py-2 text-center border-b cursor-pointer bg-red-300 hover:bg-red-400 transition">
                          Eliminar Todos
                        </th>
                      </>
                    ) : null}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {solicitudes.map((solicitud) => (
                    <tr key={solicitud.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <div className="text-center">
                          {solicitud.usuario.nombre}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-center">
                          {new Date(solicitud.fecha).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-center">
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
                        </div>
                      </td>
                      {/* Descripcion solo disponible para los administradores */}
                      {user?.rol == "administrador" ? (
                        <td className="text-center">
                          {solicitud.descripcion ? solicitud.descripcion : "-"}
                        </td>
                      ) : null}
                      {/* Gestionar la aceptacion de solicitudes para usuarios administradores */}
                      {user?.rol == "administrador" ? (
                        <>
                          <td>
                            {loadingMap[solicitud.id] ? (
                              <LoadingSpinner text={false} />
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
                        </>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="bg-white rounded">
                <LoadingSpinner text={"Obteniendo Solicitudes"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});
ModalSolicitudes.displayName = "ModalSolicitudes";
export default ModalSolicitudes;
