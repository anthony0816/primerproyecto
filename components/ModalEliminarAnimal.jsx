import { useImperativeHandle, forwardRef, useState, useRef } from "react";
const ModalEliminarAnimal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const FunctionDeleteRef = useRef(null);
  useImperativeHandle(ref, () => ({
    open: (Function) => {
      FunctionDeleteRef.current = Function;
      setIsOpen(true);
    },
  }));

  function close() {
    setIsOpen(false);
  }
  async function handleAceptar() {
    await FunctionDeleteRef.current();
    close();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-6">
        {/* Título y mensaje */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-red-600">⚠️ Advertencia</h2>
          <p className="text-sm text-gray-700">
            ¿Seguro que deseas eliminar estos datos? Esta acción no se puede
            deshacer.
          </p>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => handleAceptar()}
            className="px-4 py-2 rounded text-sm bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Aceptar
          </button>
          <button
            onClick={() => close()}
            className="px-4 py-2 rounded text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
});

ModalEliminarAnimal.displayName = "ModalEliminarAnimal";
export default ModalEliminarAnimal;
