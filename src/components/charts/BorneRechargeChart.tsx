import { Title, Button, AreaChart } from "@tremor/react"
import { Dialog } from "primereact/dialog"
import { useState } from "react"
import { useInView } from "react-cool-inview"

const chartdata = [
  {
    date_mise_en_service: "2015-01-31",
    nb_stations: 5,
    nb_pdc: 7,
  },
  {
    date_mise_en_service: "2015-02-28",
    nb_stations: 5,
    nb_pdc: 7,
  },
  {
    date_mise_en_service: "2015-03-31",
    nb_stations: 5,
    nb_pdc: 7,
  },
  {
    date_mise_en_service: "2015-04-30",
    nb_stations: 5,
    nb_pdc: 7,
  },
  {
    date_mise_en_service: "2015-05-31",
    nb_stations: 19,
    nb_pdc: 35,
  },
  {
    date_mise_en_service: "2015-06-30",
    nb_stations: 20,
    nb_pdc: 36,
  },
  {
    date_mise_en_service: "2015-07-31",
    nb_stations: 54,
    nb_pdc: 104,
  },
  {
    date_mise_en_service: "2015-08-31",
    nb_stations: 54,
    nb_pdc: 104,
  },
  {
    date_mise_en_service: "2015-09-30",
    nb_stations: 67,
    nb_pdc: 130,
  },
  {
    date_mise_en_service: "2015-10-31",
    nb_stations: 74,
    nb_pdc: 144,
  },
  {
    date_mise_en_service: "2015-11-30",
    nb_stations: 75,
    nb_pdc: 146,
  },
  {
    date_mise_en_service: "2015-12-31",
    nb_stations: 91,
    nb_pdc: 178,
  },
  {
    date_mise_en_service: "2016-01-31",
    nb_stations: 120,
    nb_pdc: 236,
  },
  {
    date_mise_en_service: "2016-02-29",
    nb_stations: 152,
    nb_pdc: 298,
  },
  {
    date_mise_en_service: "2016-03-31",
    nb_stations: 174,
    nb_pdc: 346,
  },
  {
    date_mise_en_service: "2016-04-30",
    nb_stations: 186,
    nb_pdc: 370,
  },
  {
    date_mise_en_service: "2016-05-31",
    nb_stations: 214,
    nb_pdc: 431,
  },
  {
    date_mise_en_service: "2016-06-30",
    nb_stations: 245,
    nb_pdc: 493,
  },
  {
    date_mise_en_service: "2016-07-31",
    nb_stations: 283,
    nb_pdc: 568,
  },
  {
    date_mise_en_service: "2016-08-31",
    nb_stations: 356,
    nb_pdc: 714,
  },
  {
    date_mise_en_service: "2016-09-30",
    nb_stations: 418,
    nb_pdc: 837,
  },
  {
    date_mise_en_service: "2016-10-31",
    nb_stations: 493,
    nb_pdc: 982,
  },
  {
    date_mise_en_service: "2016-11-30",
    nb_stations: 550,
    nb_pdc: 1087,
  },
  {
    date_mise_en_service: "2016-12-31",
    nb_stations: 662,
    nb_pdc: 1266,
  },
  {
    date_mise_en_service: "2017-01-31",
    nb_stations: 796,
    nb_pdc: 1504,
  },
  {
    date_mise_en_service: "2017-02-28",
    nb_stations: 901,
    nb_pdc: 1692,
  },
  {
    date_mise_en_service: "2017-03-31",
    nb_stations: 1041,
    nb_pdc: 1962,
  },
  {
    date_mise_en_service: "2017-04-30",
    nb_stations: 1292,
    nb_pdc: 2466,
  },
  {
    date_mise_en_service: "2017-05-31",
    nb_stations: 1514,
    nb_pdc: 2862,
  },
  {
    date_mise_en_service: "2017-06-30",
    nb_stations: 1708,
    nb_pdc: 3168,
  },
  {
    date_mise_en_service: "2017-07-31",
    nb_stations: 1824,
    nb_pdc: 3343,
  },
  {
    date_mise_en_service: "2017-08-31",
    nb_stations: 1954,
    nb_pdc: 3517,
  },
  {
    date_mise_en_service: "2017-09-30",
    nb_stations: 2072,
    nb_pdc: 3687,
  },
  {
    date_mise_en_service: "2017-10-31",
    nb_stations: 2170,
    nb_pdc: 3832,
  },
  {
    date_mise_en_service: "2017-11-30",
    nb_stations: 2323,
    nb_pdc: 4057,
  },
  {
    date_mise_en_service: "2017-12-31",
    nb_stations: 2471,
    nb_pdc: 4298,
  },
  {
    date_mise_en_service: "2018-01-31",
    nb_stations: 2591,
    nb_pdc: 4478,
  },
  {
    date_mise_en_service: "2018-02-28",
    nb_stations: 2714,
    nb_pdc: 4656,
  },
  {
    date_mise_en_service: "2018-03-31",
    nb_stations: 2828,
    nb_pdc: 4836,
  },
  {
    date_mise_en_service: "2018-04-30",
    nb_stations: 2967,
    nb_pdc: 5064,
  },
  {
    date_mise_en_service: "2018-05-31",
    nb_stations: 3079,
    nb_pdc: 5220,
  },
  {
    date_mise_en_service: "2018-06-30",
    nb_stations: 3252,
    nb_pdc: 5452,
  },
  {
    date_mise_en_service: "2018-07-31",
    nb_stations: 3384,
    nb_pdc: 5648,
  },
  {
    date_mise_en_service: "2018-08-31",
    nb_stations: 3465,
    nb_pdc: 5770,
  },
  {
    date_mise_en_service: "2018-09-30",
    nb_stations: 3544,
    nb_pdc: 5890,
  },
  {
    date_mise_en_service: "2018-10-31",
    nb_stations: 3630,
    nb_pdc: 6033,
  },
  {
    date_mise_en_service: "2018-11-30",
    nb_stations: 3724,
    nb_pdc: 6168,
  },
  {
    date_mise_en_service: "2018-12-31",
    nb_stations: 3815,
    nb_pdc: 6282,
  },
  {
    date_mise_en_service: "2019-01-31",
    nb_stations: 4270,
    nb_pdc: 6763,
  },
  {
    date_mise_en_service: "2019-02-28",
    nb_stations: 4537,
    nb_pdc: 7048,
  },
  {
    date_mise_en_service: "2019-03-31",
    nb_stations: 4627,
    nb_pdc: 7194,
  },
  {
    date_mise_en_service: "2019-04-30",
    nb_stations: 4707,
    nb_pdc: 7312,
  },
  {
    date_mise_en_service: "2019-05-31",
    nb_stations: 4784,
    nb_pdc: 7454,
  },
  {
    date_mise_en_service: "2019-06-30",
    nb_stations: 4858,
    nb_pdc: 7555,
  },
  {
    date_mise_en_service: "2019-07-31",
    nb_stations: 4939,
    nb_pdc: 7717,
  },
  {
    date_mise_en_service: "2019-08-31",
    nb_stations: 5028,
    nb_pdc: 7826,
  },
  {
    date_mise_en_service: "2019-09-30",
    nb_stations: 5108,
    nb_pdc: 7953,
  },
  {
    date_mise_en_service: "2019-10-31",
    nb_stations: 5176,
    nb_pdc: 8064,
  },
  {
    date_mise_en_service: "2019-11-30",
    nb_stations: 5586,
    nb_pdc: 8837,
  },
  {
    date_mise_en_service: "2019-12-31",
    nb_stations: 5971,
    nb_pdc: 9515,
  },
  {
    date_mise_en_service: "2020-01-31",
    nb_stations: 6086,
    nb_pdc: 9716,
  },
  {
    date_mise_en_service: "2020-02-29",
    nb_stations: 6462,
    nb_pdc: 10369,
  },
  {
    date_mise_en_service: "2020-03-31",
    nb_stations: 6805,
    nb_pdc: 10772,
  },
  {
    date_mise_en_service: "2020-04-30",
    nb_stations: 7660,
    nb_pdc: 11632,
  },
  {
    date_mise_en_service: "2020-05-31",
    nb_stations: 7939,
    nb_pdc: 12277,
  },
  {
    date_mise_en_service: "2020-06-30",
    nb_stations: 9011,
    nb_pdc: 14220,
  },
  {
    date_mise_en_service: "2020-07-31",
    nb_stations: 9378,
    nb_pdc: 14841,
  },
  {
    date_mise_en_service: "2020-08-31",
    nb_stations: 9717,
    nb_pdc: 15394,
  },
  {
    date_mise_en_service: "2020-09-30",
    nb_stations: 9918,
    nb_pdc: 15689,
  },
  {
    date_mise_en_service: "2020-10-31",
    nb_stations: 10489,
    nb_pdc: 16824,
  },
  {
    date_mise_en_service: "2020-11-30",
    nb_stations: 10785,
    nb_pdc: 17327,
  },
  {
    date_mise_en_service: "2020-12-31",
    nb_stations: 11055,
    nb_pdc: 17766,
  },
  {
    date_mise_en_service: "2021-01-31",
    nb_stations: 11813,
    nb_pdc: 19298,
  },
  {
    date_mise_en_service: "2021-02-28",
    nb_stations: 12036,
    nb_pdc: 19649,
  },
  {
    date_mise_en_service: "2021-03-31",
    nb_stations: 13301,
    nb_pdc: 22135,
  },
  {
    date_mise_en_service: "2021-04-30",
    nb_stations: 14363,
    nb_pdc: 24147,
  },
  {
    date_mise_en_service: "2021-05-31",
    nb_stations: 14873,
    nb_pdc: 25127,
  },
  {
    date_mise_en_service: "2021-06-30",
    nb_stations: 15468,
    nb_pdc: 26567,
  },
  {
    date_mise_en_service: "2021-07-31",
    nb_stations: 15982,
    nb_pdc: 28127,
  },
  {
    date_mise_en_service: "2021-08-31",
    nb_stations: 16312,
    nb_pdc: 28985,
  },
  {
    date_mise_en_service: "2021-09-30",
    nb_stations: 16669,
    nb_pdc: 29994,
  },
  {
    date_mise_en_service: "2021-10-31",
    nb_stations: 17001,
    nb_pdc: 31064,
  },
  {
    date_mise_en_service: "2021-11-30",
    nb_stations: 17562,
    nb_pdc: 32402,
  },
  {
    date_mise_en_service: "2021-12-31",
    nb_stations: 17906,
    nb_pdc: 33313,
  },
  {
    date_mise_en_service: "2022-01-31",
    nb_stations: 18227,
    nb_pdc: 34310,
  },
  {
    date_mise_en_service: "2022-02-28",
    nb_stations: 18446,
    nb_pdc: 35047,
  },
  {
    date_mise_en_service: "2022-03-31",
    nb_stations: 18807,
    nb_pdc: 36561,
  },
  {
    date_mise_en_service: "2022-04-30",
    nb_stations: 19074,
    nb_pdc: 37379,
  },
  {
    date_mise_en_service: "2022-05-31",
    nb_stations: 19467,
    nb_pdc: 38294,
  },
  {
    date_mise_en_service: "2022-06-30",
    nb_stations: 20124,
    nb_pdc: 40173,
  },
  {
    date_mise_en_service: "2022-07-31",
    nb_stations: 20469,
    nb_pdc: 41165,
  },
  {
    date_mise_en_service: "2022-08-31",
    nb_stations: 20729,
    nb_pdc: 42013,
  },
  {
    date_mise_en_service: "2022-09-30",
    nb_stations: 21184,
    nb_pdc: 43560,
  },
  {
    date_mise_en_service: "2022-10-31",
    nb_stations: 21526,
    nb_pdc: 44517,
  },
  {
    date_mise_en_service: "2022-11-30",
    nb_stations: 21821,
    nb_pdc: 45354,
  },
  {
    date_mise_en_service: "2022-12-31",
    nb_stations: 22344,
    nb_pdc: 46682,
  },
  {
    date_mise_en_service: "2023-01-31",
    nb_stations: 22631,
    nb_pdc: 47344,
  },
  {
    date_mise_en_service: "2023-02-28",
    nb_stations: 22860,
    nb_pdc: 47912,
  },
  {
    date_mise_en_service: "2023-03-31",
    nb_stations: 23174,
    nb_pdc: 48662,
  },
  {
    date_mise_en_service: "2023-04-30",
    nb_stations: 23180,
    nb_pdc: 48673,
  },
]

const dataFormatter = (number: number) => {
  return Intl.NumberFormat("fr-FR").format(number).toString()
}

const BorneRechargeChart = () => {
  const title = "Evolutions des bornes de recharge en France"

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
            index="date_mise_en_service"
            categories={["nb_stations", "nb_pdc"]}
            valueFormatter={dataFormatter}
            yAxisWidth={80}
          />
        </Dialog>
      )}

      <Button onClick={() => setOpen(true)} disabled={!inView}>
        Voir en plein écran
      </Button>

      <Title className="mb-2">{title}</Title>
      <AreaChart
        data={chartdata}
        index="date_mise_en_service"
        categories={["nb_stations", "nb_pdc"]}
        valueFormatter={dataFormatter}
        yAxisWidth={80}
      />
    </div>
  )
}

export default BorneRechargeChart
