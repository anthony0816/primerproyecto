"use client";
import { SolicitudesCard } from "./SolicitudesCard";
import { useState, useEffect } from "react";

export function SolicitudesProvider({ solicitudes }) {
  const [data, setData] = useState([]);
  const [finder, setFinder] = useState("");

  useEffect(() => {
    setData(solicitudes);
  }, []);

  useEffect(() => {
    console.log("se ejecuta este");
    // aqui quiero hacer la logica de ordenamiento cuando se escriba en el input text
    filtrar();
  }, [finder]);

  function filtrar() {
    if (!finder.trim()) {
      setData(solicitudes);
      return;
    }
    const filtradas = solicitudes.filter((sol) => {
      const nombreAnimal = sol.animal?.nombre?.toLowerCase() || "";
      const nombreUsuario = sol.usuario?.nombre?.toLowerCase() || "";
      const descripcion = sol.descripcion?.toLowerCase() || "";

      return (
        nombreAnimal.includes(finder.toLowerCase()) ||
        nombreUsuario.includes(finder.toLowerCase()) ||
        descripcion.includes(finder.toLowerCase())
      );
    });
    setData(filtradas);
  }

  console.log("solicitudes Provider:", solicitudes);
  return (
    <>
      <section className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Buscar por animal, usuario o descripción..."
          className="w-full px-4 py-2 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          onChange={(e) => setFinder(e.target.value)}
        />
      </div>

      {data.length < 1 ? (
        <div className="text-center text-gray-500 bg-purple-100 p-4 rounded-lg shadow-sm">
          <strong>😕 Sin coincidencias</strong>
        </div>
      ) : (
        <div className="grid gap-4">
          {data.map((sol) => (
            <SolicitudesCard key={sol.id} solicitud={sol} />
          ))}
        </div>
      )}
    </section>
    </>
  );
}
