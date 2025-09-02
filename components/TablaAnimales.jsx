"use client";
import ModalAtenciones from "./ModalAtenciones";
import ModalSolicitudes from "./ModalSolicitudes";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import ModalAdopcion from "./ModalAdopcion";
import ModalEliminarAnimal from "./ModalEliminarAnimal";

export default function TablaAnimales({
  animales,
  FunctionDelete,
  FetchAnimales,
  EliminarSolicitud,
}) {
  const { user } = useAuth();
  const [selectAnimal, setSelectAnimal] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [options, setOptions] = useState(false);
  const [Animales, setAnimales] = useState([]);
  const [resultadosObtenidos, setResultadosObtenidos] = useState("");
  const [finder, setFinder] = useState("");
  const modalAtencionesRef = useRef(null);
  const modalSolicitudesRef = useRef(null);
  const modalAdopcionRef = useRef(null);
  const modalEliminarAnimalRef = useRef(null);

  useEffect(() => {
    setAnimales(animales);
  }, []);

  useEffect(() => {
    setSelectAnimal({});
  }, [Animales]);

  useEffect(() => {
    if (selectAll) {
      const nuevosSeleccionados = {};
      Animales.forEach((animal) => {
        nuevosSeleccionados[animal.id] = true;
      });
      setSelectAnimal(nuevosSeleccionados);
      return;
    }
    setSelectAnimal({});
  }, [selectAll]);

  useEffect(() => {
    let showOptions = false;
    Object.keys(selectAnimal).forEach((key) => {
      if (selectAnimal[key] == true) {
        showOptions = true;
        return;
      }
    });
    setOptions(showOptions);
  }, [selectAnimal]);

  function handleAtenciones(animalId) {
    if (modalAtencionesRef.current) {
      modalAtencionesRef.current.open(animalId);
    }
  }
  function handleSolicitudes(animalId) {
    if (modalSolicitudesRef.current) {
      modalSolicitudesRef.current.fetchSolicitudes(animalId);
    }
  }
  function handleAdopcion(animal) {
    const Refresh = async () => {
      const animales = await FetchAnimales();
      setAnimales(animales);
    };

    if (modalAdopcionRef.current) {
      if (user) {
        modalAdopcionRef.current.open(animal, user, Refresh);
      }
    }
  }
  function Seleccionar(value, animal_id) {
    setSelectAnimal((prev) => ({ ...prev, [animal_id]: value }));
  }

  function SwitchState(id) {
    if (selectAnimal[id]) {
      Seleccionar(false, id);
    } else {
      Seleccionar(true, id);
    }
  }

  function contar() {
    let cont = 0;
    Object.values(selectAnimal).forEach((value) => {
      if (value) {
        cont++;
      }
    });
    return cont;
  }

  function buscar(value) {
    if (!value.trim()) {
      setAnimales(animales);
      setResultadosObtenidos("");
    }
    const ArrayFiltrado = animales.filter((animal) => {
      const nombre = animal.nombre.toLowerCase() || "";
      const especie = animal.especie.toLowerCase() || "";
      const sexo = animal.sexo.toLowerCase() || "";

      return (
        nombre.includes(value.toLowerCase()) ||
        especie.includes(value.toLowerCase()) ||
        sexo.includes(value.toLowerCase())
      );
    });
    setAnimales(ArrayFiltrado);
    if (ArrayFiltrado.length > 0) {
      setResultadosObtenidos(`${ArrayFiltrado.length} Resultado/s`);
    }
    if (ArrayFiltrado.length == animales.length) {
      setResultadosObtenidos("");
    }
    if (ArrayFiltrado.length == 0) {
      setResultadosObtenidos("");
    }
  }

  function handleDelete() {
    const Delete = async () => {
      const ids = Object.keys(selectAnimal);
      const idsToInt = [];
      ids.forEach((id) => {
        idsToInt.push(Number(id));
      });
      const deleted = await FunctionDelete(idsToInt);
      console.log("Eliminados:", deleted);
      const animales = await FetchAnimales();
      setAnimales(animales);
    };
    modalEliminarAnimalRef.current.open(Delete);
  }
  function VerifyExistentSolicitud(animal) {
    let boolean = false;
    animal.solicitudes.forEach((sol) => {
      if (sol.usuarioId == user?.id) {
        boolean = true;
        return;
      }
    });
    return boolean;
  }

  async function CancelarSolicitud(animalId, userId) {
    const res = await EliminarSolicitud(animalId, userId);
    console.log("Eliminar:", res);
    const animales = await FetchAnimales();
    setAnimales(animales);
  }

  return (
    <>
      {/* modal para eliminar los animales  */}
      <ModalEliminarAnimal ref={modalEliminarAnimalRef} />

      {/* //Modal expandir atenciones medicas */}
      <ModalAtenciones ref={modalAtencionesRef} />

      {/* //Modal expandir solicitudes de adopcion */}
      <ModalSolicitudes ref={modalSolicitudesRef} />

      {/* Modal para opciones de solicitar adopcion  */}
      <ModalAdopcion ref={modalAdopcionRef} />

      <div className="mx-auto min-w-[700px] max-w-[1300px] TablaAnimales">
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
          <h2 className="text-3xl font-extrabold mb-8 text-center animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
              🐾 Listado de Animales
            </span>
            <span className="block mt-2 h-1 w-20 mx-auto bg-gradient-to-r from-amber-400 to-pink-500 rounded-full"></span>
          </h2>

          {/* buscador */}
          <div className="mb-6 max-w-1/2 m-auto text-center text-lg">
            <input
              type="text"
              placeholder="🔍 Buscar por nombre, especie o sexo..."
              className="w-full px-4 py-2 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              onChange={(e) => {
                buscar(e.target.value);
                setFinder(e.target.value);
              }}
            />
            <p>{resultadosObtenidos}</p>
          </div>

          {/* opciones al seleccionar alguna fila de la tabla */}
          {options ? (
            <div className="bg-gradient-to-r from-indigo-400 to-purple-500 fixed bottom-0 left-0 w-full p-3 flex flex-row justify-around ">
              <div className="">Gestionar:</div>
              <div className="">
                <button
                  onClick={() => setSelectAll(true)}
                  className="bg-blue-400 rounded-lg p-1 hover:bg-blue-500 transition mx-2"
                >
                  Marcar Todos ✔️
                </button>
                <button
                  onClick={() => {
                    setSelectAnimal({});
                    setSelectAll(false);
                  }}
                  className="bg-gray-400 rounded-lg p-1 hover:bg-gray-500 transition mx-2"
                >
                  Desmarcar: {contar()} ✖️
                </button>
                <button
                  onClick={() => handleDelete()}
                  className="bg-red-400 rounded-lg p-1 hover:bg-red-500 transition mx-2"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ) : null}

          <table className="min-w-full divide-y divide-gray-200 my-">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-600">
              <tr>
                {[
                  "Nombre",
                  "Especie",
                  "Fecha de Nacimiento",
                  "Sexo",
                  "Adoptable",
                  "Atenciones",
                  "Solicitudes",
                  "Adoptar",
                  "Seleccionar",
                ].map((header) => {
                  if (header == "Adoptar" && user?.rol == "administrador")
                    return null;
                  if (header == "Seleccionar") {
                    if (header == "Seleccionar" && user?.rol == "cliente")
                      return null;
                    return (
                      <th
                        key={header}
                        className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider"
                      >
                        <div className=" flex justify-between flex-row">
                          <label>{header}</label>
                          <input
                            type="checkbox"
                            checked={!!selectAll}
                            onChange={(e) => setSelectAll(e.target.checked)}
                          />
                        </div>
                      </th>
                    );
                  }
                  return (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Animales.map((animal) => (
                <tr
                  key={animal.id}
                  onClick={contar() > 0 ? () => SwitchState(animal.id) : null}
                  className={`hover:bg-gray-50 transition-colors duration-150 ${
                    selectAnimal[animal.id] ? "bg-red-200 hover:bg-red-200" : ""
                  }
                  ${contar() > 0 ? "cursor-pointer" : ""}`}
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
                          onClick={() => handleAtenciones(animal.id)}
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
                            onClick={() => handleSolicitudes(animal.id)}
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

                  {user?.rol == "cliente" ? (
                    <>

                      {!VerifyExistentSolicitud(animal) ? (
                        <td>
                          <div
                            className="bg-yellow-50 text-yellow-800 text-xs px-2 py-1 rounded-md inline-flex items-center mr-1 mb-1 cursor-pointer hover:bg-blue-100"
                            onClick={() => handleAdopcion(animal)}
                          >
                            🏠 Solicitar Adopcion
                          </div>
                        </td>
                      ) : (
                        <td>
                          <div
                            className="bg-red-100 text-yellow-800 text-xs px-2 py-1 rounded-md inline-flex items-center mr-1 mb-1 cursor-pointer hover:bg-blue-100"
                            onClick={async () =>
                              CancelarSolicitud(animal.id, user?.id)
                            }
                          >
                            ✖️ Eliminar Solicitud
                          </div>
                        </td>
                      )}
                    </>

                  ) : null}
                  
                  {user?.rol == "administrador" ? (
                    <td>
                      <div className=" text-center">
                        <input
                          type="checkbox"
                          checked={!!selectAnimal[animal.id]}
                          onChange={(e) =>
                            Seleccionar(e.target.checked, animal.id)
                          }
                        />
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>

          {finder.trim() != "" && Animales.length < 1 && animales.length > 0 ? (
            <div className=" bg-gradient-to-r from-indigo-500 to-purple-600 p-5 rounded m-auto max-w-1/2 min-w-1/4 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <strong>Sin resultados de la busqueda</strong>
            </div>
          ) : null}
        </div>
      </div>
      <div className="h-30"></div>
    </>
  );
}
