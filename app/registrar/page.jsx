"use client";
import Link from "next/link";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadindSniper";
import { useRouter } from "next/navigation";
import { useNotifi } from "@/context/notifiContext";

export default function registrar() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pas, setPas] = useState("");
  const [confirmPas, setConfirmPas] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [showPas, setShowPas] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const router = useRouter();
  const { ShowNotification } = useNotifi();
  


  async function handleCreate() {
    SetIsLoading(true);
    console.log("nombre, email....", nombre, email, pas, confirmPas);
    if (pas != confirmPas) {
      setMensaje("Las contraseñas no coinciden");
      SetIsLoading(false);
      return;
    } else {
      if (!nombre || !email || !pas || !confirmPas) {
        setMensaje("Todos los campos son requeridos");
        SetIsLoading(false);
        return;
      }
      const usuarios = await (await fetch("/api/usuarios")).json();
      let stop = false;
      usuarios.forEach((user) => {
        if (user.email == email) {
          setMensaje("Email ya existe");
          stop = true;
          return;
        }
        if (user.nombre == nombre) {
          setMensaje("Nombre de usuario ya Existe");
          stop = true;
          return;
        }
      });
      if (stop) {
        SetIsLoading(false);
        return;
      }
    }
    const user = await createUser(nombre, email, pas);
    ShowNotification(`usuario: ${user.nombre} creado con exito`);
    SetIsLoading(false);
    router.push("/login");
  }

  async function createUser(nombre, email, password) {
    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-type": "Aplication/json",
        },
        body: JSON.stringify({
          nombre,
          email,
          password,
        }),
      });
      const { usuario } = await response.json();
      return usuario;
    } catch (error) {
      console.log("ocurrio un error al crear el usuario:", error.mensaje);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 p-6 space-y-6 font-comic">
      <div className="text-lg font-bold text-purple-700">
        {mensaje ? (
          <span className="text-red-500">{mensaje}</span>
        ) : (
          "🧙 Registro de Usuario"
        )}
      </div>
      {isLoading ? <LoadingSpinner text={"Validando"} /> : null}
      <input
        type="text"
        required
        placeholder="👤 Nombre"
        onChange={(e) => setNombre(e.target.value)}
        className="px-4 py-2 rounded-lg border-2 border-pink-400 bg-white text-pink-600 placeholder-pink-400 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      <input
        type="email"
        required
        placeholder="📧 Email"
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 rounded-lg border-2 border-purple-400 bg-white text-purple-600 placeholder-purple-400 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <div>
        <input
          type={showPas ? "text" : "password"}
          required
          placeholder="🔒 Contraseña"
          onChange={(e) => setPas(e.target.value)}
          className="px-4 py-2 rounded-lg border-2 border-blue-400 bg-white text-blue-600 placeholder-blue-400 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div onClick={() => setShowPas(!showPas)} className="cursor-pointer">
          {showPas ? "ocultar" : "mostrar"}
        </div>
      </div>

      <div>
        <input
          type={showPas ? "text" : "password"}
          required
          placeholder="🔒 Confirmar Contraseña"
          onChange={(e) => setConfirmPas(e.target.value)}
          className="px-4 py-2 rounded-lg border-2 border-blue-400 bg-white text-blue-600 placeholder-blue-400 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div onClick={() => setShowPas(!showPas)} className="cursor-pointer">
          {showPas ? "ocultar" : "mostrar"}
        </div>
      </div>

      <div className="flex justify-around w-70">
        <button
          onClick={() => handleCreate()}
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          🚀 Registrarse
        </button>
        <Link href={"/login"}>
          <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300">
            volver
          </button>
        </Link>
      </div>
    </div>
  );
}
