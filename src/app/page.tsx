"use client";

import { useState, useMemo, useEffect } from 'react';
import type { Deal, FilterCategory, SortOption } from '@/lib/types';
import { placeholderDeals } from '@/lib/placeholder-data';
import DealList from '@/components/deals/DealList';
import DealFilterSort from '@/components/deals/DealFilterSort';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [selectedSort, setSelectedSort] = useState<SortOption>('newest');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setDeals(placeholderDeals);
    setIsLoading(false);
  }, []);

  const filteredAndSortedDeals = useMemo(() => {
    let processedDeals = [...deals];

    if (selectedCategory !== 'All') {
      processedDeals = processedDeals.filter(deal => deal.category === selectedCategory);
    }

    switch (selectedSort) {
      case 'newest':
        processedDeals.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
        break;
      case 'popularity':
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
  }, [deals, selectedCategory, selectedSort]);

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading deals...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Today's Top Deals</h1>
        <p className="text-muted-foreground mb-6">
          Discover the latest hand-picked deals on firearms, accessories, and more.
        </p>
        <Separator className="mb-6" />
        <DealFilterSort
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
        />
        <DealList deals={filteredAndSortedDeals} />
      </section>
    </div>
  );
}
