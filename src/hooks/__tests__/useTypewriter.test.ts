import { renderHook, act } from '@testing-library/react';
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { useTypewriter } from '../useTypewriter';

// Mock setTimeout and clearTimeout
vi.useFakeTimers();

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should start with empty string', () => {
    const { result } = renderHook(() => useTypewriter('Hello', 100));
    expect(result.current).toBe('');
  });

  it('should animate text character by character', () => {
    const { result } = renderHook(() => useTypewriter('Hello', 100));
    
    // Initially empty
    expect(result.current).toBe('');
    
    // After first timeout
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('H');
    
    // After second timeout
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('He');
    
    // After third timeout
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('Hel');
    
    // After fourth timeout
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('Hell');
    
    // After fifth timeout
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('Hello');
  });

  it('should use configurable speed', () => {
    const { result } = renderHook(() => useTypewriter('Hi', 200));
    
    expect(result.current).toBe('');
    
    // Should not update after 100ms
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('');
    
    // Should update after 200ms
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('H');
  });

  it('should handle empty strings', () => {
    const { result } = renderHook(() => useTypewriter('', 100));
    expect(result.current).toBe('');
    
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe('');
  });

  it('should reset when text changes', () => {
    const { result, rerender } = renderHook(
      ({ text }) => useTypewriter(text, 100),
      { initialProps: { text: 'Hello' } }
    );
    
    // Advance to show some characters
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('He');
    
    // Change the text
    rerender({ text: 'World' });
    expect(result.current).toBe('');
    
    // Advance timer for new text
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('W');
  });

  it('should cleanup timeouts on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    const { unmount } = renderHook(() => useTypewriter('Hello', 100));
    
    // Start animation
    act(() => {
      vi.advanceTimersByTime(100);
    });
    
    // Unmount component
    unmount();
    
    // Verify cleanup was called
    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    clearTimeoutSpy.mockRestore();
  });

  it('should use default speed of 100ms', () => {
    const { result } = renderHook(() => useTypewriter('Hi'));
    
    expect(result.current).toBe('');
    
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('H');
    
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('Hi');
  });
});