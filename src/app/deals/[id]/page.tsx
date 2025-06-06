// src/app/deals/[id]/page.tsx

// --- Type Imports ---
// 🔍 Defines the structure for a single Deal object.
import type { Deal } from '@/lib/types';

// --- Data Imports ---
// TODO: Replace placeholderDeals with data fetched from a backend API based on the deal ID.
import { placeholderDeals } from '@/lib/placeholder-data';

// --- Next.js Imports ---
import Image from 'next/image'; // For optimized image handling.
import Link from 'next/link'; // For client-side navigation.

// --- UI Component Imports ---
// Reusable components from ShadCN UI library.
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

// --- Icon Imports ---
import { ArrowLeft, ExternalLink, Tag, DollarSign, Percent, CalendarDays, ShoppingCart } from 'lucide-react';

// --- Utility Imports ---
import { format } from 'date-fns'; // For formatting dates.

// --- Component Props Definition ---
/**
 * @interface ProductDetailPageProps
 * @description Props for the ProductDetailPage component.
 * @property {object} params - Contains route parameters.
 * @property {string} params.id - The ID of the deal to display, extracted from the URL.
 */
interface ProductDetailPageProps {
  params: { id: string }; // The 'id' comes from the dynamic route segment `[id]`.
}

// This function can be used with generateStaticParams if you are pre-rendering paths at build time.
// export async function generateStaticParams() {
//   // TODO: Fetch all deal IDs from the backend to pre-render pages.
//   return placeholderDeals.map((deal) => ({
//     id: deal.id,
//   }));
// }

// --- Data Fetching Function ---
/**
 * @async
 * @function getDeal
 * @description Fetches a single deal by its ID.
 * // TODO: Replace this with an actual API call to fetch deal data from the backend.
 * @param {string} id - The ID of the deal to fetch.
 * @returns {Promise<Deal | undefined>} The deal object or undefined if not found.
 */
async function getDeal(id: string): Promise<Deal | undefined> {
  // Simulate fetching data from placeholder data.
  // 🔧 In a real app, this would be an API call: `await fetch('/api/deals/${id}')`.
  return placeholderDeals.find((deal) => deal.id === id);
}

// --- ProductDetailPage Component (Server Component) ---
/**
 * @page ProductDetailPage
 * @description Displays detailed information for a single product deal.
 * This is an async Server Component, allowing data fetching directly within it.
 * @param {ProductDetailPageProps} props - Props containing the deal ID from the route.
 */
export default async function ProductDetailPage(props: ProductDetailPageProps) {
  // It's good practice to await props.params if there's any uncertainty or if Next.js version/config requires it.
  const awaitedParams = await props.params;
  const dealId = awaitedParams.id; // Extract the deal ID from awaited params.

  // Fetch the specific deal data.
  // 🔍 The `deal` object is fetched based on `dealId`.
  const deal = await getDeal(dealId);

  // --- Conditional Rendering: Deal Not Found ---
  if (!deal) {
    return (
      <div className="text-center py-10">
        <Alert variant="destructive" className="max-w-md mx-auto"> {/* Reusable Alert component for errors. */}
          <AlertTitle>Deal Not Found</AlertTitle>
          <AlertDescription>
            Sorry, the deal you are looking for does not exist or may have been removed.
          </AlertDescription>
        </Alert>
        <Button asChild variant="outline" className="mt-6"> {/* Reusable Button component. */}
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Deals
          </Link>
        </Button>
      </div>
    );
  }

  // --- Render Logic: Deal Found ---
  return (
    <div className="max-w-4xl mx-auto"> {/* Main container for the page content. */}
      {/* "Back to All Deals" Button */}
      <Button asChild variant="outline" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Deals
        </Link>
      </Button>

      {/* Reusable Card component to display deal details. */}
      <Card className="overflow-hidden shadow-xl">
        <CardHeader className="p-0 relative"> {/* Header for the image and discount badge. */}
          <Image
            // TODO: Ensure imageUrls are valid and accessible. Placeholder used.
            src={deal.imageUrl}
            alt={deal.productName}
            width={800}
            height={500}
            className="w-full h-auto max-h-[500px] object-cover" // Styling for image display.
            // 🔍 data-ai-hint can be used by AI for image suggestions or analysis.
            data-ai-hint={deal.imageAiHint || 'product item'}
            priority // Prioritize loading for LCP (Largest Contentful Paint).
          />
          {/* Display discount percentage badge if applicable. */}
          {deal.discountPercentage && deal.discountPercentage > 0 && (
            <Badge variant="destructive" className="absolute top-4 right-4 text-lg p-2 flex items-center gap-1">
              <Percent className="h-5 w-5" /> {deal.discountPercentage}% OFF
            </Badge>
          )}
        </CardHeader>
        <CardContent className="p-6 md:p-8"> {/* Main content area of the card. */}
          <Badge variant="secondary" className="mb-2">{deal.category}</Badge>
          <CardTitle className="text-3xl font-bold mb-2 text-foreground">{deal.productName}</CardTitle>
          {/* Date posted and submitter information. */}
          <div className="flex items-center text-muted-foreground text-sm mb-4">
            <CalendarDays className="h-4 w-4 mr-1.5" /> 
            Posted on {format(new Date(deal.postedAt), "MMMM d, yyyy")} by 
            {/* // TODO: `submittedBy` might come from user authentication data. */}
            <span className="font-medium text-foreground ml-1">{deal.submittedBy || 'Community Member'}</span>
          </div>
          
          <Separator className="my-6" /> {/* Visual separator. */}

          {/* Grid for deal details and product description. */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-primary">Deal Details</h3>
              <div className="space-y-2 text-foreground">
                <p className="flex items-center"><DollarSign className="h-5 w-5 mr-2 text-accent" /><strong className="text-2xl text-accent-foreground/90">{deal.dealPrice.toFixed(2)}</strong></p>
                {/* Display original price if different from deal price. */}
                {deal.originalPrice > deal.dealPrice && (
                   <p className="flex items-center text-muted-foreground line-through"><DollarSign className="h-4 w-4 mr-2" />{deal.originalPrice.toFixed(2)} (Original Price)</p>
                )}
                <p><strong>Retailer:</strong> {deal.retailer}</p>
              </div>
            </div>
             <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Product Description</h3>
                {/* // 🔍 Product description content. */}
                <CardDescription className="text-base leading-relaxed text-foreground/80">
                 {deal.productDescription}
                </CardDescription>
            </div>
          </div>
          
          {/* Display tags if available. */}
          {deal.tags && deal.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center text-primary">
                <Tag className="h-5 w-5 mr-2" /> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {deal.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
          
          <Separator className="my-6" />

          {/* "Go to Deal" Button */}
          <Button size="lg" asChild className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6">
            {/* // TODO: `retailerUrl` should be a valid external link to the deal. */}
            <a href={deal.retailerUrl} target="_blank" rel="noopener noreferrer">
              <ShoppingCart className="mr-2 h-5 w-5" /> Go to Deal at {deal.retailer} <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
