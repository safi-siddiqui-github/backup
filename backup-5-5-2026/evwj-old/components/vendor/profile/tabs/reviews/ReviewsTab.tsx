"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import ReviewCard from "./ReviewCard";
import { MOCK_REVIEWS } from "./mock-data";

export default function ReviewsTab() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Customer Reviews
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          See what your clients are saying
        </p>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {MOCK_REVIEWS.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Empty State */}
      {MOCK_REVIEWS.length === 0 && (
        <Card>
          <CardContent className="flex min-h-[400px] flex-col items-center justify-center p-12">
            <Star className="h-16 w-16 text-gray-300 dark:text-gray-600" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              No Reviews Yet
            </h3>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              Customer reviews will appear here once clients leave feedback
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

