import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const { id } = data;
    console.error("ID PASADO AL BACKEND", id);

    const unReads = await prisma.notificacion.updateMany({
      where: {
        usuarioId: Number(id),
      },
      data: {
        leido: true,
      },
    });
    
    return NextResponse.json({
      notificacines: unReads,
      mensaje: "Actualizado correctamente",
    });
  } catch (error) {
    console.log(
      "error al actualizar el estado de las notificaciones:",
      error,
      error.mensaje
    );
    return NextResponse.json({
      mensaje: "server error : " + error,
      notificacines: null,
    });
  }
}
