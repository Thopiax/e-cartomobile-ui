"use client"

import {
  Besoin,
  CommuneGeoFeature,
  CommuneGeoJSON,
  CommuneGeoProps,
  ScoreType,
} from "@/lib/types"
import { cache, useCallback, useLayoutEffect, useState } from "react"

import { Dialog } from "primereact/dialog"

import { Sidebar } from "./sidebar"
import { IoMenuOutline } from "react-icons/io5"
import Image from "next/image"
import { useResponsive } from "@/lib/utils"
import ReactLoading from "react-loading"
import { ScoreSelector } from "./scoreSelector"
import Carte from "./map"
import { isNil, uniq } from "lodash"

// const Carte = dynamic(() => import("./map"), { ssr: false })

const getScores = cache((besoin: ScoreType) =>
  fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL as string}/api/scores/${besoin}`,
    {
      mode: "no-cors",
    }
  )
    .then((res) => res.json() as Promise<Besoin[]>)
    .catch((err) => {
      console.error(err)
      return []
    })
)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CarteSectionProps {}

export const CarteSection: React.FC<CarteSectionProps> = ({}) => {
  const { isMobile } = useResponsive()
  const [isLoading, setIsLoading] = useState(true)

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [scoreType, setScoreType] = useState<ScoreType>("local")
  const [scoresAvailable, setScoresAvailable] = useState<ScoreType[]>([])

  const [communes, setCommunes] = useState<CommuneGeoFeature[]>([])
  const [selectedCommune, selectCommune] = useState<
    CommuneGeoFeature["properties"] | undefined
  >(undefined)

  const handleSelectCommune = useCallback(
    (commune: CommuneGeoProps | undefined) => {
      selectCommune(commune)

      console.debug("CarteSection: handleSelectCommune", commune)

      if (isMobile) {
        setSidebarOpen(true)
      }
    },
    [isMobile, setSidebarOpen]
  )

  const handleSelectScoreType = useCallback(
    (type: "local" | "reseau") => {
      setScoreType(type)
    },
    [setScoreType]
  )

  const fetchScores = async (type: ScoreType) => {
    console.time(`fetchScores.${type}`)

    const data = await getScores(type)

    console.timeEnd(`fetchScores.${type}`)

    setCommunes((communes) =>
      communes.map((commune) => {
        const score = data.find(
          (score) => score.insee === commune.properties.com_code
        )

        const besoin = isNil(score?.besoin) ? undefined : score?.besoin

        return {
          ...commune,
          properties: {
            ...commune.properties,
            scores: {
              ...commune.properties.scores,
              [type]: besoin,
            },
          },
        }
      })
    )

    setScoresAvailable((scrs) => uniq([...scrs, type]))

    setIsLoading(false)
  }

  const fetchCommunes = async () => {
    // measure time to fetch communes
    console.time("fetchCommunes")

    const data = (await import(`public/data/communes-2022-simple-lite.json`))
      .default as unknown as CommuneGeoJSON

    console.timeEnd("fetchCommunes")

    setCommunes(data.features)
  }

  const fetchEverything = async () => {
    try {
      await fetchCommunes()

      for (const besoin of ["local", "reseau", "tourisme"]) {
        await fetchScores(besoin as ScoreType)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useLayoutEffect(() => {
    console.debug("CarteSection: fetchCommunes")
    setIsLoading(true)

    fetchEverything()
  }, [])

  return (
    <div>
      <Dialog
        visible={sidebarOpen}
        className="z-50 lg:hidden"
        onHide={() => setSidebarOpen(false)}
        position={"left"}
      >
        <div className="w-full pt-10">
          <Sidebar
            selectedCommune={selectedCommune}
            scoresAvailable={scoresAvailable}
          />
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden md:w-80 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-96 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="h-full w-full rounded-none bg-white px-2 py-4 shadow-xl">
          <Sidebar
            selectedCommune={selectedCommune}
            scoresAvailable={scoresAvailable}
          />
        </div>
      </div>

      <div className="sticky top-0 z-50 flex items-center gap-x-6 bg-white px-4 py-4 shadow-xl sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <IoMenuOutline className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex flex-1 items-center gap-x-2 text-tremor-brand-emphasis">
          <Image
            src="/image/logo.svg"
            className="fill-current"
            width={32}
            height={32}
            alt="tiny-logo"
          />
          <div className="flex-1 text-sm font-semibold leading-6 text-tremor-brand-emphasis">
            E-CARTOMOBILE
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 z-50 p-3 lg:p-4">
        <ScoreSelector
          setScoreType={handleSelectScoreType}
          scoreType={scoreType}
          scoresAvailable={scoresAvailable}
        />
      </div>

      <main>
        {isLoading && (
          <div className="flex h-screen w-screen items-center justify-center">
            <ReactLoading
              type="spinningBubbles"
              color={"gray"}
              height={128}
              width={128}
              className="inset-0 z-50"
            />
          </div>
        )}

        <Carte
          scoreType={scoreType}
          communes={communes}
          selectCommune={handleSelectCommune}
          selectedCommune={selectedCommune}
        />
      </main>
    </div>
  )
}
