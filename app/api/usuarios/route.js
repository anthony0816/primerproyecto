import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function GET() {
  const usuarios = await prisma.usuario.findMany();
  return NextResponse.json(usuarios);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { nombre, email, password, rol } = data;

    const hashedPasword = await bcrypt.hash(password, 10);
    const user = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: hashedPasword,
        rol,
      },
    });
    const { password: _, ...safeUser } = user;
    return NextResponse.json({ usuario: safeUser });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return NextResponse.json({ error: error.message });
  }
}
/* 

*/
