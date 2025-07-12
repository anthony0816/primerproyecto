import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
export async function GET(){
    const solicitudes = await prisma.solicitud.findMany()
    return NextResponse.json(solicitudes)
}