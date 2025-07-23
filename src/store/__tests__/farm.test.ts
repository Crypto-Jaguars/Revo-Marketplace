import { describe, it, expect, beforeEach } from 'vitest';
import { useFarmStore } from '../farm';
import { act } from '@testing-library/react';

describe('Farm Store', () => {
  beforeEach(() => {
    useFarmStore.setState({
      id: '',
      name: '',
      establishedDate: '',
      location: {
        latitude: 0,
        longitude: 0,
        address: '',
        city: '',
        state: '',
        country: '',
      },
      totalArea: {
        value: 0,
        unit: 'hectares',
      },
      images: [],
      certifications: [],
      farmingMethods: [],
      activeCrops: [],
      infrastructure: {
        equipment: [],
        storage: [],
        processing: [],
      },
      sustainabilityMetrics: {
        waterUsage: {
          amount: 0,
          unit: 'liters',
          period: 'day',
        },
        carbonFootprint: {
          amount: 0,
          unit: 'kg',
          period: 'year',
        },
        renewableEnergy: {
          percentage: 0,
          sources: [],
        },
        wasteManagement: {
          recyclingRate: 0,
          compostingRate: 0,
          methods: [],
        },
      },
      contactInfo: {
        phone: '',
        email: '',
      },
      isLoading: false,
      error: null,
    });
  });

  it('should update farm data', () => {
    act(() => {
      useFarmStore.getState().setFarmData({
        name: 'Test Farm',
        establishedDate: '2024-02-24',
      });
    });

    const state = useFarmStore.getState();
    expect(state.name).toBe('Test Farm');
    expect(state.establishedDate).toBe('2024-02-24');
  });

  it('should update location', () => {
    const newLocation = {
      latitude: 51.5074,
      longitude: -0.1278,
      address: '123 Test St',
      city: 'London',
      state: 'England',
      country: 'UK',
    };

    act(() => {
      useFarmStore.getState().updateLocation(newLocation);
    });

    const state = useFarmStore.getState();
    expect(state.location).toEqual(newLocation);
  });

  it('should add and remove certifications', () => {
    const certification = {
      id: '1',
      name: 'Organic Certification',
      issuer: 'Test Authority',
      issueDate: '2024-01-01',
      expiryDate: '2025-01-01',
      status: 'active' as const,
    };

    act(() => {
      useFarmStore.getState().addCertification(certification);
    });

    let state = useFarmStore.getState();
    expect(state.certifications).toHaveLength(1);
    expect(state.certifications[0]).toEqual(certification);

    act(() => {
      useFarmStore.getState().removeCertification('1');
    });

    state = useFarmStore.getState();
    expect(state.certifications).toHaveLength(0);
  });

  it('should update crop information', () => {
    const crop = {
      id: '1',
      name: 'Wheat',
      status: 'active' as const,
      plantingDate: '2024-01-01',
      expectedHarvestDate: '2024-06-01',
      quantity: 100,
      unit: 'tons',
    };

    act(() => {
      useFarmStore.getState().setFarmData({
        activeCrops: [crop],
      });
    });

    act(() => {
      useFarmStore.getState().updateCrop('1', {
        quantity: 150,
        status: 'harvested' as const,
      });
    });

    const state = useFarmStore.getState();
    expect(state.activeCrops[0].quantity).toBe(150);
    expect(state.activeCrops[0].status).toBe('harvested');
  });

  it('should handle loading state', () => {
    act(() => {
      useFarmStore.getState().setLoading(true);
    });

    let state = useFarmStore.getState();
    expect(state.isLoading).toBe(true);

    act(() => {
      useFarmStore.getState().setLoading(false);
    });

    state = useFarmStore.getState();
    expect(state.isLoading).toBe(false);
  });

  it('should handle error state', () => {
    act(() => {
      useFarmStore.getState().setError('Test error');
    });

    let state = useFarmStore.getState();
    expect(state.error).toBe('Test error');

    act(() => {
      useFarmStore.getState().setError(null);
    });

    state = useFarmStore.getState();
    expect(state.error).toBeNull();
  });

  it('should reset the store to initial state', () => {
    act(() => {
      useFarmStore.getState().setFarmData({
        name: 'Test Farm',
        establishedDate: '2024-02-24',
      });
    });

    act(() => {
      useFarmStore.getState().reset();
    });

    const state = useFarmStore.getState();
    expect(state.name).toBe('');
    expect(state.establishedDate).toBe('');
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });
});
