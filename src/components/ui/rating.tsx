import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingProps {
  value: number & { __brand: 'ValidRating' };
  max?: number;
  readOnly?: boolean;
  onChange?: (value: number) => void;
}

function isValidRating(
  value: number,
  max: number = 5
): value is number & { __brand: 'ValidRating' } {
  return value >= 0 && value <= max;
}

export function Rating({ value, max = 5, readOnly = false, onChange }: RatingProps) {
  if (max <= 0) {
    throw new Error('Rating: max prop must be greater than 0');
  }
  if (value < 0 || value > max) {
    throw new Error(`Rating: value must be between 0 and ${max}`);
  }

  const [hoveredValue, setHoveredValue] = React.useState<number | null>(null);
  const stars = Array.from({ length: max }, (_, i) => {
    const filled = value >= i + 1;
    const half = value >= i + 0.5 && value < i + 1;
    const displayValue = i + 1;

    return (
      <button
        key={i}
        className={`text-yellow-400 focus:outline-none focus:ring-2 
          ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
        onClick={() => !readOnly && onChange?.(displayValue)}
        onKeyDown={(e) => {
          if (readOnly) return;
          if (e.key === 'ArrowRight') {
            onChange?.(Math.min(displayValue + 1, max));
          } else if (e.key === 'ArrowLeft') {
            onChange?.(Math.max(displayValue - 1, 1));
          }
        }}
        onMouseEnter={() => !readOnly && setHoveredValue(displayValue)}
        onMouseLeave={() => !readOnly && setHoveredValue(null)}
        disabled={readOnly}
        aria-label={`Rate ${displayValue} out of ${max} stars`}
        role="radio"
        aria-checked={value === displayValue}
      >
        {filled ? (
          <Star className="w-4 h-4 fill-current" />
        ) : half ? (
          <StarHalf className="w-4 h-4 fill-current" />
        ) : (
          <Star className="w-4 h-4 stroke-current fill-transparent" />
        )}
      </button>
    );
  });

  return (
    <div
      className="flex gap-0.5"
      role="radiogroup"
      aria-label={`Rating: ${value} out of ${max} stars`}
    >
      {stars}
    </div>
  );
}
