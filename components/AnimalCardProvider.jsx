"use client";
import { useState, useEffect } from "react";
import { AnimalCard } from "./AnimalCard";

export default function AnimalCardProvider({ animales }) {
  const [Animales, setAnimales] = useState([]);
  const [noResults, setNoResulst] = useState(false);

  useEffect(() => {
    setAnimales(animales);
  }, []);

  function buscar(value) {
    if (!value.trim()) {
      setAnimales(animales);
    }
    const ArrayFiltrado = animales.filter((animal) => {
      const nombre = animal.nombre.toLowerCase() || "";
      const especie = animal.especie.toLowerCase() || "";
      const sexo = animal.sexo.toLowerCase() || "";

      return (
        nombre.includes(value.toLowerCase()) ||
        especie.includes(value.toLowerCase()) ||
        sexo.includes(value.toLowerCase())
      );
    });
    if (ArrayFiltrado.length === 0) setNoResulst(true);
    setAnimales(ArrayFiltrado);
  }
  if (Animales.length === 0 && noResults) {
    return (
      <>
        <div className="mb-6 max-w-1/2 my-4 mx-auto ">
          <input
            type="text"
            placeholder="🔍 Buscar por animal, usuario o descripción..."
            className="  w-full px-4 py-2 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            onChange={(e) => buscar(e.target.value)}
          />
        </div>

        <div className=" border p-5 rounded m-auto max-w-1/2 min-w-1/4 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <strong>Sin resultados de la busqueda</strong>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-6 max-w-1/2 my-4 mx-auto ">
        <input
          type="text"
          placeholder="🔍 Buscar por animal, usuario o descripción..."
          className="  w-full px-4 py-2 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          onChange={(e) => buscar(e.target.value)}
        />
      </div>

      {Animales.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </>
  );
}
