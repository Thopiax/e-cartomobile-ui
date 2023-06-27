import { PrismaClient } from "@prisma/client"
import { Besoin, ScoreRecord } from "./types"
import isNil from "lodash/isNil"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ log: ["query"] })

if (process.env.NODE_ENV != "production") globalForPrisma.prisma

export function buildScoreRecord(scores: Besoin[]) {
  return scores.reduce((acc: ScoreRecord, besoinLocal) => {
    const { insee, besoin } = besoinLocal

    if (isNil(insee) || isNil(besoin)) {
      return acc
    }

    acc[insee] = besoin

    return acc
  }, {} as ScoreRecord)
}
