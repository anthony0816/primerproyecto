import { prisma } from "@/libs/prisma";
import TablaAnimales from "@/components/TablaAnimales";
export default async function AdopcionPage() {
  const animales = await prisma.animal.findMany({
    include: {
      atenciones: true,
      solicitudes: true,
    },
  });

  console.log("animales", animales);
  return (
   <TablaAnimales animales = {animales}/>
  );
}
