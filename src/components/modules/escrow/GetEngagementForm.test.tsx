import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GetEngagementForm } from './GetEngagementForm';
import { useGetEngagementEscrowHook } from './hooks/get-engagement-escrow.hook';
import { UseFormReturn } from 'react-hook-form';

interface EngagementFormData {
  engagementId: string;
}

jest.mock('./hooks/get-engagement-escrow.hook');

describe('GetEngagementForm', () => {
  const mockOnSubmit = jest.fn();
  const mockForm: Partial<UseFormReturn<EngagementFormData>> = {
    handleSubmit: jest.fn((fn) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      fn();
    }),
    control: {},
  };

  beforeEach(() => {
    (
      useGetEngagementEscrowHook as jest.MockedFunction<typeof useGetEngagementEscrowHook>
    ).mockReturnValue({
      onSubmit: mockOnSubmit,
      form: mockForm,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields and button', () => {
    render(<GetEngagementForm />);

    expect(screen.getByLabelText(/Contract ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Engagement/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter the engagement/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /This engagement will help you identify the escrows associated with a service provider./i
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get/i })).toBeInTheDocument();
  });

  test('validates Contract ID and Engagement ID fields', () => {
    render(<GetEngagementForm />);

    const contractIdInput = screen.getByLabelText(/Contract ID/i);
    const engagementIdInput = screen.getByLabelText(/Engagement/i);
    const submitButton = screen.getByRole('button', { name: /Get/i });

    fireEvent.change(contractIdInput, { target: { value: '123' } });
    fireEvent.change(engagementIdInput, { target: { value: '456' } });

    expect(contractIdInput).toHaveValue('123');
    expect(engagementIdInput).toHaveValue('456');

    fireEvent.click(submitButton);

    expect(mockForm.handleSubmit).toHaveBeenCalled();
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test('handles form submission', () => {
    render(<GetEngagementForm />);

    const submitButton = screen.getByRole('button', { name: /Get/i });

    fireEvent.click(submitButton);

    expect(mockForm.handleSubmit).toHaveBeenCalled();
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test('displays error messages for invalid inputs', () => {
    render(<GetEngagementForm />);

    const submitButton = screen.getByRole('button', { name: /Get/i });

    fireEvent.click(submitButton);

    expect(screen.getByText(/Contract ID is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Engagement ID is required/i)).toBeInTheDocument();
  });

  test('responsive design - button width', () => {
    render(<GetEngagementForm />);

    const submitButton = screen.getByRole('button', { name: /Get/i });

    expect(submitButton).toHaveClass('w-full md:w-1/4');
  });
});
