import * as React from 'react';

import dynamic from 'next/dynamic';
import { prisma } from '@/lib/prisma';
const Carte = dynamic(() => import('./carte'), { ssr: false });

export default async function Home() {
  const scores = await prisma.score_4.findMany();

  return (
    <main className="relative w-screen h-screen">
      <Carte scores={scores} />
    </main>
  );
}
