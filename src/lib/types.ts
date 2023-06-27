export interface Besoin {
  insee: string | null
  besoin: number | null
}

export type ScoreType = "local" | "reseau"

export type ScoreRecord = Record<string, number>

export type CommuneGeoJSON = {
  type: "FeatureCollection"
  features: CommuneGeoFeature[]
}

export type CommuneGeoFeature = {
  type: "Feature"
  geometry: any
  properties: CommuneGeoProps
}

export type CommuneGeoProps = {
  com_code: string
  com_name: string
  dep_code: number
  dep_name: string
  reg_code: number
  reg_name: string

  scores: {
    local?: number
    reseau?: number
  }
}

export type ScoredCommune = {
  scores: {
    [key: string]: number
  }

  properties: CommuneGeoProps
}
