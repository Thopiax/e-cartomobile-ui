'use client';

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

export default function Map() {
  return (
    <MapGl
      initialViewState={INITIAL_VIEW_STATE}
      mapLib={maplibregl}
      style={{ width: '100%', height: '100%' }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      <NavigationControl showCompass />
    </MapGl>
  );
}
