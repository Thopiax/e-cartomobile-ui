'use client';

import { isNil } from 'lodash';
import { score_4 } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

import DeckGL from '@deck.gl/react';
import { RGBAColor } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';

import MapGl, { NavigationControl } from 'react-map-gl';
import maplibregl from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';

// view state starts with all of France centered
const INITIAL_VIEW_STATE = {
  latitude: 46.2276,
  longitude: 2.2137,
  zoom: 5,
  bearing: 0,
  pitch: 0,
};

interface CarteProps {
  selectedScore?: 'score_4';
  scores: score_4[];
}

export default function Carte({
  scores,
  selectedScore = 'score_4',
}: CarteProps) {
  const [communes, setCommunes] = useState<any>(undefined);
  const [layers, setLayers] = useState<any[]>([]);

  const fetchCommunes = async () => {
    const data = await import('public/data/communes-2022-simple.json');

    // return await load(
    //   'data/communes-2022/communes-20220101.shp',
    //   ShapefileLoader,
    // );

    setCommunes(data as any);
  };

  const getFillColor = useCallback(
    (feature: any) => {
      if (!scores || scores.length === 0) {
        return [0, 0, 0, 0] as RGBAColor;
      }

      const code = feature.properties.com_current_code[0];

      const scorePercentage = scores.filter((score) => score.insee === code)[0]
        ?.score_4;

      if (isNil(scorePercentage)) {
        console.warn(`No score found for commune ${code}`);
        return [0, 0, 0, 0] as RGBAColor;
      }

      // return an RGBA color based on the percentage with a gradient from red to green (red = 0%, green = 100%)

      const red = Math.round(255 * (scorePercentage / 100));

      const green = Math.round(255 * ((100 - scorePercentage) / 100));

      return [red, green, 0, 128] as RGBAColor;
    },
    [scores],
  );

  const handleHover = (info: any, event: any) => {
    console.debug('handle hover', info, event);
  };

  const handleClick = (info: any, event: any) => {
    console.debug('handle click', info, event);

    console.debug('selected commune', communes[info.index]);
  };

  useEffect(() => {
    if (!communes || communes.length === 0) {
      return;
    }

    setLayers([
      new GeoJsonLayer({
        id: 'geojson-layer',
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
          getFillColor: [scores, selectedScore],
        },
      }),
    ]);
  }, [communes, getFillColor]);

  useEffect(() => {
    fetchCommunes();
  }, []);

  return (
    <>
      {layers.length === 0 && (
        <div className="flex items-center justify-center w-screen h-screen">
          <ReactLoading
            type={'cylon'}
            color={'gray'}
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
          style={{ width: '100%', height: '100%' }}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        >
          <NavigationControl showCompass />
        </MapGl>
      </DeckGL>
    </>
  );
}
