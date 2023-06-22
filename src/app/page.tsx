import * as React from "react"

import dynamic from "next/dynamic"
import { prisma } from "@/lib/prisma"
import { isNil } from "lodash"
const Carte = dynamic(() => import("./carte"), { ssr: false })

export type ScoreRecord = Record<string, number>

export default async function Home() {
  const besoinsLocaux = await prisma.besoin_local.findMany()

  // const [scoreSelected, setScoreSelected] = React.useState<
  //   "besoin_local" | "besoin_reseau"
  // >("besoin_local")

  const buildScores = () => {
    const scores = besoinsLocaux.reduce((acc: ScoreRecord, besoinLocal) => {
      const { insee, besoin } = besoinLocal

      if (isNil(insee) || isNil(besoin)) {
        return acc
      }

      acc[insee] = besoin

      return acc
    }, {} as ScoreRecord)

    return scores
  }

  const scores = buildScores()

  return (
    <main className="relative h-screen w-screen">
      <Carte scores={scores} />
    </main>
  )
}
