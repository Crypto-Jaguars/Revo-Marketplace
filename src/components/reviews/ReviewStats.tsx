'use client';

import { Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ReviewStatsProps } from '../../types/review';

export default function ReviewStats({ stats }: ReviewStatsProps) {
  const { averageRating, totalReviews, ratingDistribution, categoryAverages } = stats;

  // Calculate percentage for each star rating
  const calculatePercentage = (count: number) => {
    return totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
  };

  // Get the count for a specific rating or 0 if not present
  const getCountForRating = (rating: number) => {
    return ratingDistribution[rating] || 0;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating)
                      ? 'fill-[#375B42] text-[#375B42]'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">Based on {totalReviews} reviews</div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="flex items-center w-16">
                  <span className="text-sm">{rating}</span>
                  <Star className="w-4 h-4 ml-1 fill-[#375B42] text-[#375B42]" />
                </div>
                <Progress
                  value={calculatePercentage(getCountForRating(rating))}
                  className="h-2 flex-1 [&>div]:bg-[#375B42]"
                />
                <div className="w-12 text-right text-sm">
                  {calculatePercentage(getCountForRating(rating))}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Ratings */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(categoryAverages).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center">
              <div className="text-sm text-muted-foreground capitalize mb-1">{key}</div>
              <div className="text-xl font-semibold mb-1">{value.toFixed(1)}</div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(value)
                        ? 'fill-[#375B42] text-[#375B42]'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
