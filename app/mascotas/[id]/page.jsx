"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";

export default function Perfil() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animal, setAnimal] = useState(null);
  const [dataUsers, setDataUsers] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    async function loadAnimal() {
      const response = await fetch(`/api/animales/${id}`);
      const animal = await response.json();
      if (animal == null) {
        // para cuando exista un error
        return;
      }
      setAnimal(animal);
      animal.solicitudes.forEach((sol) => {
        getUserData(sol.usuarioId);
      });
    }
    loadAnimal();
  }, []);

  function getUserData(userId) {
    async function loadUser(userId) {
      const res = await fetch(`/api/usuarios/${userId}`);
      const data = await res.json();
      if (data.data == null) return;
      setDataUsers((prev) => ({ ...prev, [userId]: data.data }));
    }
    loadUser(userId);
  }

  const openModal = (imagen, index) => {
    setSelectedImage(imagen);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % animal.imagenes.length;
    setSelectedImage(animal.imagenes[nextIndex]);
    setCurrentImageIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex =
      (currentImageIndex - 1 + animal.imagenes.length) % animal.imagenes.length;
    setSelectedImage(animal.imagenes[prevIndex]);
    setCurrentImageIndex(prevIndex);
  };

  if (animal == null) return null;

  return (
    <>
      {/* Modal para imagen ampliada */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 cursor-pointer"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 z-10 bg-black/50 rounded-full p-2 w-10 h-10 flex items-center justify-center"
            >
              ✕
            </button>

            {animal.imagenes.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black/50 rounded-full p-3 hover:bg-black/70 transition-colors"
                >
                  ›
                </button>
              </>
            )}

            <img
              src={selectedImage.url}
              alt="Imagen ampliada"
              className="max-w-full max-h-screen object-contain rounded-lg"
            />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {animal.imagenes.length}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header con imagen y nombre */}
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center">
            {animal.imagenes && animal.imagenes.length > 0 ? (
              <img
                src={animal.imagenes[0].url}
                alt={animal.nombre}
                className="h-40 w-40 rounded-full object-cover border-4 border-white shadow-lg cursor-pointer"
                onClick={() => openModal(animal.imagenes[0], 0)}
              />
            ) : (
              <div className="h-40 w-40 rounded-full bg-white/20 flex items-center justify-center border-4 border-white">
                <span className="text-6xl">🐾</span>
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-6 bg-white px-4 py-2 rounded-full shadow-md">
            <h1 className="text-2xl font-bold text-gray-800">
              {animal.nombre}
            </h1>
          </div>
        </div>

        {/* Información básica */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Información Básica
              </h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-gray-500 w-32">Especie:</span>
                  <span className="font-medium capitalize">
                    {animal.especie}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-32">
                    Fecha de Nacimiento:
                  </span>
                  <span className="font-medium">
                    {new Date(animal.fecha_nacido).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-32">Sexo:</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      animal.sexo === "macho"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-pink-100 text-pink-800"
                    }`}
                  >
                    {animal.sexo === "macho" ? "♂ Macho" : "♀ Hembra"}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-32">Estado:</span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      animal.paraAdopcion
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {animal.paraAdopcion
                      ? "🟢 Disponible para adopción"
                      : "🔴 No disponible"}
                  </span>
                </div>
              </div>
            </div>

            {/* GALERÍA DE IMÁGENES */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Galería de Imágenes
              </h2>
              {animal.imagenes && animal.imagenes.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {animal.imagenes.map((imagen, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => openModal(imagen, index)}
                    >
                      <img
                        src={imagen.url}
                        alt={`${animal.nombre} ${index + 1}`}
                        className="w-full h-24 object-cover shadow-md transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2">
                        <span className="text-white text-xs font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          Ver más
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-100 rounded-lg">
                  <div className="text-gray-400 mb-2">
                    <svg
                      className="w-12 h-12 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">
                    No hay imágenes disponibles
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    Sube la primera foto de {animal.nombre}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {/* Historial médico */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Atenciones Médicas
              </h2>
              {animal.atenciones && animal.atenciones.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {animal.atenciones.map((atencion) => (
                    <div
                      key={atencion.id}
                      className="border-l-4 border-indigo-400 pl-3 py-2"
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-medium capitalize">
                          {atencion.tipo}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(atencion.fecha).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Veterinario: {atencion.veterinario.replace(/_/g, " ")}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No hay atenciones médicas registradas
                </p>
              )}
            </div>

            {/* Solicitudes de adopción */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Solicitudes de Adopción
              </h2>
              {animal.solicitudes && animal.solicitudes.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {animal.solicitudes.map((solicitud) => (
                    <div
                      key={solicitud.id}
                      className={`p-3 rounded-lg border ${
                        solicitud.estado === "aceptado"
                          ? "bg-green-50 border-green-200"
                          : solicitud.estado === "denegado"
                          ? "bg-red-50 border-red-200"
                          : "bg-yellow-50 border-yellow-200"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium">
                          Usuario :{" "}
                          {user?.id == solicitud.usuarioId
                            ? "Tú"
                            : dataUsers[solicitud.usuarioId]?.nombre}{" "}
                          <br />
                          <span className="text-gray-600">
                            Email : {dataUsers[solicitud.usuarioId]?.email}
                          </span>
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            solicitud.estado === "aceptado"
                              ? "bg-green-200 text-green-800"
                              : solicitud.estado === "denegado"
                              ? "bg-red-200 text-red-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {solicitud.estado}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {new Date(solicitud.fecha).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No hay solicitudes de adopción</p>
              )}
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="bg-indigo-50 p-4 border-t">
          <div className="flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-indigo-700">
                {animal.atenciones?.length || 0}
              </p>
              <p className="text-sm text-indigo-600">Atenciones</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-700">
                {animal.solicitudes?.filter((s) => s.estado === "aceptado")
                  .length || 0}
              </p>
              <p className="text-sm text-indigo-600">Adopciones</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-700">
                {animal.imagenes?.length || 0}
              </p>
              <p className="text-sm text-indigo-600">Fotos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-700">
                {new Date().getFullYear() -
                  new Date(animal.fecha_nacido).getFullYear()}
              </p>
              <p className="text-sm text-indigo-600">Años</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
