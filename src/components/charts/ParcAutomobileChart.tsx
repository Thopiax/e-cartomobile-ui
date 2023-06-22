"use client"

import { Title, LineChart } from "@tremor/react"
import { useInView } from "react-cool-inview"

const chartdata = [
  {
    year: 1970,
    "Export Growth Rate": 2.04,
    "Import Growth Rate": 1.53,
  },
  {
    year: 1971,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.58,
  },
  {
    year: 1972,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.61,
  },
  {
    year: 1973,
    "Export Growth Rate": 1.93,
    "Import Growth Rate": 1.61,
  },
  {
    year: 1974,
    "Export Growth Rate": 1.88,
    "Import Growth Rate": 1.67,
  },
  //...
]

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("FR").format(number).toString()}%`

const ParcAutomobile = () => {
  const title = "Evolutions du parc automobile en France"

  const { observe, inView } = useInView()

  return (
    <div ref={observe}>
      <Title>{title}</Title>
      {inView && (
        <LineChart
          className="mt-6"
          data={chartdata}
          index="year"
          categories={["Export Growth Rate", "Import Growth Rate"]}
          colors={["emerald", "gray"]}
          valueFormatter={dataFormatter}
          yAxisWidth={40}
        />
      )}
    </div>
  )
}

export default ParcAutomobile
