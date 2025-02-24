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
      map.current?.remove();
      map.current = null;
    };
  }, [location]);

  return (
    <Card
      className={`relative overflow-hidden ${className || ''}`}
      style={{ minHeight: '400px' }}
    >
      <div
        ref={mapContainer}
        className="absolute inset-0"
        style={{ minHeight: '400px' }}
      />
    </Card>
  );
} 