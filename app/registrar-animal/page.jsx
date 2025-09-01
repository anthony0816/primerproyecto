import { prisma } from "@/libs/prisma";
import FormCrearAnimal from "@/components/FormCrearAnimal";
export default function RegistrarAnimal() {
  const CrearAnimal = async (data) => {
    "use server";
    const animal = await prisma.animal.create({
      data: data,
    });
    return animal;
  };

  const CrearImagenes = async (id, urls) => {
    "use server"
    const res = await prisma.imagen.createMany({
      data: urls.map((url) => ({
        url,
        animalId: id,
      })),
    });
    return res;
  };

  return (
    <>
      <FormCrearAnimal
        CrearAnimal={CrearAnimal}
        CrearImagenes={CrearImagenes}
      />
    </>
  );
}
