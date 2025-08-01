import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("auth-token")?.value;

  // Si NO hay token, redirige al login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Si hay token, continúa el flujo
  return NextResponse.next();
}

export const config = {
  matcher: ["/","/adopcion", "/about","/notificaciones","/solicitudes"], 
};