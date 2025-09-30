import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FarmDataSection } from '../FarmDataSection';

// Mock the toast function
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('FarmDataSection', () => {
  const mockOnSubmit = vi.fn();
  const mockOnDataChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all required fields', () => {
    render(<FarmDataSection />);

    expect(screen.getByLabelText(/farm name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/size.*hectares/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cultivation method/i)).toBeInTheDocument();
  });

  it('displays correct placeholders', () => {
    render(<FarmDataSection />);

    expect(screen.getByPlaceholderText(/enter your farm name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/select or type location/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e\.g\., 5\.5/i)).toBeInTheDocument();
  });

  it('handles input changes correctly', async () => {
    const user = userEvent.setup();
    render(<FarmDataSection onDataChange={mockOnDataChange} />);

    const farmNameInput = screen.getByLabelText(/farm name/i);
    await user.type(farmNameInput, 'Green Acres Farm');

    expect(mockOnDataChange).toHaveBeenCalledWith(
      expect.objectContaining({
        farmName: 'Green Acres Farm',
      })
    );
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<FarmDataSection onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /save farm data/i });
    await user.click(submitButton);

    expect(screen.getByText(/farm name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/location is required/i)).toBeInTheDocument();
    expect(screen.getByText(/farm size is required/i)).toBeInTheDocument();
    expect(screen.getByText(/cultivation method is required/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates numeric input for size field', async () => {
    const user = userEvent.setup();
    render(<FarmDataSection onSubmit={mockOnSubmit} />);

    const sizeInput = screen.getByLabelText(/size.*hectares/i);
    await user.type(sizeInput, 'invalid');

    const submitButton = screen.getByRole('button', { name: /save farm data/i });
    await user.click(submitButton);

    expect(screen.getByText(/please enter a valid size in hectares/i)).toBeInTheDocument();
  });

  it('validates minimum farm name length', async () => {
    const user = userEvent.setup();
    render(<FarmDataSection onSubmit={mockOnSubmit} />);

    const farmNameInput = screen.getByLabelText(/farm name/i);
    await user.type(farmNameInput, 'A');

    const submitButton = screen.getByRole('button', { name: /save farm data/i });
    await user.click(submitButton);

    expect(screen.getByText(/farm name must be at least 2 characters/i)).toBeInTheDocument();
  });

  it('validates maximum size limit', async () => {
    const user = userEvent.setup();
    render(<FarmDataSection onSubmit={mockOnSubmit} />);

    const sizeInput = screen.getByLabelText(/size.*hectares/i);
    await user.type(sizeInput, '15000');

    const submitButton = screen.getByRole('button', { name: /save farm data/i });
    await user.click(submitButton);

    expect(screen.getByText(/size seems unusually large/i)).toBeInTheDocument();
  });

  it('opens location autocomplete when clicked', async () => {
    const user = userEvent.setup();
    render(<FarmDataSection />);

    const locationButton = screen.getByRole('combobox', { name: /location/i });
    await user.click(locationButton);

    expect(screen.getByPlaceholderText(/search location/i)).toBeInTheDocument();
  });

  it('filters location suggestions based on input', async () => {
    const user = userEvent.setup();
    render(<FarmDataSection />);

    const locationButton = screen.getByRole('combobox', { name: /location/i });
    await user.click(locationButton);

    const searchInput = screen.getByPlaceholderText(/search location/i);
    await user.type(searchInput, 'California');

    await waitFor(() => {
      expect(screen.getByText(/california, usa/i)).toBeInTheDocument();
    });
  });

  it('selects cultivation method from dropdown', async () => {
    const user = userEvent.setup();
    render(<FarmDataSection onDataChange={mockOnDataChange} />);

    const methodSelect = screen.getByRole('combobox', { name: /cultivation method/i });
    await user.click(methodSelect);

    const organicOption = screen.getByText(/organic/i);
    await user.click(organicOption);

    expect(mockOnDataChange).toHaveBeenCalledWith(
      expect.objectContaining({
        cultivationMethod: 'organic',
      })
    );
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    render(<FarmDataSection onSubmit={mockOnSubmit} />);

    // Fill in all required fields
    await user.type(screen.getByLabelText(/farm name/i), 'Green Acres Farm');
    await user.type(screen.getByLabelText(/size.*hectares/i), '10.5');

    // Select location
    const locationButton = screen.getByRole('combobox', { name: /location/i });
    await user.click(locationButton);
    const searchInput = screen.getByPlaceholderText(/search location/i);
    await user.type(searchInput, 'California');
    await waitFor(() => {
      const californiaOption = screen.getByText(/california, usa/i);
      fireEvent.click(californiaOption);
    });

    // Select cultivation method
    const methodSelect = screen.getByRole('combobox', { name: /cultivation method/i });
    await user.click(methodSelect);
    const organicOption = screen.getByText(/organic/i);
    await user.click(organicOption);

    // Submit form
    const submitButton = screen.getByRole('button', { name: /save farm data/i });
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      farmName: 'Green Acres Farm',
      location: 'California, USA',
      size: '10.5',
      cultivationMethod: 'organic',
    });
  });

  it('clears errors when user starts typing', async () => {
    const user = userEvent.setup();
    render(<FarmDataSection onSubmit={mockOnSubmit} />);

    // Submit empty form to trigger errors
    const submitButton = screen.getByRole('button', { name: /save farm data/i });
    await user.click(submitButton);

    expect(screen.getByText(/farm name is required/i)).toBeInTheDocument();

    // Start typing in farm name field
    const farmNameInput = screen.getByLabelText(/farm name/i);
    await user.type(farmNameInput, 'G');

    // Error should be cleared
    expect(screen.queryByText(/farm name is required/i)).not.toBeInTheDocument();
  });

  it('displays contextual help', () => {
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
});
