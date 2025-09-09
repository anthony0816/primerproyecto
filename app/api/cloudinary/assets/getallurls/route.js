import { useClaudinary } from "@/libs/cloudinary";
import { NextResponse } from "next/server";
const cloudinary = useClaudinary();

// hay que asegurar este endpoint pq es peligroso si no hay una sesion activa acceder a estos datos
export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      max_results: 500, // puedes paginar si tienes más
    });

    const urls = result.resources.map((img) => img.secure_url);

    return new Response(JSON.stringify(urls), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error al recuperar imágenes:", err);
    return new Response("Error interno al recuperar imágenes", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const { dbUrls } = data;
    console.log("data,", data, dbUrls);
    
  const result = await cloudinary.api.resources({
    
  });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json("Error, algo sali mal", err, { status: 500 });
  }
}
