'use client';

import { useCallback, useEffect, useState } from 'react';

import DeckGL from '@deck.gl/react';
import { RGBAColor } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';

import MapGl, { NavigationControl } from 'react-map-gl';
import maplibregl from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';
import { isNil } from 'lodash';

// view state starts with all of France centered
const INITIAL_VIEW_STATE = {
  latitude: 46.2276,
  longitude: 2.2137,
  zoom: 5,
  bearing: 0,
  pitch: 0,
};

export default function Carte() {
  const [communes, setCommunes] = useState<any>(undefined);
  const [layers, setLayers] = useState<GeoJsonLayer<any, any>[]>([]);

  const fetchCommunes = async () => {
    const data = await import('public/data/communes-simple.json');

    setCommunes(data);
  };

  const getFillColor = (feature: any) => {
    const code = Number(feature.properties.code);

    // if code is pair
    if (code % 2 === 0) {
      return [255, 0, 0, 128] as RGBAColor;
    } else {
      return [0, 255, 0, 128] as RGBAColor;
    }
  };

  useEffect(() => {
    if (isNil(communes)) return;

    setLayers([
      new GeoJsonLayer({
        id: 'geojson-layer',
        data: communes,
        filled: true,
        stroked: true,
        getFillColor,
        getLineColor: [255, 255, 255, 255],
        getLineWidth: 50,
      }),
    ]);
  }, [communes]);

  useEffect(() => {
    fetchCommunes();
  }, []);

  return (
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
  );
}
