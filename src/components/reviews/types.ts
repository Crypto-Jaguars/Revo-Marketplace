export interface FarmReview {
  id: string;
  userId: string;
  userName?: string;
  userAvatar?: string;
  farmId: string;
  escrowContractId?: string;
  rating: number;
  title?: string;
  content?: string;
  review?: string;
  date?: string;
  createdAt?: Date;
  updatedAt?: Date;
  helpfulCount?: number;
  replyCount?: number;
  helpful?: number;
  unhelpful?: number;
  verified: boolean;
  media?: string[];
  images?: string[];
  tags?: string[];
  categories?: {
    quality: number;
    communication: number;
    delivery: number;
    fulfillment: number;
  };
  farmResponse?: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  verifiedCount: number;
  withImagesCount?: number;
  withMediaCount?: number;
  categoryAverages?: {
    quality: number;
    communication: number;
    delivery: number;
    fulfillment: number;
  };
}
