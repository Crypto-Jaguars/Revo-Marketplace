'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Flag, MessageSquare, Star, ThumbsDown, ThumbsUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { ReviewCardProps } from '../../types/review';
import ReviewGallery from './ReviewGallery';

export default function ReviewCard({
  review,
  onEdit,
  onReport,
  onVoteHelpful,
  onVoteUnhelpful,
  currentUserId,
}: ReviewCardProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful || 0);
  const [unhelpfulCount, setUnhelpfulCount] = useState(review.unhelpful || 0);
  const [hasVoted, setHasVoted] = useState(false);

  const isAuthor = currentUserId === review.userId;
  const formattedDate = format(new Date(review.createdAt), 'MMM d, yyyy');

  const handleVoteHelpful = () => {
    if (!hasVoted && onVoteHelpful) {
      onVoteHelpful(review.id);
      setHelpfulCount((prev) => prev + 1);
      setHasVoted(true);
    }
  };

  const handleVoteUnhelpful = () => {
    if (!hasVoted && onVoteUnhelpful) {
      onVoteUnhelpful(review.id);
      setUnhelpfulCount((prev) => prev + 1);
      setHasVoted(true);
    }
  };

  const handleReport = () => {
    if (onReport) {
      onReport(review.id);
    }
    setIsReportDialogOpen(false);
  };

  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating);
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < roundedRating ? 'fill-[#375B42] text-[#375B42] outline-[#375B42]' : 'text-muted-foreground'}`}
          />
        ))}
      </div>
    );
  };

  const renderCategoryRatings = () => {
    const categories = [
      { name: 'Quality', value: review.categories.quality },
      { name: 'Communication', value: review.categories.communication },
      { name: 'Delivery', value: review.categories.delivery },
      { name: 'Fulfillment', value: review.categories.fulfillment },
    ];

    return (
      <div className="grid grid-cols-2 gap-2 mt-4">
        {categories.map((category) => (
          <div key={category.name} className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{category.name}</span>
            <div className="flex">{renderStars(category.value)}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="User avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">User {review.userId.substring(0, 6)}</div>
              <div className="text-sm text-muted-foreground">{formattedDate}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {renderStars(review.rating)}
              <span className="ml-2 font-semibold">{review.rating.toFixed(1)}</span>
            </div>
            {review.verified && (
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                Verified Purchase
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="mb-4">{review.review}</p>

        {renderCategoryRatings()}

        {review.media && review.media.length > 0 && (
          <div className="mt-4">
            <ReviewGallery
              media={review.media}
              alt={`Review by User ${review.userId.substring(0, 6)}`}
            />
          </div>
        )}

        {review.farmResponse && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">Farm Response</span>
            </div>
            <p className="text-sm">{review.farmResponse}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={handleVoteHelpful}
              disabled={hasVoted}
            >
              <ThumbsUp className={`w-4 h-4 mr-1 ${hasVoted ? 'text-muted-foreground' : ''}`} />
              <span>{helpfulCount}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
              onClick={handleVoteUnhelpful}
              disabled={hasVoted}
            >
              <ThumbsDown className={`w-4 h-4 mr-1 ${hasVoted ? 'text-muted-foreground' : ''}`} />
              <span>{unhelpfulCount}</span>
            </Button>
          </div>

          <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8">
                <Flag className="w-4 h-4 mr-1" />
                <span>Report</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report Review</DialogTitle>
                <DialogDescription>
                  Are you sure you want to report this review? This will flag it for moderation.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleReport}>
                  Report
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {isAuthor && onEdit && (
          <Button variant="outline" size="sm" onClick={() => onEdit(review.id)}>
            Edit Review
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
