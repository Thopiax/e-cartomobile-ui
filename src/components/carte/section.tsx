"use client"

import {
  Besoin,
  CommuneGeoFeature,
  CommuneGeoJSON,
  CommuneGeoProps,
  ScoreType,
} from "@/lib/types"
import { Fragment, cache, useCallback, useLayoutEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"

import { Sidebar } from "./sidebar"
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5"
import Image from "next/image"
import { useResponsive } from "@/lib/utils"
import ReactLoading from "react-loading"
import { ScoreSelector } from "./scoreSelector"
import Carte from "./map"
import { uniq } from "lodash"

// const Carte = dynamic(() => import("./map"), { ssr: false })

const getScores = cache((besoin: "local" | "reseau") =>
  fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL as string}/api/scores/${besoin}`
  ).then((res) => res.json() as Promise<Besoin[]>)
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

  const fetchScores = async (type: "local" | "reseau") => {
    console.time(`fetchScores.${type}`)

    const data = await getScores(type)

    console.timeEnd(`fetchScores.${type}`)

    setCommunes((communes) =>
      communes.map((commune) => {
        const score = data.find(
          (score) => score.insee === commune.properties.com_code
        )

        return {
          ...commune,
          properties: {
            ...commune.properties,
            scores: {
              ...commune.properties.scores,
              [type]: score?.besoin || undefined,
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
      .default as CommuneGeoJSON

    console.timeEnd("fetchCommunes")

    setCommunes(data.features)
  }

  useLayoutEffect(() => {
    console.debug("CarteSection: fetchCommunes")
    setIsLoading(true)

    fetchCommunes().then(() => {
      fetchScores("local").then(() => {
        fetchScores("reseau")
      })
    })
  }, [])

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <IoCloseOutline
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <Sidebar
                  selectedCommune={selectedCommune}
                  scoresAvailable={scoresAvailable}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:w-80 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-96 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <Sidebar
          selectedCommune={selectedCommune}
          scoresAvailable={scoresAvailable}
        />
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
