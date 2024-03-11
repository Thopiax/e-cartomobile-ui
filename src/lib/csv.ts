import * as csvParser from "fast-csv"
import { promises as fs } from "fs"
import { isNil } from "lodash"
import { Readable } from "stream"

export async function loadCSVData<T>(
  path: string,
  headers = ["insee", "besoin"],
  numberColumns = ["besoin"]
) {
  const csvData: T[] = []

  const fileBuffer = await fs.readFile(path)
  const readableStream = Readable.from(fileBuffer)

  const csvStream = csvParser
    .parseStream(readableStream, { renameHeaders: !isNil(headers), headers })
    .on("error", (error: any) => console.error(error))
    .on("data", (row: any) => {
      const data = {} as any
      for (const key in row) {
        if (numberColumns.includes(key)) {
          data[key] = parseFloat(row[key])
        } else {
          data[key] = row[key]
        }
      }
      csvData.push(data)
    })

  await new Promise((resolve) => {
    csvStream.on("end", () => {
      resolve(() => {
        console.log(`CSV file successfully processed and parsed into JSON`)
      })
    })
  })

  return csvData
}

export default loadCSVData
