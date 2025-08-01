import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  const { usuarioId, mensaje, contexto } = data;
  if (!usuarioId || !mensaje || !contexto) {
    return NextResponse.json({
      mensaje: "falta algun campo para crear la notificacion",
      notificacion: null,
    });
  }
  const notificacion = await prisma.notificacion.create({
    data: {
      usuarioId,
      mensaje,
      contexto,
    },
  });
  if (notificacion) {
    return NextResponse.json({
      mensaje: "Creado con exito",
      notificacion,
    });
  }
  return NextResponse.json({
    mensaje: "Error al crear puede que el usuario no exista ",
    notificacion: null,
  });
}
