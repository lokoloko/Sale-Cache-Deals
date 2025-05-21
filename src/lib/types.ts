export type Deal = {
  id: string;
  productName: string;
  productDescription: string;
  category: DealCategory;
  imageUrl: string;
  imageAiHint?: string;
  retailer: string;
  retailerUrl: string;
  originalPrice: number;
  dealPrice: number;
  discountPercentage?: number; // Auto-calculated if possible
  postedAt: string; // ISO date string
  submittedBy?: string;
  tags: string[];
  popularityScore: number; 
};

export type DealCategory = 'Firearms' | 'Accessories' | 'Ammunition' | 'Optics' | 'Gear';

export type FilterCategory = 'All' | DealCategory;

export type SortOption = 'newest' | 'popularity' | 'priceLowHigh' | 'priceHighLow';
