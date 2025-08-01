"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function ProtectedRouter({ children }) {
  const { user,verify_auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function loadVerify() {
      const authUser = await verify_auth();
      if (!authUser) {
        console.log("usuario vacío, redirigiendo...");
        router.push("/login");
      }
    }
    loadVerify();
  }, [user,router]);

  // Mientras se redirige, puedes evitar renderizar el contenido:
  // if (!user) return null;

  return <>{children}</>;
}
