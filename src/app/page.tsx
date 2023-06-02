import * as React from 'react';

import dynamic from 'next/dynamic';
const Carte = dynamic(() => import('./carte'), { ssr: false });

export default function Home() {
  return (
    <main className="relative w-screen h-screen">
      <Carte />
    </main>
  );
}
