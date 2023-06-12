'use client';

import FlowMapLayer from '@flowmap.gl/core';

export const testFlowLayer = new FlowMapLayer({
  id: 'my-flowmap-layer',
  locations:
    // either array of location areas or a GeoJSON feature collection
    [
      { id: 1, name: 'New York', lat: 40.713543, lon: -74.011219 },
      { id: 2, name: 'London', lat: 51.507425, lon: -0.127738 },
      { id: 3, name: 'Rio de Janeiro', lat: -22.906241, lon: -43.180244 },
    ],
  flows: [
    { origin: 1, dest: 2, count: 42 },
    { origin: 2, dest: 1, count: 51 },
    { origin: 3, dest: 1, count: 50 },
    { origin: 2, dest: 3, count: 40 },
    { origin: 1, dest: 3, count: 22 },
    { origin: 3, dest: 2, count: 42 },
  ],
  getFlowMagnitude: (flow) => flow.count || 0,
  getFlowOriginId: (flow) => flow.origin,
  getFlowDestId: (flow) => flow.dest,
  getLocationId: (loc) => loc.id,
  getLocationCentroid: (location) => [location.lon, location.lat],
});
