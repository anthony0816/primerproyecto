import { useState, useRef } from "react";
import LoadingSpinner from "./LoadindSniper";
import { setEstadoSolicitud } from "@/libs/api";
import { useNotifi } from "@/context/notifiContext";
import { useAuth } from "@/context/authContext";
import ModalDenegarSolicitud from "./ModalDenegarSolicitud";

export function SolicitudesCard({ solicitud }) {
  const { id, usuario, animal, descripcion, estado, fecha } = solicitud;
  const { ShowNotification, CreateNotifi } = useNotifi();
  const { user } = useAuth();
  const ModalDenegarRef = useRef();
  const [isloading, setisLoading] = useState(false);
  const [refres, setRefresh] = useState(false);
  const estadoColor = {
    espera: "bg-yellow-100 text-yellow-800",
    aceptado: "bg-green-100 text-green-800",
    denegado: "bg-red-100 text-red-800",
  };

  function EstablecerEstado(valor) {
    solicitud.estado = valor;
  }

  async function handleAceptar() {
    handleState("aceptado");
  }

  async function handleDenegar() {
    if (ModalDenegarRef.current) {
      const modal = ModalDenegarRef.current;
      // open: (usuario_id, nombreAnimal, especie, Denegar,currentUserId) => {
      const usuarioId = solicitud.usuario.id;
      const nombreAnimal = solicitud.animal.nombre;
      const especie = solicitud.animal.especie;
      const callBackFunction = setDenegado;
      const currentUserId = user.id;
      modal.open(
        usuarioId,
        nombreAnimal,
        especie,
        callBackFunction,
        currentUserId
      );
    }
  }

  async function handleModificar() {
    handleState("espera");
  }

  async function handleState(valor) {
    if (!user) return;
    setisLoading(true);
    const data = await setEstadoSolicitud(solicitud, valor);
    const { estado } = data;
    if (estado == valor) {
      EstablecerEstado(valor);
      setRefresh(!refres);
      setisLoading(false);

      if (valor == "aceptado" || valor == "denegado") {
        CreateNotifi(
          solicitud.usuario.id,
          valor,
          `Su solicitud de adopcion de ${solicitud.animal.nombre} (${solicitud.animal.especie}) fue ${valor}`,
          user.id
        );
      }
      if (valor == "espera") {
        CreateNotifi(
          solicitud.usuario.id,
          valor,
          `Su solicitud de adopcion de ${solicitud.animal.nombre} (${solicitud.animal.especie}) fue devuelta a estado de espera `,
          user.id
        );
      }
      return;
    }
    ShowNotification("Algo salio mal ");
    setisLoading(true);
  }

  async function setDenegado() {
    if (!user) return;
    const data = await setEstadoSolicitud(solicitud, "denegado");
    const { estado } = data;
    if (estado == "denegado") {
      EstablecerEstado("denegado");
      setRefresh(!refres);
      setisLoading(false);
      return
    }
    ShowNotification("Algo salio mal ");
    setisLoading(true);
  }
  return (
    <>
      <ModalDenegarSolicitud ref={ModalDenegarRef} />
      <div className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">#ID: {id}</span>
          <span
            className={`px-2 py-1 text-xs rounded ${
              estadoColor[estado] || "bg-gray-100 text-gray-800"
            }`}
          >
            {estado}
          </span>
        </div>

        <h2 className="text-lg font-semibold text-purple-700">
          {animal?.nombre}{" "}
          <span className="text-sm text-gray-500">({animal?.especie})</span>
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
        <div className="flex flex-row justify-between">
          <p className="font-bold text-sm text-gray-500">acciones:</p>
          {isloading ? (
            <div>
              <LoadingSpinner />
            </div>
          ) : (
            <div>
              {estado == "espera" ? (
                <div className="min-w-40 flex justify-around">
                  <button
                    onClick={() => handleAceptar()}
                    className="p-1 rounded bg-green-300 hover:bg-green-400 transition"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => handleDenegar()}
                    className="p-1 rounded bg-red-300 hover:bg-red-400 transition"
                  >
                    Denegar
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleModificar()}
                    className="p-1 rounded bg-gray-300 hover:bg-gray-400 transition"
                  >
                    Modificar
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
