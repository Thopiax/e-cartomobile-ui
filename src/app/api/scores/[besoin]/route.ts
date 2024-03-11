import { Besoin, ScoreType } from "@/lib/types"
import { NextResponse } from "next/server"
import loadCSVData from "@/lib/csv"

export async function GET(
  request: Request,
  { params: { besoin } }: { params: { besoin: ScoreType } }
) {
  try {
    const options = {} as any

    if (process.env.NODE_ENV === "development") {
      options["take"] = 1_000
    }

    let besoins: Besoin[] = []

    switch (besoin) {
      case "local":
        besoins = await loadCSVData<Besoin>("public/data/df_besoin_local.csv")
        break

      case "reseau":
        besoins = await loadCSVData<Besoin>("public/data/df_besoin_reseau.csv")
        break

      case "tourisme":
        besoins = await loadCSVData<Besoin>(
          "public/data/df_besoin_tourisme.csv"
        )
        break

      case "cumul":
        besoins = await loadCSVData<Besoin>("public/data/df_besoin_cumul.csv")
        break

      default:
        break
    }

    return NextResponse.json(besoins as Besoin[])
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  }
}
