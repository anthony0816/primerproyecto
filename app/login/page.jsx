"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import LoadingSpinner from "@/components/LoadindSniper";
import Link from "next/link";
import { useNotifi } from "@/context/notifiContext";

export default function login() {
  const [mensaje, setMensaje] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPasword] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { ShowNotification } = useNotifi();

  const fetchData = async () => {
    setLoading(true);
    const usuario = await login(username, password);
    if (usuario) {
      ShowNotification(`Usuario: ${usuario.nombre} autenticado exitosamente`);
      router.push("/");
      setLoading(false);
      setMensaje("");
      return;
    }
    setMensaje("usuario o contraseña incorrectos");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 p-6 space-y-6 font-comic">
      <div className="text-lg font-bold text-purple-700">
        {mensaje ? (
          <span className="text-red-500">{JSON.stringify(mensaje)}</span>
        ) : (
          "🧙 Nombre y contraseña"
        )}
      </div>
      {loading ? <LoadingSpinner text={"Verificanco Identidad"} /> : null}

      <input
        type="text"
        placeholder="👤 Nombre"
        onChange={(e) => setUsername(e.target.value)}
        className="px-4 py-2 rounded-lg border-2 border-pink-400 bg-white text-pink-600 placeholder-pink-400 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      <div className="flex flex-col aling-center relative">
        <input
          type={mostrarContrasena ? "text" : "password"}
          placeholder="🔒 Contraseña"
          onChange={(e) => setPasword(e.target.value)}
          className="px-4 py-2 rounded-lg border-2 border-blue-400 bg-white text-blue-600 placeholder-blue-400 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div
          onClick={() => setMostrarContrasena(!mostrarContrasena)}
          className="cursor-pointer"
        >
          {mostrarContrasena ? "Ocultar" : "Mostrar"}
        </div>
      </div>

      <button
        onClick={() => fetchData()}
        className="px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
      >
        🚀 Aceptar
      </button>
      <Link href={"/registrar"}>
        <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300">
          Crear Cuenta
        </button>
      </Link>
    </div>
  );
}
