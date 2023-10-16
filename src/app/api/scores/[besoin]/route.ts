import { prisma } from "@/lib/prisma"
import { ScoreType } from "@/lib/types"
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

    return NextResponse.json(besoins, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  } finally {
    await prisma.$disconnect()
  }
}
