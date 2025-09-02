import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("hola mundo");
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { animal, usuario, descripcion } = data;
    const solicitud = await prisma.solicitud.create({
      data: {
        animal,
        usuario,
        descripcion,
      },
    });

    return NextResponse.json({ solicitud: solicitud });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(request) {
  const data = await request.json();
  const { animalId, userId } = data;
  const res = await prisma.solicitud.deleteMany({
    where: {
      animal_id: animalId,
      usuarioId: userId,
    },
  });
  return NextResponse.json(res);
}
