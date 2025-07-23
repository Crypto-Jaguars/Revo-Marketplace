'use client';

import { notFound } from 'next/navigation';

export default function CatchAllPage({
  params,
}: {
  params: {
    locale: string;
  };
}) {
  console.log('Params:', params);

  // Always trigger 404 for unrecognized routes
  notFound();
}
