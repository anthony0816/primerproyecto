"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotifi } from "@/context/notifiContext";
import ImageUploader from "@/components/ImageUploader";

// 1. Define los enums como arrays
const especies = ["perro", "gato", "hamster", "ave"];
const sexos = ["macho", "hembra"];

// 2. Esquema de validación con Zod
const schema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  especie: z.enum(especies, {
    errorMap: () => ({ message: "Selecciona una especie válida" }),
  }),
  fecha_nacido: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha inválida",
  }),
  sexo: z.enum(sexos, {
    errorMap: () => ({ message: "Selecciona un sexo válido" }),
  }),
  paraAdopcion: z.boolean().optional(),
});

export default function FormCrearAnimal({ CrearAnimal, CrearImagenes }) {
  const { ShowNotification } = useNotifi();
  const [urls, setUrls] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    // Convierte fecha a Date si lo necesitas
    const payload = {
      ...data,
      fecha_nacido: new Date(data.fecha_nacido),
    };
    console.log("Animal a crear:", payload);
    console.log("Animal real:", data);
    // Aquí haces el fetch o mutation

    const toSave = {
      ...data,
      fecha_nacido: new Date(data.fecha_nacido).toISOString(),
    };

    const animal = await CrearAnimal(toSave);
    if (animal.id) {
      if (urls.length > 0) {
        const res = await CrearImagenes(animal.id, urls);
        const { count } = res;
        ShowNotification("Creado Correctamente")
        if (!count) ShowNotification("Error adjunando imagenes");
      } else {
        ShowNotification("No se pudo cargar las imagenes sin embargo se creo el perfil");
      }
    } else {
      ShowNotification("Error creando animal");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg shadow-xl max-w-2xl mx-auto border border-gray-200 overflow-hidden my-20"
    >
      {/* Cabecera */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-400 p-4">
        <h2 className="text-xl font-bold text-white">Crear Animal</h2>
      </div>

      {/* Cuerpo */}
      <div className="p-6 space-y-6">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            {...register("nombre")}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Nombre del animal"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
          )}
        </div>

        {/* Especie */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Especie
          </label>
          <select
            {...register("especie")}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Selecciona una especie</option>
            {especies.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
          {errors.especie && (
            <p className="text-red-500 text-sm mt-1">
              {errors.especie.message}
            </p>
          )}
        </div>

        {/* Fecha de nacimiento */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            {...register("fecha_nacido")}
            className="mt-1  p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          />
          {errors.fecha_nacido && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fecha_nacido.message}
            </p>
          )}
        </div>

        {/* Sexo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sexo
          </label>
          <select
            {...register("sexo")}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Selecciona el sexo</option>
            {sexos.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.sexo && (
            <p className="text-red-500 text-sm mt-1">{errors.sexo.message}</p>
          )}
        </div>

        {/* Para adopción */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("paraAdopcion")} />
          <label className="text-sm text-gray-700">
            Disponible para adopción
          </label>
        </div>
      </div>

      <div>
        <ImageUploader setUrls={setUrls} />
      </div>

      {/* Pie */}
      <div className="bg-gray-50 px-6 py-4 text-right border-t border-gray-200">
        <button
          type="submit"
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          Registrar Animal
        </button>
      </div>
    </form>
  );
}
