"use client";

import type { FilterCategory, SortOption } from '@/lib/types';
import { filterCategories } from '@/lib/placeholder-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ListFilter, ArrowDownUp } from 'lucide-react';

interface DealFilterSortProps {
  selectedCategory: FilterCategory;
  onCategoryChange: (category: FilterCategory) => void;
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const DealFilterSort: React.FC<DealFilterSortProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
}) => {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'priceLowHigh', label: 'Price: Low to High' },
    { value: 'priceHighLow', label: 'Price: High to Low' },
  ];

  return (
    <Card className="mb-8 shadow">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          <div className="flex-1">
            <Label htmlFor="category-filter" className="text-sm font-medium mb-1 flex items-center">
              <ListFilter className="h-4 w-4 mr-2 text-primary" />
              Filter by Category
            </Label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => onCategoryChange(value as FilterCategory)}
            >
              <SelectTrigger id="category-filter" className="w-full md:w-[250px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {filterCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label htmlFor="sort-deals" className="text-sm font-medium mb-1 flex items-center">
              <ArrowDownUp className="h-4 w-4 mr-2 text-primary" />
              Sort Deals
            </Label>
            <Select
              value={selectedSort}
              onValueChange={(value) => onSortChange(value as SortOption)}
            >
              <SelectTrigger id="sort-deals" className="w-full md:w-[250px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealFilterSort;
