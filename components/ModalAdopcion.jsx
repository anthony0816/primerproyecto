import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import { useNotifi } from "@/context/notifiContext";

const ModalAdopcion = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animal, setAnimal] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const { ShowNotification } = useNotifi();
  const Refresh = useRef()

  useImperativeHandle(ref, () => ({
    open: (animal, user, refresh) => {
      console.log("Aninal", animal);
      setAnimal(animal);
      setUsuario(user);
      setIsOpen(true);
      Refresh.current = refresh
      console.log("usuario:", user);
    },
  }));

  async function handleAceptar() {
    console.log("contenido de la descriptcion", descripcion);
    if (!descripcion) {
      ShowNotification("La descripcion no puede estar vacia");
      return;
    }
    const response = await CreateSolicitud(usuario, descripcion);
    const solicitud = await response.json();
    if (solicitud) {
      if(Refresh.current) await Refresh.current()
        ShowNotification("Su solicitud ha sido procesada correctamente");
      setIsOpen(false)
      console.log("created solicitud:", solicitud);
    }
  }

  function handleCancelar() {
    setIsOpen(false);
  }

  async function CreateSolicitud(usuario, descripcion) {
    const usuario_id = Number(usuario.id);
    const animal_id = Number(animal.id);
    const solicitud = await fetch("/api/solicitudes/solicitud", {
      method: "POST",
      headers: {
        "Content-type": "aplication/json",
      },
      body: JSON.stringify({
        animal: {
          connect: { id: animal_id }, // ✅ Esto le dice a Prisma que relacione con el Animal de ID 2
        },
        usuario: {
          connect: { id: usuario_id }, // ✅ Esto le dice a Prisma que relacione con el Animal de ID 2
        },
        descripcion,
      }),
    });
    return solicitud;
  }
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full border border-gray-200 overflow-hidden">
          {/* Cabecera */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-400 p-4">
            <h2 className="text-xl font-bold text-white">
              Adoptar a: {animal.nombre}
            </h2>
          </div>

          {/* Cuerpo */}
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Descripción:
            </h3>
            <textarea
              placeholder="Motivos para adoptar a la criatura"
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            ></textarea>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 bg-white border-t border-gray-200 px-6 py-4">
            <button
              onClick={() => handleAceptar()}
              className="px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition-colors"
            >
              Aceptar
            </button>
            <button
              onClick={() => handleCancelar()}
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
ModalAdopcion.displayName = "ModalAdopcion";
export default ModalAdopcion;
