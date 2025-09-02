"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useNotifi } from "@/context/notifiContext";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser, logout, verify_auth } = useAuth();
  const {
    ShowNotification,
    VerifyNewNotifications,
    newNotifications,
    setNewNotifications,
  } = useNotifi();

  useEffect(() => {
    console.log("ejecutando useEffect");
    async function loadAuth() {
      const currentUser = await verify_auth();
      if (currentUser) {
        setUser(currentUser);
        return currentUser;
      }
    }
    loadAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      setNewNotifications(null);
      return;
    }
    async function verify() {
      await VerifyNewNotifications(user.id);
    }
    verify();
  }, [user]);

  const navItems = [
    {name: "Mascotas", href: "/mascotas"},
    { name: "Adopción", href: "/adopcion" },
    
  ];
  if (user) {
    if (user.rol == "administrador") {
      navItems.push(
        { name: "Solicitudes", href: "/solicitudes" },
        { name: "Registrar Animal", href: "/registrar-animal" }
      );
    }
  }
  navItems.push({ name: "About us", href: "/about" });

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo con gradiente animado */}
          <Link
            href="/"
            className="flex items-center text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-pink-600 hover:to-orange-500 transition-all duration-500"
          >
            Clínica Veterinaria
          </Link>

          {/* Menú Hamburguesa (mobile) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition"
              aria-label="Menú"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Links de navegación (desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </div>
          {/* boton de cerrar sesion */}
          <div className="flex aling-center">
            {user ? (
              <>
                <div className="flex flex-col aling-center">
                  <p> Sesion: {user.nombre}</p>
                  <button
                    onClick={async () => {
                      await logout();
                      ShowNotification(
                        `Usuario: ${user.nombre} deslogueado correctamente`
                      );
                    }}
                    className="bg-red-200"
                  >
                    Cerrar Sesion
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
          {/* Notificaciones */}
          <div className="flex items-center">
            <Link href={"/notificaciones"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3c0 .386-.145.735-.405 1.001L4 17h5m6 0a3 3 0 01-6 0h6z"
                />
              </svg>
            </Link>

            {newNotifications ? (
              <Link href={"/notificaciones"}>
                <div className=" bg-red-600 px-1 rounded-lg text-center">
                  <span className="text-white font-bold cursor-pointer">
                    {newNotifications}
                  </span>
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      {/* Menú móvil (animado) */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {navItems.map((item) => (
            <MobileNavLink
              key={item.name}
              item={item}
              onClick={() => setIsMenuOpen(false)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

// Componente para links de desktop (con subrayado animado)
function NavLink({ item }) {
  return (
    <Link
      href={item.href}
      className={`relative px-1 py-2 text-sm font-medium transition-all duration-300 ${
        item.href === "#"
          ? "text-gray-400 cursor-not-allowed"
          : "text-gray-700 hover:text-indigo-600 group"
      }`}
    >
      {item.name}
      {item.href !== "#" && (
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
      )}
    </Link>
  );
}

// Componente para links móviles (con efecto de click)
function MobileNavLink({ item, onClick }) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
        item.href === "#"
          ? "text-gray-400 cursor-not-allowed"
          : "text-gray-700 hover:text-white hover:bg-indigo-600"
      }`}
    >
      {item.name}
    </Link>
  );
}
