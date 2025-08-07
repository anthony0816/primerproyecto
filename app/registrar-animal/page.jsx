
import { prisma } from "@/libs/prisma";
import FormCrearAnimal from "@/components/FormCrearAnimal";
export default function RegistrarAnimal() {
  const CrearAnimal = async (data) => {
    "use server"
    const animal = await prisma.animal.create({
      data:data
    });
    return animal;
  };

  return (
    <>
      <FormCrearAnimal callBackFunction={CrearAnimal}/>
    </>
  );
}
