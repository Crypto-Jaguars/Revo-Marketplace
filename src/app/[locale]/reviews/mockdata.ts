import type { FarmReview, ReviewStats } from '@/components/reviews/types';

// Current user ID for testing edit functionality
export const CURRENT_USER_ID = 'user123';

// Mock farm IDs
export const FARM_IDS = {
  ORGANIC_FARM: 'farm_organic_123',
  DAIRY_FARM: 'farm_dairy_456',
  VEGETABLE_FARM: 'farm_vegetable_789',
};

// Mock escrow contract IDs
export const ESCROW_IDS = {
  COMPLETED: 'escrow_completed_123',
  PENDING: 'escrow_pending_456',
  NEW: 'escrow_new_789',
};

// Generate a set of mock reviews with diverse characteristics
export const mockReviews: FarmReview[] = [
  // 5-star review with media from current user (for testing edit functionality)
  {
    id: 'review_001',
    farmId: FARM_IDS.ORGANIC_FARM,
    userId: CURRENT_USER_ID,
    escrowContractId: ESCROW_IDS.COMPLETED,
    rating: 5,
    review:
      "Absolutely outstanding experience with this farm! The produce was incredibly fresh and flavorful. Everything arrived well-packaged and exactly as described. The farmer was very communicative throughout the entire process and even included a handwritten note with my order. I've already placed another order and can't wait to receive more of their amazing products.",
    categories: {
      quality: 5,
      communication: 5,
      delivery: 5,
      fulfillment: 5,
    },
    media: ['/images/tomatoes.jpg', '/images/tomatoes.jpg', '/images/tomatoes.jpg'],
    createdAt: new Date('2023-12-15T14:30:00'),
    verified: true,
    helpful: 24,
    unhelpful: 1,
  },

  // 4-star review with farm response
  {
    id: 'review_002',
    farmId: FARM_IDS.ORGANIC_FARM,
    userId: 'user456',
    escrowContractId: ESCROW_IDS.COMPLETED,
    rating: 4,
    review:
      "Great quality produce and excellent communication. The only reason I'm not giving 5 stars is because the delivery was a day late. Otherwise, everything was perfect and I would definitely order again.",
    categories: {
      quality: 5,
      communication: 5,
      delivery: 3,
      fulfillment: 4,
    },
    media: ['/images/tomatoes.jpg'],
    createdAt: new Date('2023-11-28T09:15:00'),
    verified: true,
    helpful: 18,
    unhelpful: 2,
    farmResponse:
      "Thank you for your review! We apologize for the delivery delay. We had some unexpected transportation issues that day. We've since improved our logistics to ensure timely deliveries. We hope to serve you again soon!",
  },

  // 3-star review with no media
  {
    id: 'review_003',
    farmId: FARM_IDS.ORGANIC_FARM,
    userId: 'user789',
    escrowContractId: ESCROW_IDS.COMPLETED,
    rating: 3,
    review:
      'Mixed experience. The produce quality was good, but there were some communication issues. I had to follow up multiple times to get updates on my order. The delivery was on time, but some items were missing. They did refund me for the missing items promptly when I reported the issue.',
    categories: {
      quality: 4,
      communication: 2,
      delivery: 4,
      fulfillment: 3,
    },
    media: [],
    createdAt: new Date('2023-10-05T16:45:00'),
    verified: true,
    helpful: 12,
    unhelpful: 3,
  },

  // 2-star review with farm response
  {
    id: 'review_004',
    farmId: FARM_IDS.ORGANIC_FARM,
    userId: 'user101',
    escrowContractId: ESCROW_IDS.COMPLETED,
    rating: 2,
    review:
      'Disappointing experience. While some of the produce was good, several items were damaged or spoiled upon arrival. The packaging was insufficient for the journey. When I reached out about the issues, the response was slow and not very helpful.',
    categories: {
      quality: 2,
      communication: 2,
      delivery: 3,
      fulfillment: 2,
    },
    media: ['/images/tomatoes.jpg', '/images/tomatoes.jpg'],
    createdAt: new Date('2023-09-18T11:20:00'),
    verified: true,
    helpful: 15,
    unhelpful: 4,
    farmResponse:
      "We sincerely apologize for your experience. We've taken your feedback seriously and have completely redesigned our packaging to better protect our produce during shipping. We've also improved our customer service response times. We'd love a chance to make things right - please contact us directly if you're willing to give us another try.",
  },

  // 1-star review
  {
    id: 'review_005',
    farmId: FARM_IDS.ORGANIC_FARM,
    userId: 'user202',
    escrowContractId: ESCROW_IDS.COMPLETED,
    rating: 1,
    review:
      'Terrible experience from start to finish. The order was significantly delayed with no communication. When it finally arrived, most items were of poor quality or completely different from what I ordered. Multiple attempts to contact the farm went unanswered. I had to file a dispute to get my money back.',
    categories: {
      quality: 1,
      communication: 1,
      delivery: 1,
      fulfillment: 1,
    },
    media: ['/placeholder.svg?height=600&width=800&text=Wrong+Items'],
    createdAt: new Date('2023-08-30T08:10:00'),
    verified: true,
    helpful: 20,
    unhelpful: 2,
  },

  // Unverified review (no escrow)
  {
    id: 'review_006',
    farmId: FARM_IDS.ORGANIC_FARM,
    userId: 'user303',
    escrowContractId: '',
    rating: 5,
    review:
      "I visited this farm in person and was very impressed with their operation. The farmers were knowledgeable and passionate about sustainable agriculture. While I haven't ordered from them online yet, based on what I saw, I would highly recommend them.",
    categories: {
      quality: 5,
      communication: 5,
      delivery: 5,
      fulfillment: 5,
    },
    media: ['/images/tomatoes.jpg', '/images/tomatoes.jpg'],
    createdAt: new Date('2023-12-01T15:30:00'),
    verified: false,
    helpful: 8,
    unhelpful: 10,
  },

  // Recent review with no votes yet
  {
    id: 'review_007',
    farmId: FARM_IDS.ORGANIC_FARM,
    userId: 'user404',
    escrowContractId: ESCROW_IDS.COMPLETED,
    rating: 4,
    review:
      "Just received my first order yesterday and I'm quite pleased. Everything was fresh and as described. The packaging was eco-friendly which I appreciate. Looking forward to cooking with these ingredients!",
    categories: {
      quality: 4,
      communication: 4,
      delivery: 5,
      fulfillment: 4,
    },
    media: ['/images/tomatoes.jpg'],
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    verified: true,
    helpful: 0,
    unhelpful: 0,
  },

  // Another review from current user (for testing multiple edits)
  {
    id: 'review_008',
    farmId: FARM_IDS.ORGANIC_FARM,
    userId: CURRENT_USER_ID,
    escrowContractId: ESCROW_IDS.COMPLETED,
    rating: 3,
    review:
      "This was my second order from this farm. Not as impressed this time. The quality was still good, but there were some issues with the order accuracy and delivery timing. I'll give them another chance though.",
    categories: {
      quality: 4,
      communication: 3,
      delivery: 2,
      fulfillment: 3,
    },
    media: [],
    createdAt: new Date('2023-11-10T10:45:00'),
    verified: true,
    helpful: 5,
    unhelpful: 1,
  },

  // Very old review to test date sorting
  {
    id: 'review_009',
    farmId: FARM_IDS.ORGANIC_FARM,
    userId: 'user505',
    escrowContractId: ESCROW_IDS.COMPLETED,
    rating: 5,
    review:
      "I've been ordering from this farm for over a year now and have always had excellent experiences. Their seasonal vegetable boxes are amazing and have introduced me to many new vegetables I wouldn't have tried otherwise. Highly recommend their subscription service!",
    categories: {
      quality: 5,
      communication: 5,
      delivery: 5,
      fulfillment: 5,
    },
    media: ['/images/tomatoes.jpg', '/images/tomatoes.jpg'],
    createdAt: new Date('2022-06-15T09:30:00'),
    verified: true,
    helpful: 45,
    unhelpful: 2,
  },

  // Review with lots of helpful votes
  {
    id: 'review_010',
    farmId: FARM_IDS.ORGANIC_FARM,
    userId: 'user606',
    escrowContractId: ESCROW_IDS.COMPLETED,
    rating: 5,
    review:
      "This farm has changed how my family eats. The quality and flavor of their produce is incomparable to anything you can find in stores. Yes, it's more expensive than supermarket produce, but the difference in taste and nutrition is worth every penny. Their heirloom tomatoes in particular are incredible - they taste like tomatoes should taste!",
    categories: {
      quality: 5,
      communication: 5,
      delivery: 4,
      fulfillment: 5,
    },
    media: ['/images/tomatoes.jpg', '/images/tomatoes.jpg'],
    createdAt: new Date('2023-07-22T14:15:00'),
    verified: true,
    helpful: 78,
    unhelpful: 3,
  },

  // Review with maximum media
  {
    id: 'review_011',
    farmId: FARM_IDS.ORGANIC_FARM,
    userId: 'user707',
    escrowContractId: ESCROW_IDS.COMPLETED,
    rating: 4,
    review:
      "I documented my entire experience with this farm from ordering to cooking. The website was easy to navigate and I received confirmation immediately. The produce arrived well-packaged and fresh. I've included photos of everything from unboxing to the meals I prepared. Overall very satisfied and will order again.",
    categories: {
      quality: 4,
      communication: 5,
      delivery: 4,
      fulfillment: 4,
    },
    media: [
      '/images/tomatoes.jpg',
      '/images/tomatoes.jpg',
      '/images/tomatoes.jpg',
      '/images/tomatoes.jpg',
      '/images/tomatoes.jpg',
    ],
    createdAt: new Date('2023-10-30T16:20:00'),
    verified: true,
    helpful: 32,
    unhelpful: 1,
  },

  // Very short review
  {
    id: 'review_012',
    farmId: FARM_IDS.ORGANIC_FARM,
    userId: 'user808',
    escrowContractId: ESCROW_IDS.COMPLETED,
    rating: 5,
    review: 'Excellent quality. Fast delivery. Will buy again!',
    categories: {
      quality: 5,
      communication: 5,
      delivery: 5,
      fulfillment: 5,
    },
    media: [],
    createdAt: new Date('2023-12-05T11:45:00'),
    verified: true,
    helpful: 3,
    unhelpful: 0,
  },

  // Review with updated date
  {
    id: 'review_013',
    farmId: FARM_IDS.ORGANIC_FARM,
    userId: 'user909',
    escrowContractId: ESCROW_IDS.COMPLETED,
    rating: 3,
    review:
      "Updated review: Initially had issues with my order, but the farm reached out proactively to resolve them. They sent a replacement package and included some extra items as an apology. Impressed with how they handled the situation, so I'm updating my original 2-star review to 3 stars.",
    categories: {
      quality: 4,
      communication: 4,
      delivery: 2,
      fulfillment: 3,
    },
    media: [],
    createdAt: new Date('2023-11-02T09:10:00'),
    updatedAt: new Date('2023-11-10T14:25:00'),
    verified: true,
    helpful: 15,
    unhelpful: 2,
  },

  // Review with mixed category ratings
  {
    id: 'review_014',
    farmId: FARM_IDS.ORGANIC_FARM,
    userId: 'user010',
    escrowContractId: ESCROW_IDS.COMPLETED,
    rating: 3,
    review:
      "The produce quality was excellent, but everything else about the experience was disappointing. Communication was minimal, delivery was delayed by several days with no updates, and I received only part of my order. When I finally got a response about the missing items, I was told they were out of stock, though this wasn't communicated beforehand.",
    categories: {
      quality: 5,
      communication: 1,
      delivery: 2,
      fulfillment: 2,
    },
    media: ['/images/tomatoes.jpg'],
    createdAt: new Date('2023-09-05T13:40:00'),
    verified: true,
    helpful: 22,
    unhelpful: 5,
  },

  // Review with only unhelpful votes
  {
    id: 'review_015',
    farmId: FARM_IDS.ORGANIC_FARM,
    userId: 'user020',
    escrowContractId: ESCROW_IDS.COMPLETED,
    rating: 1,
    review:
      'AVOID AT ALL COSTS!!! Complete scam! They took my money and sent me rotten vegetables. WORST EXPERIENCE EVER!!!',
    categories: {
      quality: 1,
      communication: 1,
      delivery: 1,
      fulfillment: 1,
    },
    media: [],
    createdAt: new Date('2023-08-15T10:30:00'),
    verified: true,
    helpful: 0,
    unhelpful: 25,
    farmResponse:
      "We're sorry to hear about your experience. Our records show we offered a full refund and replacement, which you accepted. We take quality very seriously and would appreciate if you would update your review to reflect the resolution of your concerns.",
  },
];

