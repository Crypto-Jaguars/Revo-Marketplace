"use client";

import { useState, useEffect } from 'react';

interface UseTypewriterProps {
  text: string;
  speed?: number;
}

/**
 * Custom hook that creates a typewriter effect
 * Animates text character by character with configurable speed
 * 
 * @param text - The text to animate
 * @param speed - Speed in milliseconds between each character (default: 100ms)
 * @returns The current text being displayed
 */
export const useTypewriter = (text: string, speed: number = 100): string => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Handle empty string
    if (!text) {
      setDisplayedText('');
      return;
    }

    // Reset displayed text when text changes
    setDisplayedText('');
    
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextCharacter, speed);
      }
    };

    // Start the animation after the first delay
    timeoutId = setTimeout(typeNextCharacter, speed);

    // Cleanup function to prevent memory leaks
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, speed]);

  return displayedText;
};