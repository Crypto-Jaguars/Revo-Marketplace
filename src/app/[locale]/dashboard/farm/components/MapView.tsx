'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { FarmLocation } from './types';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface MapViewProps {
  location: FarmLocation;
  className?: string;
}

export default function MapView({ location, className }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      console.error('Mapbox token is not configured');
      // Render a fallback UI
      if (mapContainer.current) {
        mapContainer.current.innerHTML = `
          <div role="alert" class="p-4 text-center">
            <p>Map is currently unavailable.</p>
            <p class="text-sm text-muted-foreground">Please try again later.</p>
          </div>
        `;
      }
      return;
    }

    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const initializeMap = () => {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [location.longitude, location.latitude],
        zoom: 12,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      marker.current = new mapboxgl.Marker()
        .setLngLat([location.longitude, location.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<strong>${location.address}</strong><br/>${location.city}, ${location.state}`
          )
        )
        .addTo(map.current);
    };

    if (!map.current) {
      initializeMap();
    } else {
      // Update marker position if location changes
      marker.current?.setLngLat([location.longitude, location.latitude]);
      map.current.flyTo({
        center: [location.longitude, location.latitude],
        zoom: 12,
        essential: true,
      });
    }

    return () => {
      marker.current?.remove();
      map.current?.remove();
      map.current = null;
      marker.current = null;
    };
  }, [location]);

  return (
    <Card
      className={`relative overflow-hidden ${className || ''}`}
      style={{ minHeight: '400px' }}
      role="region"
      aria-label="Farm location map"
    >
      <div
        ref={mapContainer}
        className="absolute inset-0"
        style={{ minHeight: '400px' }}
        tabIndex={0}
        aria-label={`Map showing ${location.address}, ${location.city}, ${location.state}`}
        onKeyDown={(e) => {
          if (!map.current) return;
          const MOVE_AMOUNT = 100;
          switch (e.key) {
            case 'ArrowUp':
              map.current.panBy([0, -MOVE_AMOUNT]);
              break;
            case 'ArrowDown':
              map.current.panBy([0, MOVE_AMOUNT]);
              break;
            case 'ArrowLeft':
              map.current.panBy([-MOVE_AMOUNT, 0]);
              break;
            case 'ArrowRight':
              map.current.panBy([MOVE_AMOUNT, 0]);
              break;
            case '+':
              map.current.zoomIn();
              break;
            case '-':
              map.current.zoomOut();
              break;
          }
        }}
      />
    </Card>
  );
}
