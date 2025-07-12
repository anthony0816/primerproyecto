import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
export async function GET(request,{params}){
    const {idAnimal} = await params
    const solicitudes = await prisma.solicitud.findMany({
        where:{
            animal_id: Number(idAnimal)
        },
        include:{
            animal: true,
            usuario: true
        }
    })
    return NextResponse.json(solicitudes)
}