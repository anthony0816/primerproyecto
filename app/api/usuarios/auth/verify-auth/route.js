import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET(request) {
  const token = request.cookies.get("auth-token")?.value;
  if (!token) {
    return NextResponse.json(
      { valid: false, message: "Token no proporcionado" },
      { status: 401 }
    );
  }
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, JWT_SECRET); // Verifica firma y expiración

    return NextResponse.json({
      valid: true,
      user: decoded, // Contiene { id, nombre, email, rol }
    });
  } catch (error) {
    return NextResponse.json(
      { valid: false, message: "Token inválido o expirado" },
      { status: 401 }
    );
  }
}
