import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
export async function GET(request, {params}) {
  const {idAnimal} =  await params;
  const consultas = await prisma.atencionMedica.findMany({
    where: {
      animalId: Number(idAnimal),
    },
    include: {
      consulta: true,
      vacunacion: true,
    },
  });
  return NextResponse.json(consultas);
}
