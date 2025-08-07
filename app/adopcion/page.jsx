import { prisma } from "@/libs/prisma";
import TablaAnimales from "@/components/TablaAnimales";
export default async function AdopcionPage() {

  async function FetchAnimales() {
    "use server"
    const animales = await prisma.animal.findMany({
      include: {
        atenciones: true,
        solicitudes: true,
      },
    });
    return animales;
  }

  const Delete = async (ids) => {
    "use server";
    const deleted = await prisma.animal.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return deleted;
  };
  
  const animales = await FetchAnimales()
  console.log("animales", animales);

  return <TablaAnimales animales={animales} FunctionDelete={Delete} FetchAnimales={FetchAnimales}/>;
}
