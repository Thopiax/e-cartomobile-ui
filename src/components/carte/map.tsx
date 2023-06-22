"use client"

import { isNil } from "lodash"
import { useCallback, useEffect, useState } from "react"
import ReactLoading from "react-loading"

import DeckGL from "@deck.gl/react"
import { RGBAColor } from "@deck.gl/core"
import { GeoJsonLayer } from "@deck.gl/layers"

import MapGl, { NavigationControl } from "react-map-gl"
import maplibregl from "maplibre-gl"

import "maplibre-gl/dist/maplibre-gl.css"
import { CommuneGeo, CommuneProps, ScoreRecord } from "@/lib/types"
import { getColorByDepartmentCode, getScoreColor } from "@/lib/colors"

// view state starts with all of France centered
const INITIAL_VIEW_STATE = {
  latitude: 46.2276,
  longitude: 2.2137,
  zoom: 5,
  bearing: 0,
  pitch: 0,
}

interface CarteProps {
  selectedCommune?: CommuneProps | undefined
  selectCommune: (commune: CommuneProps) => void
  communes?: CommuneGeo[]
  scores?: ScoreRecord
}

export default function Carte({ scores, communes, selectCommune }: CarteProps) {
  const [layers, setLayers] = useState<any[]>([])

  const getFillColor = useCallback(
    (feature: CommuneGeo) => {
      if (!scores || Object.keys(scores).length === 0) {
        return getColorByDepartmentCode(feature.properties.dep_code)
      }

      const code = feature.properties.com_code

      const scorePercentage = scores?.[code]

      if (isNil(scorePercentage)) {
        console.warn(`No score found for commune ${code}`)

        return [0, 0, 0, 128] as RGBAColor
      }

      return getScoreColor(scorePercentage)
    },
    [scores]
  )

  const handleHover = (info: any, event: any) => {
    // console.debug("handle hover", info, event)
  }

  const handleClick = useCallback(
    (info: any) => {
      const commune = info.object as CommuneGeo

      if (!commune) {
        return
      }

      selectCommune(commune.properties)
    },
    [selectCommune]
  )

  useEffect(() => {
    if (!communes || communes.length === 0) {
      return
    }

    setLayers([
      new GeoJsonLayer<CommuneGeo>({
        id: "geojson-layer",
        data: communes,
        opacity: 0.8,
        pickable: true,
        filled: true,
        stroked: true,
        getFillColor,
        getLineWidth: 50,
        autoHighlight: true,
        getLineColor: [255, 255, 255, 255],
        highlightColor: [255, 255, 255, 128],
        onHover: handleHover,
        onClick: handleClick,
        updateTriggers: {
          getFillColor: [scores],
          handleClick: [communes],
        },
      }),
    ])
  }, [communes, scores, getFillColor, handleClick])

  return (
    <>
      {layers.length === 0 && (
        <div className="flex h-screen w-screen items-center justify-center">
          <ReactLoading
            type={"cylon"}
            color={"gray"}
            height={128}
            width={128}
            className="inset-0 z-50"
          />
        </div>
      )}
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <MapGl
          mapLib={maplibregl}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        >
          <NavigationControl showCompass position="bottom-right" />
        </MapGl>
      </DeckGL>
    </>
  )
}
