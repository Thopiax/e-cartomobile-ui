"use client"

import { CommuneGeo, CommuneProps, ScoreRecord } from "@/lib/types"
import { Fragment, useCallback, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"

import { Sidebar } from "./sidebar"
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useResponsive } from "@/lib/utils"

const Carte = dynamic(() => import("./map"), { ssr: false })

export interface CarteSectionProps {
  scores?: ScoreRecord
}

export const CarteSection: React.FC<CarteSectionProps> = ({ scores }) => {
  const { isMobile } = useResponsive()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [communes, setCommunes] = useState<CommuneGeo[]>([])
  const [selectedCommune, selectCommune] = useState<
    CommuneGeo["properties"] | undefined
  >(undefined)

  const handleSelectCommune = useCallback(
    (commune: CommuneProps | undefined) => {
      selectCommune(commune)

      if (isMobile) {
        setSidebarOpen(true)
      }
    },
    [isMobile]
  )

  const fetchCommunes = async () => {
    // measure time to fetch communes
    console.time("fetchCommunes")
    const data = await import(`public/data/communes-2022-simple-lite.json`)
    console.timeEnd("fetchCommunes")

    setCommunes(data as unknown as CommuneGeo[])
  }

  useEffect(() => {
    fetchCommunes()
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
                <Sidebar selectedCommune={selectedCommune} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:w-80 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-96 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <Sidebar selectedCommune={selectedCommune} />
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
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

      <main>
        <Carte
          scores={scores}
          communes={communes}
          selectCommune={handleSelectCommune}
          selectedCommune={selectedCommune}
        />
      </main>
    </div>
  )
}
