// src/components/deals/DealCard.tsx

// --- Type Imports ---
// 🔍 Type definition for a single deal item.
import type { Deal } from '@/lib/types';

// --- Next.js Imports ---
import Image from 'next/image'; // For optimized image loading.
import Link from 'next/link'; // For client-side navigation.

// --- UI Component Imports ---
// Reusable components from ShadCN UI library.
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button'; // Import buttonVariants
import { Badge } from '@/components/ui/badge';

// --- Icon Imports ---
import { Tag, ExternalLink, Percent, DollarSign } from 'lucide-react';

// --- Utility Imports ---
import { formatDistanceToNow } from 'date-fns'; // For displaying relative time (e.g., "2 days ago").
import { cn } from '@/lib/utils'; // Import cn utility

// --- Component Props Definition ---
/**
 * @interface DealCardProps
 * @description Props for the DealCard component.
 * @property {Deal} deal - The deal object containing all data to display.
 * // TODO: This `deal` data will eventually come from a backend API when DealList fetches deals.
 */
interface DealCardProps {
  deal: Deal;
}

// --- DealCard Component ---
/**
 * @component DealCard
 * @description A reusable UI component to display a single deal item in a card format.
 * It shows product image, name, price, retailer, tags, and action buttons.
 * This component is typically used within a `DealList` to render multiple deals.
 * @param {DealCardProps} props - The props for the component.
 */
const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  // Calculate how long ago the deal was posted using date-fns.
  // 🔧 This client-side date formatting might be sensitive to hydration if server/client timezones differ significantly.
  // Consider standardizing timezone or formatting on the server if issues arise.
  const timeAgo = formatDistanceToNow(new Date(deal.postedAt), { addSuffix: true });

  return (
    // Reusable Card component serves as the base for the deal's visual structure.
    // Tailwind classes define flex layout, shadows, transitions, and full height within its grid cell.
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      {/* CardHeader typically contains the primary visual element, like an image or title. Here, it's the product image. */}
      <CardHeader className="p-0 relative"> {/* `relative` for positioning the discount badge. */}
        {/* Link wraps the image, navigating to the detailed page for this specific deal. */}
        <Link href={`/deals/${deal.id}`} legacyBehavior passHref>
          <a aria-label={`View details for ${deal.productName}`}>
            {/* Next.js Image component for optimized image loading and responsiveness. */}
            <Image
              // TODO: Ensure `deal.imageUrl` points to a valid and accessible image. Currently uses placeholders.
              src={deal.imageUrl}
              alt={deal.productName} // Important for accessibility.
              width={600} // Intrinsic width for aspect ratio calculation.
              height={400} // Intrinsic height for aspect ratio calculation.
              className="w-full h-48 object-cover" // Tailwind classes for image styling (full width, fixed height, cover scaling).
              // 🔍 `data-ai-hint` can be used by AI tools for image replacement suggestions or content analysis.
              data-ai-hint={deal.imageAiHint || 'product image'}
            />
          </a>
        </Link>
        {/* Display a discount percentage badge if the deal has one. */}
        {deal.discountPercentage && deal.discountPercentage > 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2 flex items-center gap-1"> {/* Positioned absolutely. */}
            <Percent className="h-3 w-3" /> {deal.discountPercentage}% OFF
          </Badge>
        )}
      </CardHeader>
      {/* CardContent holds the main textual information about the deal. `flex-grow` allows it to expand. */}
      <CardContent className="p-4 flex-grow">
        {/* Section for category badge and time posted. */}
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="secondary">{deal.category}</Badge>
          <p className="text-xs text-muted-foreground">{timeAgo}</p>
        </div>
        {/* Product name, linking to the deal's detail page. */}
        <Link href={`/deals/${deal.id}`} legacyBehavior passHref>
          <a className="hover:underline">
            {/* CardTitle for the product name. `h-12 overflow-hidden` attempts to keep it to two lines. */}
            <CardTitle className="text-lg font-semibold leading-tight mb-2 h-12 overflow-hidden">
              {deal.productName}
            </CardTitle>
          </a>
        </Link>
        {/* Pricing information: deal price and original price (if applicable). */}
        <div className="flex items-baseline gap-2 mb-2">
          <p className="text-2xl font-bold text-accent-foreground/90 flex items-center">
             <DollarSign className="h-5 w-5 mr-0.5 text-accent" /> {/* Icon for currency. */}
             {deal.dealPrice.toFixed(2)} {/* Format price to two decimal places. */}
          </p>
          {/* Display original price with a strikethrough if it's higher than the deal price. */}
          {deal.originalPrice > deal.dealPrice && (
            <p className="text-sm text-muted-foreground line-through flex items-center">
              <DollarSign className="h-3.5 w-3.5 mr-0.5" />
              {deal.originalPrice.toFixed(2)}
            </p>
          )}
        </div>
        {/* Retailer information. */}
        <p className="text-sm text-muted-foreground mb-3">
          Retailer: <span className="font-medium text-foreground">{deal.retailer}</span>
        </p>
        {/* Display deal tags if available. Shows a limited number of tags. */}
        {deal.tags && deal.tags.length > 0 && (
          // `max-h-12 overflow-y-auto` allows tags to scroll if they exceed two lines.
          <div className="flex flex-wrap gap-1 mb-1 max-h-12 overflow-y-auto">
            {/* Show up to 5 tags to prevent clutter. */}
            {deal.tags.slice(0, 5).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      {/* CardFooter contains action buttons. `border-t` adds a top border, `mt-auto` pushes it to the bottom. */}
      <CardFooter className="p-4 pt-0 border-t mt-auto">
        <div className="flex w-full gap-2"> {/* Flex container for buttons. */}
          {/* Button to navigate to the deal's detail page. */}
          <Button variant="outline" asChild className="flex-1"> {/* `flex-1` makes buttons share space equally. */}
            <Link href={`/deals/${deal.id}`} legacyBehavior passHref>
              <a className="flex items-center justify-center w-full h-full">
                View Details
              </a>
            </Link>
          </Button>
          {/* "Go to Deal" link styled as a button */}
          {/* // TODO: `deal.retailerUrl` should be a valid external link provided by the backend. */}
          <a
            href={deal.retailerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default" }), // Base button styles from ShadCN
              "flex-1 bg-accent text-accent-foreground hover:bg-accent/90" // Custom styles (overrides default bg, adds flex-1)
            )}
          >
            <span className="inline-flex items-center"> {/* Groups text and icon for alignment */}
              Go to Deal <ExternalLink className="ml-1 h-4 w-4" />
            </span>
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DealCard;
