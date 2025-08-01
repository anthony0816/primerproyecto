import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = {
      animal: { nombre: "paco" },
      usuario: { nombre: "manolo" },
      descripcion: "cuakquier cosa",
    };
    const { animal, usuario, descripcion } = data;

    const solicitud = await prisma.solicitud.create({
      data: {
        animal,
        usuario,
        descripcion,
      },
    });

    return NextResponse.json({ solicitud: solicitud });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { animal, usuario, descripcion } = data;

    // const usuarioId = Number(usuario);
    // const animalId = Number(animal);

    // // // Validación preventiva
    // // if (isNaN(usuarioId) || isNaN(animalId)) {
    // //   return NextResponse.json({ error: "ID inválido para usuario o animal" });
    // // }

    // // const oldsolicitud = await prisma.solicitud.findMany({
    // //   where: {
    // //     animal_id: animal,
    // //     usuarioId: usuario,
    // //   },
    // // });
    // // console.log("rngvnrwnburwnubntehbnrjrt",oldsolicitud)

    // // if (oldsolicitud.length == 1 || oldsolicitud.length > 1) {
    // //   return NextResponse.json({
    // //     error: "Ya solicitaste a este animal, imposible una nueva solicitud",
    // //   });
    // // }

    const solicitud = await prisma.solicitud.create({
      data: {
        animal,
        usuario,
        descripcion,
      },
    });

    return NextResponse.json({ solicitud: solicitud });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return NextResponse.json({ error: error.message });
  }
}
