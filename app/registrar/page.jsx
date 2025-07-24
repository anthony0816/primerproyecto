"use client";
import Link from "next/link";
import { useState } from "react";
export default function registrar() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pas, setPas] = useState("");
  const [confirmPas,setConfirmPas]= useState("")
  const [mensaje,setMensaje]= useState(null)

  function handleCreate() {

    console.log("nombre, email....", nombre,email,pas,confirmPas);
    if(pas != confirmPas){
        setMensaje("Las contraseñas no coinciden")
        return
    }else{
        console.log("hola")
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 p-6 space-y-6 font-comic">
      <div className="text-lg font-bold text-purple-700">
        {mensaje? (<span className="text-red-500">{mensaje}</span>):"🧙 Registro de Usuario"}
      </div>

      <input
        type="text"
        placeholder="👤 Nombre"
        onChange={(e)=>setNombre(e.target.value)}
        className="px-4 py-2 rounded-lg border-2 border-pink-400 bg-white text-pink-600 placeholder-pink-400 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500"
      />

      <input
        type="email"
        placeholder="📧 Email"
        onChange={(e)=>setEmail(e.target.value)}
        className="px-4 py-2 rounded-lg border-2 border-purple-400 bg-white text-purple-600 placeholder-purple-400 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <input
        type="password"
        placeholder="🔒 Contraseña"
        onChange={(e)=>setPas(e.target.value)}
        className="px-4 py-2 rounded-lg border-2 border-blue-400 bg-white text-blue-600 placeholder-blue-400 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="🔒 Confirmar Contraseña"
        onChange={(e)=>setConfirmPas(e.target.value)}
        className="px-4 py-2 rounded-lg border-2 border-blue-400 bg-white text-blue-600 placeholder-blue-400 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

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
