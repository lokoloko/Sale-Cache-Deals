// src/lib/types.ts
// This file defines shared TypeScript types used throughout the application.
// Centralizing type definitions helps maintain consistency and improves code quality.

// --- Deal Type Definition ---
/**
 * @type Deal
 * @description Represents the structure of a single deal item.
 * // 🔍 This is a critical type definition. Ensure it aligns with backend data structures.
 * // All properties related to a deal should be defined here.
 */
export type Deal = {
  id: string;                   // Unique identifier for the deal.
  productName: string;          // Name of the product.
  productDescription: string;   // Detailed description of the product and deal.
  category: DealCategory;       // Category of the deal (e.g., 'Firearms', 'Accessories').
  imageUrl: string;             // URL of the product image. TODO: Consider image upload vs. URL.
  imageAiHint?: string;         // Optional hint for AI image generation/search, e.g., "pistol handgun".
  retailer: string;             // Name of the retailer offering the deal.
  retailerUrl: string;          // URL to the deal page on the retailer's website. // TODO: Ensure this is a valid, clickable URL.
  originalPrice: number;        // Original price of the product.
  dealPrice: number;            // Discounted price of the product.
  discountPercentage?: number;  // Optional: Calculated discount percentage. Can be derived on frontend or backend.
  postedAt: string;             // ISO date string representing when the deal was posted. // 🔧 Handle date parsing/formatting carefully on client.
  submittedBy?: string;         // Optional: Identifier for the user who submitted the deal. // TODO: Link to user accounts if auth is added.
  tags: string[];               // Array of tags associated with the deal for filtering/searching.
  popularityScore: number;      // A score indicating the deal's popularity. // TODO: This would likely come from backend analytics or voting system.
};

// --- Deal Category Type ---
/**
 * @type DealCategory
 * @description Defines the allowed categories for deals.
 * Using a union type ensures type safety for category assignments.
 * // 🔍 These categories are used for filtering and display. Could be extended or fetched from backend.
 */
export type DealCategory = 'Firearms' | 'Accessories' | 'Ammunition' | 'Optics' | 'Gear';

// --- Filter Category Type ---
/**
 * @type FilterCategory
 * @description Defines the categories available for filtering the deal list.
 * Includes 'All' to show deals from any category, plus specific `DealCategory` options.
 */
export type FilterCategory = 'All' | DealCategory;

// --- Sort Option Type ---
/**
 * @type SortOption
 * @description Defines the available options for sorting the deal list.
 * // 🔍 These options determine the sorting logic applied to the deal feed.
 */
export type SortOption = 'newest' | 'popularity' | 'priceLowHigh' | 'priceHighLow';
