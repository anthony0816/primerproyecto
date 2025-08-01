import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  const { user_id } = await params;
  try {
    const notificaciones = await prisma.notificacion.findMany({
      where: {
        usuarioId: Number(user_id),
      },
      orderBy: {
        fecha: "desc",
      },
    });
    return NextResponse.json({
      notificaciones: notificaciones,
    });
  } catch (error) {
    return NextResponse.json({
      mensaje: "ocurrio un error",
      error: error.mensaje,
    });
  }
}
