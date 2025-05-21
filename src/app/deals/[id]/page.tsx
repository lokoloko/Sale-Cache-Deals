import { placeholderDeals } from '@/lib/placeholder-data';
import type { Deal } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, ExternalLink, Tag, DollarSign, Percent, CalendarDays, ShoppingCart } from 'lucide-react';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';

interface ProductDetailPageProps {
  params: { id: string };
}

// This function can be used with generateStaticParams if you are pre-rendering paths
// export async function generateStaticParams() {
//   return placeholderDeals.map((deal) => ({
//     id: deal.id,
//   }));
// }

async function getDeal(id: string): Promise<Deal | undefined> {
  // In a real app, you would fetch this from a database or API
  return placeholderDeals.find((deal) => deal.id === id);
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const deal = await getDeal(params.id);

  if (!deal) {
    return (
      <div className="text-center py-10">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertTitle>Deal Not Found</AlertTitle>
          <AlertDescription>
            Sorry, the deal you are looking for does not exist or may have been removed.
          </AlertDescription>
        </Alert>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Deals
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Deals
        </Link>
      </Button>

      <Card className="overflow-hidden shadow-xl">
        <CardHeader className="p-0 relative">
          <Image
            src={deal.imageUrl}
            alt={deal.productName}
            width={800}
            height={500}
            className="w-full h-auto max-h-[500px] object-cover"
            data-ai-hint={deal.imageAiHint || 'product item'}
            priority // Prioritize loading for LCP
          />
           {deal.discountPercentage && deal.discountPercentage > 0 && (
            <Badge variant="destructive" className="absolute top-4 right-4 text-lg p-2 flex items-center gap-1">
              <Percent className="h-5 w-5" /> {deal.discountPercentage}% OFF
            </Badge>
          )}
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <Badge variant="secondary" className="mb-2">{deal.category}</Badge>
          <CardTitle className="text-3xl font-bold mb-2 text-foreground">{deal.productName}</CardTitle>
          <div className="flex items-center text-muted-foreground text-sm mb-4">
            <CalendarDays className="h-4 w-4 mr-1.5" /> 
            Posted on {format(new Date(deal.postedAt), "MMMM d, yyyy")} by 
            <span className="font-medium text-foreground ml-1">{deal.submittedBy || 'Community Member'}</span>
          </div>
          
          <Separator className="my-6" />

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-primary">Deal Details</h3>
              <div className="space-y-2 text-foreground">
                <p className="flex items-center"><DollarSign className="h-5 w-5 mr-2 text-accent" /><strong className="text-2xl text-accent-foreground/90">{deal.dealPrice.toFixed(2)}</strong></p>
                {deal.originalPrice > deal.dealPrice && (
                   <p className="flex items-center text-muted-foreground line-through"><DollarSign className="h-4 w-4 mr-2" />{deal.originalPrice.toFixed(2)} (Original Price)</p>
                )}
                <p><strong>Retailer:</strong> {deal.retailer}</p>
              </div>
            </div>
             <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">Product Description</h3>
                <CardDescription className="text-base leading-relaxed text-foreground/80">
                 {deal.productDescription}
                </CardDescription>
            </div>
          </div>
          
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

          <Button size="lg" asChild className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6">
            <a href={deal.retailerUrl} target="_blank" rel="noopener noreferrer">
              <ShoppingCart className="mr-2 h-5 w-5" /> Go to Deal at {deal.retailer} <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
