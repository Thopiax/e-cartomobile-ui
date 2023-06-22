import { prisma } from "@/lib/prisma"
import { ScoreRecord } from "@/lib/types"
import isNil from "lodash/isNil"
import { NextResponse } from "next/server"

export async function GET() {
  const besoinsLocaux = await prisma.besoin_local.findMany()

  const scores = besoinsLocaux.reduce((acc: ScoreRecord, besoinLocal) => {
    const { insee, besoin } = besoinLocal

    if (isNil(insee) || isNil(besoin)) {
      return acc
    }

    acc[insee] = besoin

    return acc
  }, {} as ScoreRecord)

  console.debug("scores", scores)

  return NextResponse.json({ scores })
}
