import { prisma } from "@/libs/prisma";
import { SolicitudesProvider } from "@/components/SolicitudesProvider";

export default async function Solicitudes() {
  async function getSolicitudes() {
    const solicitudes = await prisma.solicitud.findMany({
      orderBy: {
        fecha: "desc",
      },
      include: {
        animal: true,
        usuario: true,
      },
    });
    return solicitudes;
  }
  const solicitudes = await getSolicitudes();
  return <SolicitudesProvider solicitudes={solicitudes} />;
}
