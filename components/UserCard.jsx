import { useState, useRef } from "react";
import { useClickOutside } from "@/libs/Myhooks";
import { useLoadingRouter } from "./RouterProvider";
export default function UserCard({ user, logout }) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);
  const { router } = useLoadingRouter();

  function switchState() {
    setIsOpen(!isOpen);
  }
  useClickOutside(cardRef, () => {
    setIsOpen(false);
  });

  function GoToPerfil() {
    router(`/perfilUsuario`);
    setIsOpen(false);
  }
  function onLogout() {
    logout();
    setIsOpen(false);
  }

  return (
    <>
      <div ref={cardRef} className="flex flex-col items-center gap-3 p-4 ">
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.nombre?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            <div className="text-sm mx-3">
              <p className="font-semibold text-gray-800">{user.nombre}</p>
            </div>

            <div>
              <button
                aria-label="Menú de ajustes"
                onClick={switchState}
                className="p-1 rounded-md hover:bg-gray-100 active:bg-gray-200 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${
                    isOpen ? "rotate-90" : "rotate-0"
                  }`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  {isOpen ? (
                    /* Icono X (cuando está abierto) */
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    /* Icono de 3 puntos (cuando está cerrado) */
                    <>
                      <circle cx="12" cy="5" r="1.8" />
                      <circle cx="12" cy="12" r="1.8" />
                      <circle cx="12" cy="19" r="1.8" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Menu de Opciones  */}
        <div
          className={`w-full flex flex-col gap-2 transition duration-300 ease-in-out ${
            isOpen
              ? "max-h-40 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2 overflow-hidden"
          }`}
        >
          <button
            onClick={GoToPerfil}
            className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-500 hover:from-gray-600 hover:to-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg w-full justify-center"
          >
            Perfil
          </button>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg w-full justify-center"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  );
}
