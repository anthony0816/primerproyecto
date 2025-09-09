import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const urls = await prisma.imagen.findMany({
      select: { url: true },
    });
    return NextResponse.json(urls, { status: 200 });
  } catch (err) {
    console.log("error", err);
  }
}
