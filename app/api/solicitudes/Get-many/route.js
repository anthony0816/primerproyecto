import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request) {
  return NextResponse.json("hola mundo");
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("data en el BACKEND:", data);
    const solicitudes = await prisma.solicitud.findMany({
      where: data,
    });
    return NextResponse.json(solicitudes);
  } catch (error) {
    return NextResponse.json({
      mensaje: "error",
      data: null,
    });
  }
}
