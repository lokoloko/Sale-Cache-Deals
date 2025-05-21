import type { Deal } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tag, ExternalLink, Percent, DollarSign, ShoppingCart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DealCardProps {
  deal: Deal;
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const timeAgo = formatDistanceToNow(new Date(deal.postedAt), { addSuffix: true });

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="p-0 relative">
        <Link href={`/deals/${deal.id}`} legacyBehavior passHref>
          <a aria-label={`View details for ${deal.productName}`}>
            <Image
              src={deal.imageUrl}
              alt={deal.productName}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
              data-ai-hint={deal.imageAiHint || 'product image'}
            />
          </a>
        </Link>
        {deal.discountPercentage && deal.discountPercentage > 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2 flex items-center gap-1">
            <Percent className="h-3 w-3" /> {deal.discountPercentage}% OFF
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="mb-2 flex items-center justify-between">
          <Badge variant="secondary">{deal.category}</Badge>
          <p className="text-xs text-muted-foreground">{timeAgo}</p>
        </div>
        <Link href={`/deals/${deal.id}`} legacyBehavior passHref>
          <a className="hover:underline">
            <CardTitle className="text-lg font-semibold leading-tight mb-2 h-12 overflow-hidden">
              {deal.productName}
            </CardTitle>
          </a>
        </Link>
        <div className="flex items-baseline gap-2 mb-2">
          <p className="text-2xl font-bold text-accent-foreground/90 flex items-center">
             <DollarSign className="h-5 w-5 mr-0.5 text-accent" />
             {deal.dealPrice.toFixed(2)}
          </p>
          {deal.originalPrice > deal.dealPrice && (
            <p className="text-sm text-muted-foreground line-through flex items-center">
              <DollarSign className="h-3.5 w-3.5 mr-0.5" />
              {deal.originalPrice.toFixed(2)}
            </p>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Retailer: <span className="font-medium text-foreground">{deal.retailer}</span>
        </p>
        {deal.tags && deal.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1 max-h-12 overflow-y-auto">
            {deal.tags.slice(0, 5).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 border-t mt-auto">
        <div className="flex w-full gap-2">
          <Button variant="outline" asChild className="flex-1">
            <Link href={`/deals/${deal.id}`}>
              View Details
            </Link>
          </Button>
          <Button variant="default" asChild className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
            <a href={deal.retailerUrl} target="_blank" rel="noopener noreferrer">
              Go to Deal <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DealCard;
