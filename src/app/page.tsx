import * as React from "react"

import { prisma } from "@/lib/prisma"
import { isNil } from "lodash"
import { ScoreRecord } from "@/lib/types"
import { CarteSection } from "@/components/carte/section"

const buildScoreRecord = async (_scoreType = "besoin_local") => {
  try {
    const besoinsLocaux = await prisma.besoin_local.findMany()

    const scores = besoinsLocaux.reduce((acc: ScoreRecord, besoinLocal) => {
      const { insee, besoin } = besoinLocal

      if (isNil(insee) || isNil(besoin)) {
        return acc
      }

      acc[insee] = besoin

      return acc
    }, {} as ScoreRecord)

    return scores
  } catch (error) {
    console.error(error)

    return {} as ScoreRecord
  } finally {
    await prisma.$disconnect()
  }
}

export default async function Home() {
  const scores = await buildScoreRecord()

  return <CarteSection scores={scores} />
}
