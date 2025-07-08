"use client";
import ModalAtenciones from "./ModalAtenciones";
import { useRef } from "react";
export default function TablaAnimales({ animales }) {
  const modalAtencionesRef = useRef(null);

  function handleAtenciones(animalId) {
    if (modalAtencionesRef.current) {
      modalAtencionesRef.current.open(animalId);
    }
  }
  function handleSolicitudes() {
    console.log("manejando solicitudes ");
  }
  return (
    <>
      {/* //Modal expandir atenciones medicas */}
      <ModalAtenciones ref={modalAtencionesRef} />

      <div className="mx-auto min-w-[700px] max-w-[1300px]">
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
          <h2 className="text-3xl font-extrabold mb-8 text-center animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
              🐾 Listado de Animales
            </span>
            <span className="block mt-2 h-1 w-20 mx-auto bg-gradient-to-r from-amber-400 to-pink-500 rounded-full"></span>
          </h2>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600">
              <tr>
                {[
                  "Nombre",
                  "Especie",
                  "Fecha Nacimiento",
                  "Sexo",
                  "Adoptable",
                  "Atenciones",
                  "Solicitudes",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {animales.map((animal) => (
                <tr
                  key={animal.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {animal.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 capitalize">
                    {animal.especie}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(animal.fecha_nacido).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xm font-medium ${
                        animal.sexo === "macho"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-pink-100 text-pink-800"
                      }`}
                    >
                      {animal.sexo == "macho" ? "♂" : "♀"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        animal.paraAdopcion
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {animal.paraAdopcion
                        ? "🟢 Disponible"
                        : "🔴 No disponible"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 space-y-1">
                    <ul className="space-y-1">
                      {animal.atenciones?.length > 0 ? (
                        <li
                          className="bg-yellow-50 text-yellow-800 text-xs px-2 py-1 rounded-md inline-flex items-center mr-1 mb-1 cursor-pointer hover:bg-blue-100"
                          onClick={() => {
                            handleAtenciones(animal.id);
                          }}
                        >
                          ➕ Ver
                        </li>
                      ) : (
                        <span className="text-gray-400 text-sm ">
                          sin atenciones
                        </span>
                      )}
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {animal.solicitudes?.length > 0 ? (
                      <ul className="space-y-1">
                        {
                          <li
                            className="bg-yellow-50 text-yellow-800 text-xs px-2 py-1 rounded-md inline-flex items-center mr-1 mb-1 cursor-pointer hover:bg-blue-100"
                            onClick={() => handleSolicitudes()}
                          >
                            ➕ Ver
                          </li>
                        }
                      </ul>
                    ) : (
                      <span className="text-gray-400 text-sm">
                        sin solicitudes
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
