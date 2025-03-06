import React from 'react';
import FarmReviews from '@/components/reviews';
import {
  mockReviews,
  mockOrganicFarmStats,
  FARM_IDS,
  CURRENT_USER_ID,
  ESCROW_IDS,
} from './mockdata';

function ReviewPage() {
  // Filter reviews for the specific farm
  const farmReviews = mockReviews.filter((review) => review.farmId === FARM_IDS.ORGANIC_FARM);
  return (
    <div className="container mx-auto py-4">
      <div className="bg-muted p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Farm Profile: Green Acres Organic</h2>
        <p className="mb-4">
          Green Acres Organic is a family-owned farm specializing in sustainable, organic produce.
          With over 20 years of experience, they provide high-quality vegetables, fruits, and herbs
          to local communities and through the Revolutionary Farmers platform.
        </p>
      </div>

      <FarmReviews
        farmId={FARM_IDS.ORGANIC_FARM}
        initialReviews={farmReviews}
        initialStats={mockOrganicFarmStats}
        currentUserId={CURRENT_USER_ID}
        hasCompletedEscrow={true}
        escrowContractId={ESCROW_IDS.COMPLETED}
      />
    </div>
  );
}

export default ReviewPage;
