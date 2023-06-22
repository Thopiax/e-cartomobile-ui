export type ScoreRecord = Record<string, number>

export type CommuneGeo = {
  type: "Feature"
  geometry: any
  properties: CommuneProps
}

export type CommuneProps = {
  com_code: string
  com_name: string
  dep_code: number
  dep_name: string
  reg_code: number
  reg_name: string
}

export type ScoredCommune = {
  scores: {
    [key: string]: number
  }

  properties: CommuneProps
}
