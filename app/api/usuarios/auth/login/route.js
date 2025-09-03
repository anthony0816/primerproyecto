import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request) {
  const data = await request.json();
  const { username, pas } = data;

  if (!username || !pas) {
    return NextResponse.json({
      usuario: undefined,
      token: undefined,
      mensaje: "Falta uno de los dos parametros",
    });
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
        { expiresIn: "7d" }
      );
      const { password, ...usuarioseguro } = usuario[0];

      const cookie = serialize("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 horas
      });

      const response = NextResponse.json({
        usuario: usuarioseguro,
        token: token,
        mensaje: "Autenticado",
      });

      response.headers.set("Set-Cookie", cookie);
      return response;
    } else {
      return NextResponse.json({
        usuario: undefined,
        token: undefined,
        mensaje: "Usuario o contraseña incorrectos",
      });
    }
  }
  if (usuario.length < 1) {
    return NextResponse.json({
      usuario: undefined,
      token: undefined,
      mensaje: "Usuario o contraseña incorrectos",
    });
  } else {
    return NextResponse.json("existe mas de un usuario con el mismo nombre");
  }
}
