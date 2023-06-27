import { prisma } from "@/lib/prisma"
import { Besoin } from "@/lib/types"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params: { besoin } }: { params: { besoin: "local" | "reseau" } }
) {
  try {
    const besoins =
      besoin === "local"
        ? await prisma.besoin_local.findMany()
        : await prisma.besoin_reseau.findMany()

    return NextResponse.json(besoins as Besoin[])
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  } finally {
    await prisma.$disconnect()
  }
}
