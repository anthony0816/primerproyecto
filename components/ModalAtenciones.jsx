"use client";
import { useState, forwardRef, useImperativeHandle } from "react";
import LoadingSpinner from "./LoadindSniper";

const ModalAtenciones = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animalId, setAnimalId] = useState(null);
  const [atenciones, setAtenciones] = useState([]);

  // Expone métodos al componente padre
  useImperativeHandle(ref, () => ({
    open: (id) => {
      setAnimalId(id);
      // Aquí harías la llamada a la API para obtener las atenciones del animal
      fetchAtenciones(id);
      setIsOpen(true);
    },
  }));

  const close = () => {
    setIsOpen(false);
    setAtenciones([]);
  };

  const fetchAtenciones = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/atenciones/" + id
      );
      const atenciones = await response.json();
      console.log("Atenciones", atenciones);
      setAtenciones(atenciones);
    } catch (error) {
      console.error("Error fetching atenciones:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-200">
        {/* Cabecera */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Atenciones Médicas</h3>
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
        </div>

        {/* Cuerpo */}
        <div className="p-6">
          {atenciones.length > 0 ? (
            <ul className="space-y-4 divide-y divide-gray-200">
              {atenciones.map((atencion) => (
                <li key={atencion.id} className="pt-4 first:pt-0">
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${
                          atencion.tipo === "consulta"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {atencion.tipo}
                      </span>
                      <p className="font-medium text-gray-700">
                        {atencion.veterinario.replace(/_/g, " ")}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(atencion.fecha).toLocaleDateString()}
                    </span>
                  </div>
                  {atencion.consulta && (
                    <p className="mt-1 text-sm text-gray-600">
                      <span className="font-semibold">Diagnostico:</span>{" "}
                      {atencion.consulta.diagnostico || "N/A"}
                      <span className="font-semibold">Tratamiento:</span>{" "}
                      {atencion.consulta.tratamiento || "N/A"}
                    </p>
                  )}
                  {atencion.vacunacion && (
                    <p className="mt-1 text-sm text-gray-600">
                      <span className="font-semibold">Vacuna:</span>{" "}
                      {atencion.vacunacion.vacuna || "N/A"}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <LoadingSpinner text={"Obteniendo Atenciones"} />
          )}
        </div>

        {/* Pie */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-3 text-right">
          <button
            onClick={() => close()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
});

ModalAtenciones.displayName = "ModalAtenciones";
export default ModalAtenciones;
