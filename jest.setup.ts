import '@testing-library/jest-dom'

// Add custom matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string): R;
      toBeVisible(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(className: string): R;
      toHaveBeenCalled(): R;
      toHaveBeenCalledWith(...args: any[]): R;
      toHaveBeenCalledTimes(times: number): R;
      toBe(expected: any): R;
      toBeTruthy(): R;
      toBeFalsy(): R;
    }
  }

  // Extend the Assertion interface for chai assertions in the tests
  namespace Chai {
    interface Assertion {
      toBeInTheDocument(): Assertion;
      toHaveTextContent(text: string): Assertion;
      toBeVisible(): Assertion;
      toHaveAttribute(attr: string, value?: string): Assertion;
      toHaveClass(className: string): Assertion;
      toHaveBeenCalled(): Assertion;
      toHaveBeenCalledWith(...args: any[]): Assertion;
      toHaveBeenCalledTimes(count: number): Assertion;
      toBe(expected: any): Assertion;
    }
  }
}
