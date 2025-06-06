// src/components/deals/DealFilterSort.tsx
"use client"; // This directive indicates that this is a Client Component.

// --- Type Imports ---
// 🔍 Defines the structure for filter categories and sort options.
import type { FilterCategory, SortOption } from '@/lib/types';

// --- Data Imports ---
// TODO: `filterCategories` might eventually come from a backend or dynamic configuration.
import { filterCategories } from '@/lib/placeholder-data';

// --- UI Component Imports ---
// Reusable Select components from ShadCN UI for dropdowns.
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label'; // Reusable Label component.
import { Card, CardContent } from '@/components/ui/card'; // Reusable Card components.

// --- Icon Imports ---
import { ListFilter, ArrowDownUp } from 'lucide-react'; // Icons for visual cues.

// --- Component Props Definition ---
/**
 * @interface DealFilterSortProps
 * @description Props for the DealFilterSort component.
 * @property {FilterCategory} selectedCategory - The currently selected filter category.
 * @property {(category: FilterCategory) => void} onCategoryChange - Callback function invoked when the category selection changes.
 * @property {SortOption} selectedSort - The currently selected sort option.
 * @property {(sort: SortOption) => void} onSortChange - Callback function invoked when the sort option selection changes.
 */
interface DealFilterSortProps {
  selectedCategory: FilterCategory;
  onCategoryChange: (category: FilterCategory) => void; // Parent component (e.g., HomePage) manages this state.
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void; // Parent component manages this state.
}

// --- DealFilterSort Component ---
/**
 * @component DealFilterSort
 * @description A UI component that provides controls for filtering deals by category and sorting them.
 * It is used on pages that display lists of deals, like the HomePage.
 * This component is state-agnostic; it receives current selections and callbacks from its parent.
 * @param {DealFilterSortProps} props - The props for the component.
 */
const DealFilterSort: React.FC<DealFilterSortProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
}) => {
  // Define the available sort options.
  // 🔍 These options determine how the deal list can be sorted.
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'popularity', label: 'Most Popular' }, // TODO: Popularity sorting relies on backend data/logic.
    { value: 'priceLowHigh', label: 'Price: Low to High' },
    { value: 'priceHighLow', label: 'Price: High to Low' },
  ];

  return (
    // Reusable Card component to visually group the filter/sort controls.
    <Card className="mb-8 shadow">
      <CardContent className="p-4"> {/* Padding within the card. */}
        {/* Flex container for arranging filter and sort controls, responsive for mobile (column) and desktop (row). */}
        <div className="flex flex-col md:flex-row gap-4 md:items-end">
          {/* Category Filter Section */}
          <div className="flex-1"> {/* `flex-1` allows this section to grow. */}
            <Label htmlFor="category-filter" className="text-sm font-medium mb-1 flex items-center">
              <ListFilter className="h-4 w-4 mr-2 text-primary" /> {/* Icon for category filter. */}
              Filter by Category
            </Label>
            {/* Reusable Select component for category selection. */}
            <Select
              value={selectedCategory} // Controlled component: value is from props.
              onValueChange={(value) => onCategoryChange(value as FilterCategory)} // Callback on value change.
            >
              <SelectTrigger id="category-filter" className="w-full md:w-[250px]"> {/* Styling for the trigger. */}
                <SelectValue placeholder="Select category" /> {/* Placeholder text. */}
              </SelectTrigger>
              <SelectContent> {/* Content of the dropdown. */}
                {/* // 🔍 `filterCategories` are mapped to SelectItem components. */}
                {filterCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Deals Section */}
          <div className="flex-1"> {/* `flex-1` allows this section to grow. */}
            <Label htmlFor="sort-deals" className="text-sm font-medium mb-1 flex items-center">
              <ArrowDownUp className="h-4 w-4 mr-2 text-primary" /> {/* Icon for sorting. */}
              Sort Deals
            </Label>
            {/* Reusable Select component for sorting option selection. */}
            <Select
              value={selectedSort} // Controlled component: value is from props.
              onValueChange={(value) => onSortChange(value as SortOption)} // Callback on value change.
            >
              <SelectTrigger id="sort-deals" className="w-full md:w-[250px]"> {/* Styling for the trigger. */}
                <SelectValue placeholder="Sort by" /> {/* Placeholder text. */}
              </SelectTrigger>
              <SelectContent> {/* Content of the dropdown. */}
                {/* // 🔍 `sortOptions` are mapped to SelectItem components. */}
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
