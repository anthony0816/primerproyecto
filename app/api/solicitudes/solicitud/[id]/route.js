import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
export async function GET(request,{params}){
    const {id} = await params
    const solicitudes = await prisma.solicitud.findMany({
        where:{
            id: Number(id)
        }
    })
    return NextResponse.json(solicitudes)
}

export async function PUT(request,{params}){
    const {id} = await params
    const data = await request.json()
    const response = await prisma.solicitud.update({
        where:{
            id: Number(id)
        },
        data:data
    })
    return NextResponse.json(response)
}

