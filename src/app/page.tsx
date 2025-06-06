// src/app/page.tsx
"use client"; // This directive indicates that this is a Client Component.

// --- Core React/Next.js Imports ---
import { useState, useMemo, useEffect } from 'react';

// --- Type Imports ---
// 🔍 Defines the structure for Deal objects, filter categories, and sort options.
import type { Deal, FilterCategory, SortOption } from '@/lib/types';

// --- Data Imports ---
// TODO: Replace placeholderDeals with data fetched from a backend API.
import { placeholderDeals } from '@/lib/placeholder-data';

// --- UI Component Imports ---
import DealList from '@/components/deals/DealList'; // Component to render a list of deals.
import DealFilterSort from '@/components/deals/DealFilterSort'; // Component for filtering and sorting deals.
import { Separator } from '@/components/ui/separator'; // Reusable Separator component for visual division.

// --- HomePage Component ---
/**
 * @page HomePage
 * @description The main landing page of the application, displaying a feed of curated deals.
 * Allows users to filter and sort deals.
 */
export default function HomePage() {
  // --- State Definitions ---
  /**
   * @state deals
   * @description Array of deal objects to be displayed.
   * // TODO: Initialize with empty array and fetch from API in useEffect.
   */
  const [deals, setDeals] = useState<Deal[]>([]);

  /**
   * @state selectedCategory
   * @description Currently selected category for filtering deals.
   * Default is 'All'.
   */
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');

  /**
   * @state selectedSort
   * @description Currently selected option for sorting deals.
   * Default is 'newest'.
   */
  const [selectedSort, setSelectedSort] = useState<SortOption>('newest');

  /**
   * @state isLoading
   * @description Boolean state to indicate if deal data is currently being loaded.
   * // TODO: Set to true initially and false after API fetch completes.
   */
  const [isLoading, setIsLoading] = useState(true); // Start with loading true

  // --- Effects ---
  /**
   * @effect Fetches initial deal data.
   * // TODO: Replace simulation with actual API call to fetch deals.
   * // 🔧 AI might be used here to personalize the initial deal feed based on user preferences.
   */
  useEffect(() => {
    // Simulate fetching data
    setDeals(placeholderDeals); // Using placeholder data for now.
    setIsLoading(false); // Set loading to false after "data is fetched".
  }, []); // Empty dependency array means this runs once on component mount.

  // --- Memoized Computations ---
  /**
   * @memo filteredAndSortedDeals
   * @description Processes the `deals` array based on `selectedCategory` and `selectedSort`.
   * `useMemo` optimizes performance by only re-calculating when dependencies change.
   * // 🔧 Filtering and sorting logic could be enhanced by AI for relevance or dynamic criteria.
   */
  const filteredAndSortedDeals = useMemo(() => {
    let processedDeals = [...deals]; // Create a mutable copy.

    // Apply category filter if not 'All'.
    if (selectedCategory !== 'All') {
      processedDeals = processedDeals.filter(deal => deal.category === selectedCategory);
    }

    // Apply sorting based on selected option.
    switch (selectedSort) {
      case 'newest':
        processedDeals.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
        break;
      case 'popularity':
        // TODO: Popularity score might come from backend analytics.
        processedDeals.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
      case 'priceLowHigh':
        processedDeals.sort((a, b) => a.dealPrice - b.dealPrice);
        break;
      case 'priceHighLow':
        processedDeals.sort((a, b) => b.dealPrice - a.dealPrice);
        break;
    }
    return processedDeals;
  }, [deals, selectedCategory, selectedSort]); // Dependencies for re-computation.

  // --- Conditional Rendering for Loading State ---
  if (isLoading) {
    return (
      <div className="text-center py-10">
        {/* Simple spinner animation */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading deals...</p>
      </div>
    );
  }
  
  // --- Render Logic ---
  return (
    <div className="space-y-8"> {/* Outer container with vertical spacing */}
      <section>
        {/* Page Header */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Today's Top Deals</h1>
        <p className="text-muted-foreground mb-6">
          Discover the latest hand-picked deals on firearms, accessories, and more.
        </p>
        <Separator className="mb-6" /> {/* Visual separator */}
        
        {/* Deal Filtering and Sorting Controls */}
        {/* // 🔍 Props: selectedCategory, onCategoryChange, selectedSort, onSortChange are passed to manage filter/sort state. */}
        <DealFilterSort
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory} // Callback to update category state.
          selectedSort={selectedSort}
          onSortChange={setSelectedSort} // Callback to update sort state.
        />
        
        {/* List of Deals */}
        {/* // 🔍 Prop: `deals` (filtered and sorted) is passed to DealList for rendering. */}
        <DealList deals={filteredAndSortedDeals} />
      </section>
    </div>
  );
}
