"use client"

import { Title, Button, AreaChart } from "@tremor/react"
import { Dialog } from "primereact/dialog"
import { useState } from "react"
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
        <Dialog
          visible={open}
          maximizable
          onHide={() => setOpen(false)}
          header={title}
        >
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
        </Dialog>
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
