
import Link from 'next/link';
import { Package2, Home, PlusCircle, Search } from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 gap-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary mr-4">
          <Package2 className="h-6 w-6" />
          <span className="hidden sm:inline-block">GunDeals Navigator</span>
        </Link>
        
        <div className="flex-1 flex justify-center px-2 sm:px-4 lg:px-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search deals..."
              className="w-full rounded-md bg-background pl-10 pr-4 py-2 text-sm border border-input focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild className="px-2 sm:px-4">
            <Link href="/" className="flex items-center gap-1 text-sm sm:text-base">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline-block">Deals</span>
            </Link>
          </Button>
          <Button variant="default" asChild className="px-2 sm:px-4 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/submit" className="flex items-center gap-1 text-sm sm:text-base">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline-block">Submit</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
