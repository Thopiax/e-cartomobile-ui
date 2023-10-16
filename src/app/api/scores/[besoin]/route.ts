import { prisma } from "@/lib/prisma"
import { Besoin, ScoreType } from "@/lib/types"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params: { besoin } }: { params: { besoin: ScoreType } }
) {
  try {
    const options = {} as any

    if (process.env.NODE_ENV === "development") {
      options["take"] = 1_000
    }

    const besoins =
      besoin === "local"
        ? await prisma.besoin_local.findMany(options)
        : await prisma.besoin_reseau.findMany(options)

    return NextResponse.json(besoins as Besoin[])
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  } finally {
    await prisma.$disconnect()
  }
}
