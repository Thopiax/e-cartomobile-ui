"use client"

import { isNil } from "lodash"
import { besoin_local } from "@prisma/client"
import { useCallback, useEffect, useMemo, useState } from "react"
import ReactLoading from "react-loading"

import DeckGL from "@deck.gl/react"
import { RGBAColor } from "@deck.gl/core"
import { GeoJsonLayer } from "@deck.gl/layers"

import MapGl, { NavigationControl } from "react-map-gl"
import maplibregl from "maplibre-gl"

import { useResponsive } from "@/lib/utils"

import "maplibre-gl/dist/maplibre-gl.css"
import { prisma } from "@/lib/prisma"

// view state starts with all of France centered
const INITIAL_VIEW_STATE = {
  latitude: 46.2276,
  longitude: 2.2137,
  zoom: 5,
  bearing: 0,
  pitch: 0,
}

export type CarteScores = Record<string, number>

interface CarteProps {
  scores: CarteScores
}

function getScoreColor(score?: number, alpha = 128): RGBAColor {
  let color: RGBAColor = [128, 128, 128, alpha]

  if (isNil(score)) {
    return color
  } else if (score > 0 && score <= 0.2) {
    color = [255, 102, 102, alpha] // Light Coral (Red)
  } else if (score > 0.2 && score <= 0.3) {
    color = [255, 153, 51, alpha] // Dark Orange (Orange)
  } else if (score > 0.3 && score <= 0.5) {
    color = [255, 204, 51, alpha] // Goldenrod (Yellow)
  } else if (score > 0.5 && score <= 0.7) {
    color = [153, 204, 51, alpha] // Olive Green (Green)
  } else if (score > 0.7 && score <= 0.8) {
    color = [51, 153, 102, alpha] // Sea Green (Blue-Green)
  } else if (score > 0.8 && score <= 1) {
    color = [51, 102, 204, alpha] // Dodger Blue (Blue)
  }

  return color
}

export default function Carte({ scores }: CarteProps) {
  const [layers, setLayers] = useState<any[]>([])
  const [communes, setCommunes] = useState<any>(undefined)

  const getFillColor = useCallback(
    (feature: any) => {
      const code = feature.properties.com_code

      const scorePercentage = scores[code]

      if (isNil(scorePercentage)) {
        console.warn(`No score found for commune ${code}`)

        return [0, 0, 0, 128] as RGBAColor
      }

      return getScoreColor(scorePercentage)
    },
    [scores]
  )

  const handleHover = (info: any, event: any) => {
    console.debug("handle hover", info, event)
  }

  const handleClick = useCallback(
    (info: any, event: any) => {
      console.debug("handle click", info, event)

      console.debug("selected commune", communes[info.index])
    },
    [communes]
  )

  useEffect(() => {
    if (!communes || communes.length === 0) {
      return
    }

    setLayers([
      new GeoJsonLayer({
        id: "geojson-layer",
        data: communes,
        opacity: 0.8,
        pickable: true,
        filled: true,
        stroked: true,
        getFillColor,
        getLineColor: [255, 255, 255, 255],
        getLineWidth: 50,
        autoHighlight: true,
        onHover: handleHover,
        onClick: handleClick,
        updateTriggers: {
          getFillColor: [scores],
        },
      }),
    ])
  }, [communes, getFillColor, handleClick, scores])

  const fetchCommunes = async () => {
    // measure time to fetch communes
    console.time("fetch communes")

    const data = await import(`public/data/communes-2022-simple-lite.json`)

    console.timeEnd("fetch communes")

    setCommunes(data)
  }

  useEffect(() => {
    fetchCommunes()
  }, [])

  return (
    <div className="h-full w-full">
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
          <NavigationControl showCompass />
        </MapGl>
      </DeckGL>
    </div>
  )
}