// Calculate mock stats based on the reviews
export const calculateMockStats = (reviews: FarmReview[]): ReviewStats => {
  // Initialize distribution and category totals
  const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const categoryTotals = {
    quality: 0,
    communication: 0,
    delivery: 0,
    fulfillment: 0,
  };

  // Calculate totals
  let ratingTotal = 0;

  reviews.forEach((review) => {
    // Add to rating distribution
    ratingDistribution[review.rating] = (ratingDistribution[review.rating] || 0) + 1;

    // Add to rating total
    ratingTotal += review.rating;

    // Add to category totals
    categoryTotals.quality += review.categories.quality;
    categoryTotals.communication += review.categories.communication;
    categoryTotals.delivery += review.categories.delivery;
    categoryTotals.fulfillment += review.categories.fulfillment;
  });

  const totalReviews = reviews.length;

  // Calculate averages
  const averageRating = totalReviews > 0 ? ratingTotal / totalReviews : 0;

  const categoryAverages = {
    quality: totalReviews > 0 ? categoryTotals.quality / totalReviews : 0,
    communication: totalReviews > 0 ? categoryTotals.communication / totalReviews : 0,
    delivery: totalReviews > 0 ? categoryTotals.delivery / totalReviews : 0,
    fulfillment: totalReviews > 0 ? categoryTotals.fulfillment / totalReviews : 0,
  };

  return {
    averageRating,
    totalReviews,
    ratingDistribution,
    categoryAverages,
  };
};

// Generate mock stats for the organic farm
export const mockOrganicFarmStats = calculateMockStats(
  mockReviews.filter((review) => review.farmId === FARM_IDS.ORGANIC_FARM)
);
