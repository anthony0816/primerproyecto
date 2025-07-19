import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
  const usuario = await prisma.usuario.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!usuario) {
    return NextResponse.json({
      data: undefined,
      mensaje: "error , puede que no exista el usuario con ese id ",
    });
  }
  return NextResponse.json({
    data: usuario,
    mensaje: "exitoso",
  });
}

