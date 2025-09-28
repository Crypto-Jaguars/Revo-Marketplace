'use client';

import React from 'react';
import Bounded from '@/components/Bounded';
import { ProducerGrid } from '@/components/producers';
import { producersMock } from '@/mocks/producers';
import { Producer } from '@/types/producer';

export default function ProducersPage() {
  const handleProducerClick = (producer: Producer) => {
    // In a real app, this would navigate to the producer's profile page
    console.log('Clicked on producer:', producer.name);
    // For demo purposes, show an alert
    alert(`You clicked on ${producer.name} from ${producer.farmName}!`);
  };

  return (
    <Bounded>
      <div className="py-8 lg:py-12">
        <ProducerGrid
          producers={producersMock}
          onProducerClick={handleProducerClick}
          title="Featured Local Producers"
          description="Discover fresh, locally-sourced produce directly from our trusted farmers across Costa Rica"
        />
      </div>
    </Bounded>
  );
}