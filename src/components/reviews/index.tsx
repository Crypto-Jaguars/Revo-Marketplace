'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { FarmReview, ReviewFormData, ReviewStat } from '../../types/review';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

interface FarmReviewsProps {
  farmId: string;
  initialReviews?: FarmReview[];
  initialStats?: ReviewStat;
  currentUserId?: string;
  hasCompletedEscrow?: boolean;
  escrowContractId?: string;
}

export default function FarmReviews({
  farmId,
  initialReviews = [],
  initialStats,
  currentUserId,
  hasCompletedEscrow = false,
  escrowContractId,
}: FarmReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState<FarmReview[]>(initialReviews);
  const [editingReview, setEditingReview] = useState<FarmReview | null>(null);
  const [activeTab, setActiveTab] = useState<string>('reviews');

  const handleSubmitReview = async (data: ReviewFormData) => {
    try {
      // In a real implementation, this would be an API call
      console.log('Submitting review:', data);

      // Mock a successful submission
      const newReview: FarmReview = {
        id: `review-${Date.now()}`,
        farmId,
        userId: currentUserId || 'anonymous',
        escrowContractId: escrowContractId || '',
        rating: data.rating,
        review: data.review,
        categories: data.categories,
        media: data.media
          ? data.media.map((_, i) => `/placeholder.svg?height=400&width=400&text=Image${i + 1}`)
          : [],
        createdAt: new Date(),
        verified: !!escrowContractId,
        helpful: 0,
        unhelpful: 0,
      };

      if (editingReview) {
        // Update existing review
        setReviews(
          reviews.map((r) =>
            r.id === editingReview.id ? { ...newReview, id: editingReview.id } : r
          )
        );
      } else {
        // Add new review
        setReviews([newReview, ...reviews]);
      }

      setShowReviewForm(false);
      setEditingReview(null);
      setActiveTab('reviews');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleEditReview = (reviewId: string) => {
    const review = reviews.find((r) => r.id === reviewId);
    if (review) {
      setEditingReview(review);
      setShowReviewForm(true);
      setActiveTab('write');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Farm Reviews</h2>
        {hasCompletedEscrow && !showReviewForm && (
          <Button
            className="bg-[#375B42] hover:bg-[#375B42]/90"
            onClick={() => {
              setShowReviewForm(true);
              setEditingReview(null);
              setActiveTab('write');
            }}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Write a Review
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          {(showReviewForm || activeTab === 'write') && (
            <TabsTrigger value="write">
              {editingReview ? 'Edit Review' : 'Write a Review'}
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="reviews">
          <ReviewList farmId={farmId} initialReviews={reviews} initialStats={initialStats} />
        </TabsContent>

        <TabsContent value="write">
          {(showReviewForm || activeTab === 'write') && (
            <ReviewForm
              farmId={farmId}
              escrowContractId={escrowContractId}
              initialData={
                editingReview
                  ? {
                      rating: editingReview.rating,
                      review: editingReview.review,
                      categories: editingReview.categories,
                    }
                  : undefined
              }
              onSubmit={handleSubmitReview}
              onCancel={() => {
                setShowReviewForm(false);
                setEditingReview(null);
                setActiveTab('reviews');
              }}
              isEdit={!!editingReview}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
