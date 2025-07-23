export interface FarmReview {
  id: string;
  farmId: string;
  userId: string;
  escrowContractId: string;
  rating: number;
  review: string;
  categories: {
    quality: number;
    communication: number;
    delivery: number;
    fulfillment: number;
  };
  media?: string[];
  createdAt: Date;
  updatedAt?: Date;
  verified: boolean;
  helpful?: number;
  unhelpful?: number;
  farmResponse?: string;
}

export interface ReviewFormData {
  rating: number;
  review: string;
  categories: {
    quality: number;
    communication: number;
    delivery: number;
    fulfillment: number;
  };
  media?: File[];
}

export interface ReviewStat {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>; // 1-5 stars and count
  categoryAverages: {
    quality: number;
    communication: number;
    delivery: number;
    fulfillment: number;
  };
}

export interface ReviewListProps {
  farmId: string;
  initialReviews?: FarmReview[];
  initialStats?: ReviewStat;
}

export interface ReviewCardProps {
  review: FarmReview;
  onEdit?: (reviewId: string) => void;
  onReport?: (reviewId: string) => void;
  onVoteHelpful?: (reviewId: string) => void;
  onVoteUnhelpful?: (reviewId: string) => void;
  currentUserId?: string;
}

export interface ReviewFormProps {
  farmId: string;
  escrowContractId?: string;
  initialData?: Partial<ReviewFormData>;
  onSubmit: (data: ReviewFormData) => Promise<void>;
  onCancel?: () => void;
  isEdit?: boolean;
}

export interface ReviewStatsProps {
  stats: ReviewStat;
}

export interface ReviewGalleryProps {
  media: string[];
  alt?: string;
}

export interface ReviewFilterSortOptions {
  sortBy: 'recent' | 'highest' | 'lowest' | 'helpful';
  filterByRating?: number | null;
  filterByVerified?: boolean;
  filterByMedia?: boolean;
}
