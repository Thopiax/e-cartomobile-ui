"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Title, Button, AreaChart } from "@tremor/react"
import { Fragment, useState } from "react"
import { useInView } from "react-cool-inview"

const chartdata = [
  {
    date: "2011",
    Diesel: 26770386,
    Electrique: 5857,
    Essence: 14023995,
    Gaz: 593272,
    "Hybride rechargeable": 17734,
  },
  {
    date: "2012",
    Diesel: 27764425,
    Electrique: 9291,
    Essence: 13733187,
    Gaz: 236624,
    "Hybride rechargeable": 26513,
  },
  {
    date: "2013",
    Diesel: 28466096,
    Electrique: 17457,
    Essence: 13357499,
    Gaz: 220129,
    "Hybride rechargeable": 29738,
  },
  {
    date: "2014",
    Diesel: 29091956,
    Electrique: 29597,
    Essence: 13193933,
    Gaz: 213325,
    "Hybride rechargeable": 30068,
  },
  {
    date: "2015",
    Diesel: 29685637,
    Electrique: 41935,
    Essence: 13202506,
    Gaz: 205745,
    "Hybride rechargeable": 31520,
  },
  {
    date: "2016",
    Diesel: 30099017,
    Electrique: 61926,
    Essence: 13399974,
    Gaz: 200088,
    "Hybride rechargeable": 36513,
  },
  {
    date: "2017",
    Diesel: 30366918,
    Electrique: 86384,
    Essence: 13738978,
    Gaz: 192860,
    "Hybride rechargeable": 43026,
  },
  {
    date: "2018",
    Diesel: 30439541,
    Electrique: 112495,
    Essence: 14260364,
    Gaz: 187245,
    "Hybride rechargeable": 54253,
  },
  {
    date: "2019",
    Diesel: 29967496,
    Electrique: 142863,
    Essence: 14887848,
    Gaz: 180982,
    "Hybride rechargeable": 68007,
  },
  {
    date: "2020",
    Diesel: 29353976,
    Electrique: 183898,
    Essence: 15605708,
    Gaz: 175445,
    "Hybride rechargeable": 85196,
  },
  {
    date: "2021",
    Diesel: 28772435,
    Electrique: 295116,
    Essence: 16026868,
    Gaz: 185752,
    "Hybride rechargeable": 158541,
  },
  {
    date: "2022",
    Diesel: 28148730,
    Electrique: 463874,
    Essence: 16583422,
    Gaz: 231085,
    "Hybride rechargeable": 300993,
  },
]

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("FR").format(number)}`

const ParcAutomobile = () => {
  const title = "Evolutions du parc automobile en France"

  const [open, setOpen] = useState(false)

  const { observe, inView } = useInView()

  return (
    <div ref={observe}>
      {inView && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-[60]" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-[60] overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                    <div>
                      <Title className="mb-2">{title}</Title>
                      <AreaChart
                        data={chartdata}
                        index="date"
                        categories={[
                          "Diesel",
                          "Electrique",
                          "Essence",
                          "Gaz",
                          "Hybride rechargeable",
                        ]}
                        // colors={[]}
                        valueFormatter={dataFormatter}
                        yAxisWidth={80}
                      />
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setOpen(false)}
                      >
                        Retour
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}

      <Button onClick={() => setOpen(true)} disabled={!inView}>
        Voir en plein écran
      </Button>

      <div className="mt-2">
        <Title className="mb-2">{title}</Title>
        <AreaChart
          data={chartdata}
          index="date"
          categories={[
            "Diesel",
            "Electrique",
            "Essence",
            "Gaz",
            "Hybride rechargeable",
          ]}
          // colors={[]}
          valueFormatter={dataFormatter}
          yAxisWidth={80}
        />
      </div>
    </div>
  )
}

export default ParcAutomobile
