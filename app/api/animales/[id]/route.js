import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const animal = await prisma.animal.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        atenciones: true,
        solicitudes: true,
        imagenes: true,
      },    
    });
    return NextResponse.json(animal);
  } catch (error) {
    console.log("ocurrio un error", error, error.mensaje);
    return NextResponse.json(null);
  }
}
