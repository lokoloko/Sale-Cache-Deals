import Link from 'next/link';
import { Package2, Home, PlusCircle, Tags } from 'lucide-react'; // Using Package2 as a generic logo icon
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary">
          <Package2 className="h-6 w-6" />
          <span>GunDeals Navigator</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              Deals
            </Link>
          </Button>
          <Button variant="default" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/submit" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              Submit Deal
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
