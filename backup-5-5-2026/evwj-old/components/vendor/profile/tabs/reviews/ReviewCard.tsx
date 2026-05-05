"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Review } from "./types";
import { getInitials } from "./utils";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {/* Reviewer Info and Rating */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback className="bg-blue-600 text-white">
                  {getInitials(review.reviewerName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white truncate">
                  {review.reviewerName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={cn(
                    "h-3 w-3 sm:h-4 sm:w-4",
                    index < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Review Text */}
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 break-words">
            &ldquo;{review.reviewText}&rdquo;
          </p>

          {/* Timestamp */}
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {review.timestamp}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

