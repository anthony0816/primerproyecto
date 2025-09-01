"use client";
import ModalAdopcion from "./ModalAdopcion";
import { useRef } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export function AnimalCard({ animal }) {
  const modalAdopcionRef = useRef();
  const { user } = useAuth();
  const router = useRouter()

  function handleAdopcion(animal) {
    if (modalAdopcionRef.current) {
      if(user){
        modalAdopcionRef.current.open(animal, user);
      }
    }
  }
  return (
    <>
      <ModalAdopcion ref={modalAdopcionRef} />
      <div
        key={animal.id}
        className="my-10 p-2 border rounded-lg mx-2  max-w-350 mx-auto"
      >
        <div className="flex flex-row items-center">
          <div className="flex-1">
            {animal.imagenes.length < 1 ? (
              <>
                <img
                  src="file.svg"
                  alt="imagen de perfil fallida"
                  className="max-w-100"
                />
              </>
            ) : (
              <>
                <img
                  src={`${animal.imagenes[0].url}`}
                  alt="Imagen de foto de perfil"
                  className="max-w-100 max-h-100 rounded-xl"
                />
              </>
            )}
          </div>

          <div className="flex-1  max-h-100 overflow-hidden">
            <h2>{animal.nombre}</h2>
            <div className="my-10 ">
              <h3>Info:</h3>
              <p>Sexo: {animal.sexo}</p>
              <p> Atenciones Medicas: {animal.atenciones.length}</p>
              <p>Solicitudes de adopcion: {animal.solicitudes.length}</p>
            </div>

            <div className="">
              <h3>Acciones:</h3>
              <div className="w-1/2 my-5 flex justify-around min-w-60">
                <button
                  className="bg-green-300 hover:bg-green-400 rounded-lg p-1 px-2 transition"
                  onClick={() => handleAdopcion(animal)}
                >
                  Solicitar Adopcion
                </button>
                <button className="bg-blue-300 hover:bg-blue-400 rounded-lg p-1 px-2 transition"
                onClick = {()=>{
                  router.push(`/mascotas/${animal.id}`)
                }}
                >
                  Ver perfil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
