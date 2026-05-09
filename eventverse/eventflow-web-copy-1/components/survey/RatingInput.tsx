"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";

interface RatingInputProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  labels?: string[];
  className?: string;
  disabled?: boolean;
}

const RatingInput = ({
  min = 1,
  max = 5,
  value = 0,
  onChange,
  labels = [],
  className,
  disabled = false,
}: RatingInputProps) => {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (rating: number) => {
    if (!disabled && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (!disabled) {
      setHoverValue(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverValue(0);
    }
  };

  const displayValue = hoverValue || value;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-1">
        {Array.from({ length: max - min + 1 }, (_, i) => {
          const rating = min + i;
          const isActive = rating <= displayValue;

          return (
            <button
              key={rating}
              type="button"
              className={cn(
                "transition-colors duration-200",
                disabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:scale-110",
              )}
              onClick={() => handleClick(rating)}
              onMouseEnter={() => handleMouseEnter(rating)}
              onMouseLeave={handleMouseLeave}
              disabled={disabled}
            >
              <Star
                className={cn(
                  "h-6 w-6 transition-colors",
                  isActive
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 hover:text-yellow-300",
                )}
              />
            </button>
          );
        })}
        {displayValue > 0 && (
          <span className="text-muted-foreground ml-2 text-sm">
            {displayValue}/{max}
          </span>
        )}
      </div>

      {labels.length > 0 &&
        displayValue > 0 &&
        displayValue <= labels.length && (
          <div className="text-muted-foreground text-center text-sm">
            {labels[displayValue - 1]}
          </div>
        )}
    </div>
  );
};

export default RatingInput;
