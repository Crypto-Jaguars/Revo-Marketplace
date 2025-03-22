'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { Filter, Search, SortAsc } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { FarmReview, ReviewFilterSortOptions, ReviewListProps, ReviewStat, ReviewStatsProps } from '../../types/review';
import ReviewCard from './ReviewCard';
import ReviewStats from './ReviewStats';

// Mock function to simulate fetching reviews from an API
const fetchReviews = async (
  farmId: string,
  options: ReviewFilterSortOptions
): Promise<{ reviews: FarmReview[]; stats: ReviewStat }> => {
  // In a real implementation, this would be an API call
  console.log('Fetching reviews for farm', farmId, 'with options', options);

  // For demo purposes, just return the initial data
  return {
    reviews: [],
    stats: {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: {},
      categoryAverages: {
        quality: 0,
        communication: 0,
        delivery: 0,
        fulfillment: 0,
      },
    },
  };
};

export default function ReviewList({ farmId, initialReviews = [], initialStats }: ReviewListProps) {
  const [reviews, setReviews] = useState<FarmReview[]>(initialReviews);
  const [stats, setStats] = useState<ReviewStat>(
    initialStats || {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: {},
      categoryAverages: {
        quality: 0,
        communication: 0,
        delivery: 0,
        fulfillment: 0,
      },
    }
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState<ReviewFilterSortOptions>({
    sortBy: 'recent',
    filterByRating: null,
    filterByVerified: false,
    filterByMedia: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const loadReviews = async () => {
  //     setIsLoading(true);
  //     try {
  //       const data = await fetchReviews(farmId, filterOptions);
  //       setReviews(data.reviews);
  //       setStats(data.stats);
  //     } catch (error) {
  //       console.error('Error loading reviews:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   // Only fetch if we don't have initial data or if filter options change
  //   if (initialReviews.length === 0 || Object.keys(filterOptions).length > 0) {
  //     loadReviews();
  //   }
  // }, [farmId, filterOptions, initialReviews.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would trigger a search API call
    console.log('Searching for:', searchTerm);
  };

  const handleSortChange = (value: string) => {
    setFilterOptions({
      ...filterOptions,
      sortBy: value as ReviewFilterSortOptions['sortBy'],
    });
  };

  const handleFilterChange = (key: keyof ReviewFilterSortOptions, value: string | number | boolean | null) => {
    setFilterOptions({
      ...filterOptions,
      [key]: value,
    });
  };

  const handleRatingFilter = (rating: number | null) => {
    setFilterOptions({
      ...filterOptions,
      filterByRating: filterOptions.filterByRating === rating ? null : rating,
    });
  };

  const handleReportReview = (reviewId: string) => {
    // In a real implementation, this would call an API to report the review
    console.log('Reporting review:', reviewId);
    alert('Review reported for moderation');
  };

  const handleVoteHelpful = (reviewId: string) => {
    // In a real implementation, this would call an API to mark the review as helpful
    console.log('Marking review as helpful:', reviewId);
  };

  const handleVoteUnhelpful = (reviewId: string) => {
    // In a real implementation, this would call an API to mark the review as unhelpful
    console.log('Marking review as unhelpful:', reviewId);
  };

  // Filter reveiws based on search term
  const filteredReviews = reviews.filter((review) =>
    review.review.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <ReviewStats stats={stats} />

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <form onSubmit={handleSearch} className="flex w-full sm:w-auto">
          <Input
            type="search"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80"
          />
          <Button type="submit" className="ml-2 bg-[#375B42] hover:bg-[#375B42]/90">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </form>

        <div className="flex gap-2">
          <Select value={filterOptions.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="highest">Highest Rated</SelectItem>
              <SelectItem value="lowest">Lowest Rated</SelectItem>
              <SelectItem value="helpful">Most Helpful</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Reviews</SheetTitle>
                <SheetDescription>Narrow down reviews based on your preferences.</SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <Button
                        key={rating}
                        variant={filterOptions.filterByRating === rating ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleRatingFilter(rating)}
                        className={`mr-2 ${filterOptions.filterByRating === rating && 'bg-[#375B42] text-white !important hover:bg-[#375B42]/90'}`}
                      >
                        {rating} Star{rating !== 1 ? 's' : ''}
                      </Button>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Other Filters</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={filterOptions.filterByVerified}
                        onCheckedChange={(checked) =>
                          handleFilterChange('filterByVerified', checked === true)
                        }
                      />
                      <Label htmlFor="verified">Verified Purchases Only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="with-media"
                        checked={filterOptions.filterByMedia}
                        onCheckedChange={(checked) =>
                          handleFilterChange('filterByMedia', checked === true)
                        }
                      />
                      <Label htmlFor="with-media">With Photos Only</Label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilterOptions({
                        sortBy: 'recent',
                        filterByRating: null,
                        filterByVerified: false,
                        filterByMedia: false,
                      })
                    }
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading reviews...</div>
      ) : filteredReviews.length > 0 ? (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onReport={handleReportReview}
              onVoteHelpful={handleVoteHelpful}
              onVoteUnhelpful={handleVoteUnhelpful}
              currentUserId="user123" // This would come from auth context in a real app
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg bg-muted/50">
          <p className="text-muted-foreground">No reviews found for this farm yet.</p>
          <p className="mt-2">Be the first to share your experience!</p>
        </div>
      )}
    </div>
  );
}
