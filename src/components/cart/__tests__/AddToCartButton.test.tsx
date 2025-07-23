import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddToCartButton } from '../AddToCartButton';
import * as cartStore from '@/store/cartStore/store';
import type { Product } from '@/types/product';
import type { CartItem, CartState } from '@/store/cartStore/types';

jest.mock('@/store/cartStore/store', () => ({
  useCartStore: jest.fn(),
}));

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  price: {
    amount: 10.99,
    unit: '$',
  },
  discount: 0,
  images: ['test-image.jpg'],
  stockQuantity: 10,
  farmer: {
    id: 'farmer-1',
    name: 'John Doe',
    farmName: 'Test Farm',
    location: {
      latitude: 123456,
      longitude: 173783,
      address: 'Test Address',
    },
  },
  category: 'Test Category',
  subCategory: 'Test Subcategory',
  certifications: ['Organic'],
  seasonality: ['Spring', 'Summer'],
  harvestDate: new Date(),
  farmingMethod: 'Traditional',
  availableForDelivery: true,
  pickupAvailable: true,
  rating: 4.5,
};

const mockCartItem: CartItem = {
  id: 1,
  name: 'Test Product',
  description: 'Test Description',
  price: {
    amount: 10.99,
    unit: '$',
  },
  discount: 0,
  quantity: 1,
  images: 'test-image.jpg',
  stockQuantity: 10,
  farmer: {
    id: 'farmer-1',
    name: 'John Doe',
    farmName: 'Test Farm',
    location: {
      latitude: 123456,
      longitude: 173783,
      address: 'Test Address',
    },
  },
  category: 'Test Category',
  subCategory: 'Test Subcategory',
  certifications: ['Organic'],
  farmingMethod: 'Traditional',
  availableForDelivery: true,
  pickupAvailable: true,
  rating: 4.5,
};

const createMockStore = (overrides = {}): CartState => ({
  Items: [],
  subtotal: 0,
  shipping: 0,
  total: 0,
  loading: false,
  error: null,
  isOpen: false,
  lastRemovedItems: [],
  setLoading: jest.fn(),
  setError: jest.fn(),
  updateQuantity: jest.fn().mockResolvedValue(undefined),
  calculateSummary: jest.fn(),
  addItem: jest.fn().mockResolvedValue(undefined),
  removeItem: jest.fn().mockResolvedValue(undefined),
  bulkRemove: jest.fn().mockResolvedValue(undefined),
  undoRemove: jest.fn(),
  resetCart: jest.fn(),
  clearCart: jest.fn().mockResolvedValue(undefined),
  toggleCart: jest.fn(),
  ...overrides,
});

describe('AddToCartButton', () => {
  let mockAddItem: jest.Mock;

  beforeEach(() => {
    mockAddItem = jest.fn().mockResolvedValue(undefined);
    const mockUseCartStore = cartStore.useCartStore as jest.MockedFunction<
      typeof cartStore.useCartStore
    >;
    mockUseCartStore.mockImplementation(() => createMockStore({ addItem: mockAddItem }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default state', () => {
    render(<AddToCartButton product={mockProduct} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Add to Cart');
  });

  it("shows 'Add Again' if item is in cart", () => {
    const mockUseCartStore = cartStore.useCartStore as jest.MockedFunction<
      typeof cartStore.useCartStore
    >;
    mockUseCartStore.mockImplementation(() =>
      createMockStore({
        Items: [{ ...mockCartItem, id: 1 }],
        addItem: mockAddItem,
      })
    );

    render(<AddToCartButton product={mockProduct} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/Add Again/i);
  });

  it('handles add to cart action', async () => {
    render(<AddToCartButton product={mockProduct} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const expectedCartItem: CartItem = {
      id: 1,
      name: mockProduct.name,
      description: mockProduct.description,
      price: mockProduct.price,
      discount: mockProduct.discount,
      images: mockProduct.images[0],
      quantity: 1,
      stockQuantity: mockProduct.stockQuantity,
      farmer: mockProduct.farmer,
      category: mockProduct.category,
      subCategory: mockProduct.subCategory || '',
      certifications: mockProduct.certifications,
      farmingMethod: mockProduct.farmingMethod,
      availableForDelivery: mockProduct.availableForDelivery,
      pickupAvailable: mockProduct.pickupAvailable,
      rating: mockProduct.rating,
    };

    expect(mockAddItem).toHaveBeenCalledWith(expectedCartItem);
  });

  it('shows loading state', () => {
    const mockUseCartStore = cartStore.useCartStore as jest.MockedFunction<
      typeof cartStore.useCartStore
    >;
    mockUseCartStore.mockImplementation(() =>
      createMockStore({
        loading: true,
        addItem: mockAddItem,
      })
    );

    render(<AddToCartButton product={mockProduct} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Adding...');
    expect(button).toHaveAttribute('disabled');
  });

  it('applies custom styles', () => {
    render(<AddToCartButton product={mockProduct} className="custom-class" fullWidth />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('w-full');
  });

  it('prevents event propagation', () => {
    render(<AddToCartButton product={mockProduct} />);
    const button = screen.getByRole('button');

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperties(clickEvent, {
      preventDefault: { value: jest.fn() },
      stopPropagation: { value: jest.fn() },
    });

    button.dispatchEvent(clickEvent);

    expect(clickEvent.preventDefault).toHaveBeenCalled();
    expect(clickEvent.stopPropagation).toHaveBeenCalled();
  });
});
