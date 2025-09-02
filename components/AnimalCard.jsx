"use client";
import ModalAdopcion from "./ModalAdopcion";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { EliminarSolicitud } from "@/libs/api";


export function AnimalCard({ Animal }) {
  const modalAdopcionRef = useRef();
  const { user } = useAuth();
  const router = useRouter();
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    setAnimal(Animal);
  }, []);

  function handleAdopcion() {

    const AddSolicitudToAnimal = (solicitud) => {
      const newAnimal = {
        ...animal,
        solicitudes: animal.solicitudes.push(solicitud),
      };
    };

    if (modalAdopcionRef.current) {
      if (user) {
        modalAdopcionRef.current.open(animal, user, AddSolicitudToAnimal);
      }
    }
  }
  function handleCancelarSolicitud(animalId, userId) {
    async function execute() {
      const data = await EliminarSolicitud(animalId, userId);

      const { count } = data;
      if (count) {
        const newAnimal = {
          ...animal,
          solicitudes: animal.solicitudes.filter((solicitud) => {
            return !(
              solicitud.usuarioId == userId && solicitud.animal_id == animalId
            );
          }),
        };
        setAnimal(newAnimal);
      }
    }
    execute();
  }

  function VerifyExistentSolicitud() {
    let boolean = false;
    animal.solicitudes.forEach((sol) => {
      if (sol.usuarioId == user?.id) {
        boolean = true;
        return;
      }
    });
    return boolean;
  }

  if (animal == null) return null;

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
              <p>Especie: {animal.especie}</p>
              <p>Sexo: {animal.sexo}</p>
              <p> Atenciones Medicas: {animal.atenciones.length}</p>
              <p>Solicitudes de adopcion: {animal.solicitudes.length}</p>
            </div>

            <div className="">
              <h3>Acciones:</h3>
              <div className="w-1/2 my-5 flex justify-around min-w-60">
                {user?.rol == "cliente" ? (
                  <>
                    {!VerifyExistentSolicitud() ? (
                      <button
                        className="bg-green-300 hover:bg-green-400 rounded-lg p-1 px-2 transition"
                        onClick={() => handleAdopcion()}
                      >
                        Solicitar Adopcion
                      </button>
                    ) : (
                      <>
                        <button
                          className="bg-red-300 hover:bg-red-400 rounded-lg p-1 px-2 transition"
                          onClick={() =>
                            handleCancelarSolicitud(animal.id, user?.id)
                          }
                        >
                          Eliminar Solicitud
                        </button>
                      </>
                    )}
                  </>
                ) : null}

                <button
                  className="bg-blue-300 hover:bg-blue-400 rounded-lg p-1 px-2 transition"
                  onClick={() => {
                    router.push(`/mascotas/${animal.id}`);
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
