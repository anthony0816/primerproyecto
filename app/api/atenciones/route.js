import { prisma } from "@/libs/prisma"
import { NextResponse } from "next/server"
export async function GET(){
    const consultas = await prisma.atencionMedica.findMany({
        include:{
            consulta: true,
            vacunacion: true
        }
    })
    return NextResponse.json(consultas)  
}