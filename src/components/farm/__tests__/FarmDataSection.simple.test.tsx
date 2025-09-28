import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FarmDataSection } from '../FarmDataSection';

// Mock the toast function
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('FarmDataSection - Basic Tests', () => {
  it('renders the component without crashing', () => {
    render(<FarmDataSection />);
    expect(screen.getByText('Farm Data')).toBeInTheDocument();
  });

  it('displays all required form fields', () => {
    render(<FarmDataSection />);

    expect(screen.getByLabelText(/farm name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/size.*hectares/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cultivation method/i)).toBeInTheDocument();
  });

  it('shows contextual help section', () => {
    render(<FarmDataSection />);

    expect(screen.getByText(/need help/i)).toBeInTheDocument();
    expect(screen.getByText(/use your official business name/i)).toBeInTheDocument();
    expect(screen.getByText(/include city, state/i)).toBeInTheDocument();
    expect(screen.getByText(/1 hectare = 2\.47 acres/i)).toBeInTheDocument();
    expect(screen.getByText(/choose the primary cultivation method/i)).toBeInTheDocument();
  });

  it('accepts initial data', () => {
    const initialData = {
      farmName: 'Test Farm',
      location: 'Test Location',
      size: '5',
      cultivationMethod: 'organic',
    };

    render(<FarmDataSection initialData={initialData} />);

    expect(screen.getByDisplayValue('Test Farm')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });

  it('renders submit button when onSubmit is provided', () => {
    const mockOnSubmit = vi.fn();
    render(<FarmDataSection onSubmit={mockOnSubmit} />);

    expect(screen.getByRole('button', { name: /save farm data/i })).toBeInTheDocument();
  });

  it('does not render submit button when onSubmit is not provided', () => {
    render(<FarmDataSection />);

    expect(screen.queryByRole('button', { name: /save farm data/i })).not.toBeInTheDocument();
  });
});
