"use client";
import { useState, forwardRef, useImperativeHandle, useRef, use } from "react";
import { useNotifi } from "@/context/notifiContext";
import LoadingSpinner from "./LoadindSniper";
import { esperar } from "@/app/test/page";
import { CreateNotificacion } from "@/libs/api";

const ModalDenegarSolicitud = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usuario_id, setUsuario_id] = useState(null);
  const [currentUserId, setCurrentUserId]= useState(null)
  const [nombreAnimal, setNombreAnimal] = useState("");
  const [especie, setEspecie] = useState("");
  const [descrip, setDescript] = useState(null);
  const { ShowNotification, CreateNotifi } = useNotifi();
  const DenegarRef = useRef();

  useImperativeHandle(ref, () => ({
    open: (usuario_id, nombreAnimal, especie, Denegar,currentUserId) => {
      setUsuario_id(usuario_id);
      setCurrentUserId(currentUserId)
      setNombreAnimal(nombreAnimal);
      setEspecie(especie);
      setIsOpen(true);
      DenegarRef.current = Denegar;
    },
  }));

  function close() {
    setIsOpen(false);
  }

  async function HandleAceptar() {
    setIsLoading(true);
    const contexto = `Su solicitud para adoptar la mascota ${nombreAnimal} (${especie}) fue denegada`;
    const response = await CreateNotifi(usuario_id, descrip, contexto, currentUserId);
    const { state } = response;
    if (state) {
      ShowNotification("El usuario ha sido notificado correctamente");
      close();
      await DenegarRef.current();
      setIsLoading(false);
      setDescript(null);
      return;
    }
    ShowNotification(response.mensaje);
    setIsLoading(false);
    setDescript(null);
    return;
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-6">
          {/* Botón de cerrar */}
          <div className="flex justify-end">
            <button
              onClick={() => close()}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Cerrar"
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

          {/* Contenido */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Motivo de denegación
            </h2>
            <p className="text-sm text-gray-600">
              Es necesario especificar el porqué de la denegación de la
              solicitud.
            </p>
          </div>

          {/* Textarea */}
          <textarea
            onChange={(e) => setDescript(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
            rows={4}
            placeholder="Escribe el motivo aquí..."
          />

          {/* Botones */}
          <div className="flex justify-end gap-4">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <button
                onClick={() => HandleAceptar()}
                className="px-4 py-2 rounded text-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Aceptar
              </button>
            )}
            <button
              onClick={() => close()}
              className="px-4 py-2 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

ModalDenegarSolicitud.displayName = "ModalDenegarSolicitud";
export default ModalDenegarSolicitud;
