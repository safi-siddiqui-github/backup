import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const renderStars = (rating: number, size: "sm" | "md" = "md") => {
  const starSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  
  return Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;
    const isFull = starValue <= Math.floor(rating);
    const isHalf = starValue === Math.ceil(rating) && rating % 1 !== 0;

    return (
      <Star
        key={i}
        className={cn(
          starSize,
          isFull
            ? "fill-yellow-400 text-yellow-400"
            : isHalf
              ? "fill-yellow-400/50 text-yellow-400"
              : "fill-gray-300 text-gray-300"
        )}
      />
    );
  });
};

