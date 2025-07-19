import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function GET() {
  const usuarios = await prisma.usuario.findMany();
  return NextResponse.json(usuarios);
}

export async function POST(request) {
  const data = await request.json();
  const { username, pas } = data;

  if (!username || !pas) {
    return NextResponse.json("ERROR: falta uno de los parametros");
  }
  const usuario = await prisma.usuario.findMany({
    where: {
      nombre: username,
    },
  });

  if (usuario.length == 1) {
    const valido = await bcrypt.compare(pas, usuario[0].password);
    if (valido) {
      const JWT_SECRET = process.env.JWT_SECRET;
      const token = jwt.sign(
        {
          id: usuario[0].id,
          nombre: usuario[0].nombre,
          email: usuario[0].email,
          rol: usuario[0].rol,
        },
        JWT_SECRET,
        { expiresIn: "2h" }
      );
      const { password, ...usuarioseguro } = usuario[0];
      return NextResponse.json({
        usuario: usuarioseguro,
        token: token
      });
    } else {
      return NextResponse.json("usuario o contraseña incorrectos");
    }
  }
  if (usuario.length < 1) {
    return NextResponse.json("usuario o contraseña incorrectos");
  } else {
    return NextResponse.json("existe mas de un usuario con el mismo nombre");
  }
}
