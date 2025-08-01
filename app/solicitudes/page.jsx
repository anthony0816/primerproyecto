import { prisma } from "@/libs/prisma";
import { SolicitudesProvider } from "@/components/SolicitudesProvider";

export default async function Solicitudes() {
  const solicitudes = await prisma.solicitud.findMany({
    orderBy: {
      fecha: "desc",
    },
    include: {
      animal: true,
      usuario: true,
    },
  });
  return <SolicitudesProvider solicitudes={solicitudes}/>;
}
