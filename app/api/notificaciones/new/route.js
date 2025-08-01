import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  const { id } = data;

  const unReads = await prisma.notificacion.findMany({
    where: {
      usuarioId: id,
      leido: false,
    },
  });

  if (unReads.length >= 1) {
    return NextResponse.json({
      estado: true,
      cantidad: unReads.length,
    });
  }
  return NextResponse.json({
    estado: false,
    cantidad: null,
  });
}
