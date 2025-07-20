"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function ProtectedRouter({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.log("usuario vacío, redirigiendo...");
      router.push("/login");
    }
  }, [user, router]);

  // Mientras se redirige, puedes evitar renderizar el contenido:
//   if (!user) return null;

  return <>{children}</>;
}