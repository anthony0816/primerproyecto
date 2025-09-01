import { prisma } from "@/libs/prisma";
import { AnimalCard } from "@/components/AnimalCard";
import AnimalCardProvider from "@/components/AnimalCardProvider";

export default async function MascotasPage() {
  let animales = await prisma.animal.findMany({
    include: {
      solicitudes: true,
      atenciones: true,
      imagenes: true,
    },
  });

  console.log("Animales de prisma", animales, animales.length);

  if (animales.length < 1) {
    return (
      <>
        <div> Ha ocurrido un error </div>
      </>
    );
  }
  return <AnimalCardProvider animales={animales}/>
}
