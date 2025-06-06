// src/components/deals/DealList.tsx

// --- Type Imports ---
// 🔍 Defines the structure for a single Deal object.
import type { Deal } from '@/lib/types';

// --- UI Component Imports ---
import DealCard from './DealCard'; // Reusable component to display individual deal information.

// --- Component Props Definition ---
/**
 * @interface DealListProps
 * @description Props for the DealList component.
 * @property {Deal[]} deals - An array of deal objects to be rendered.
 * // TODO: This `deals` array will typically be fetched from a backend API and passed down from a parent page component.
 */
interface DealListProps {
  deals: Deal[];
}

// --- DealList Component ---
/**
 * @component DealList
 * @description A component responsible for rendering a list of `DealCard` components.
 * It takes an array of deal objects and maps over them to display each deal.
 * @param {DealListProps} props - The props for the component.
 */
const DealList: React.FC<DealListProps> = ({ deals }) => {
  // --- Conditional Rendering: No Deals ---
  // If the `deals` array is null, undefined, or empty, display a message.
  if (!deals || deals.length === 0) {
    return <p className="text-center text-muted-foreground py-10">No deals found. Check back later or adjust your filters!</p>;
  }

  // --- Render Logic: Deals Available ---
  // If deals are available, render them in a responsive grid.
  // Tailwind CSS classes define the grid layout:
  // - `grid`: Establishes a grid container.
  // - `grid-cols-1`: Single column by default (mobile).
  // - `sm:grid-cols-2`: Two columns on small screens and up.
  // - `lg:grid-cols-3`: Three columns on large screens and up.
  // - `xl:grid-cols-4`: Four columns on extra-large screens and up.
  // - `gap-6`: Spacing between grid items.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* Map over the `deals` array and render a `DealCard` for each deal. */}
      {/* // 🔍 Each `deal` object from the `deals` prop is passed to a `DealCard`. */}
      {deals.map((deal) => (
        // `key` prop is essential for React when rendering lists for efficient updates.
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
};

export default DealList;
