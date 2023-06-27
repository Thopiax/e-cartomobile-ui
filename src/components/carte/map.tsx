"use client"

import { get, isNil } from "lodash"
import { useCallback, useMemo } from "react"

import DeckGL from "@deck.gl/react"
import { GeoJsonLayer } from "@deck.gl/layers"

import MapGl, { NavigationControl } from "react-map-gl"
import maplibregl from "maplibre-gl"

import "maplibre-gl/dist/maplibre-gl.css"
import { CommuneGeoFeature, CommuneGeoProps, ScoreType } from "@/lib/types"
import { getScoreColor } from "@/lib/colors"

// view state starts with all of France centered
const INITIAL_VIEW_STATE = {
  latitude: 46.2276,
  longitude: 2.2137,
  zoom: 5,
  bearing: 0,
  pitch: 0,
}

interface CarteProps {
  scoreType: ScoreType
  communes?: CommuneGeoFeature[]
  selectedCommune?: CommuneGeoProps | undefined
  selectCommune: (commune: CommuneGeoProps) => void
}

export default function Carte({
  scoreType,
  communes,
  selectCommune,
}: CarteProps) {
  // const [layers, setLayers] = useState<any[]>([])

  const handleClick = useCallback(
    (info: any) => {
      const commune = info.object as CommuneGeoFeature

      if (!commune) {
        return
      }

      selectCommune(commune.properties)
    },
    [selectCommune]
  )

  const layers = useMemo(() => {
    if (isNil(communes) || communes?.length === 0) {
      return []
    }

    const getFillColor = (feature: CommuneGeoFeature) => {
      const score = get(feature, `properties.scores.${scoreType}`, undefined)

      return getScoreColor(score)
    }

    return [
      new GeoJsonLayer<CommuneGeoFeature>({
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
        onClick: handleClick,
        updateTriggers: {
          getFillColor: [scoreType],
        },
      }),
    ]
  }, [communes, handleClick, scoreType])

  return (
    <>
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
