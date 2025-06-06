// src/components/layout/Navbar.tsx

// --- Next.js Imports ---
import Link from 'next/link'; // For client-side navigation.

// --- Icon Imports ---
import { Package2, Home, PlusCircle, Search } from 'lucide-react'; // Icons for branding and navigation.

// --- UI Component Imports ---
import { Button } from '@/components/ui/button'; // Reusable Button component.
import { Input } from '@/components/ui/input'; // Reusable Input component for the search bar.

// --- Navbar Component ---
/**
 * @component Navbar
 * @description A reusable Navbar component for the application's header.
 * Includes branding, navigation links, and a search bar.
 * This component is part of the main `RootLayout`.
 */
const Navbar = () => {
  return (
    // Header element with Tailwind CSS classes for styling.
    // `sticky top-0 z-50`: Makes the navbar stick to the top of the viewport during scroll.
    // `w-full border-b`: Full width with a bottom border.
    // `bg-background/95 backdrop-blur`: Semi-transparent background with blur effect.
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Container to manage content width, alignment, and padding, consistent with the main layout. */}
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 gap-4">
        {/* Branding/Logo Section */}
        {/* // 🔍 Link to the homepage. */}
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary mr-4">
          <Package2 className="h-6 w-6" /> {/* App Icon/Logo */}
          <span className="hidden sm:inline-block">GunDeals Navigator</span> {/* App Name (hidden on very small screens) */}
        </Link>
        
        {/* Search Bar Section */}
        {/* // 🔧 This is a UI placeholder for search. Actual search logic (filtering deals) needs implementation.
            // This could involve client-side filtering for small datasets or API calls for larger ones.
            // AI could be used here for natural language search or smarter query suggestions. */}
        <div className="flex-1 flex justify-center px-2 sm:px-4 lg:px-8"> {/* Flex container to center search bar */}
          <div className="relative w-full max-w-md"> {/* Relative positioning for the search icon */}
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /> {/* Search Icon */}
            <Input
              type="search"
              placeholder="Search deals..." // TODO: Implement search functionality.
              className="w-full rounded-md bg-background pl-10 pr-4 py-2 text-sm border border-input focus:border-primary focus:ring-primary" // Styling for input with padding for icon.
            />
          </div>
        </div>

        {/* Navigation Links Section */}
        <nav className="flex items-center gap-2 sm:gap-4">
          {/* "Deals" Link (Home) */}
          <Button variant="ghost" asChild className="px-2 sm:px-4">
            <Link href="/" className="flex items-center gap-1 text-sm sm:text-base">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline-block">Deals</span>
            </Link>
          </Button>
          {/* "Submit Deal" Link */}
          <Button variant="default" asChild className="px-2 sm:px-4 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/submit" className="flex items-center gap-1 text-sm sm:text-base">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline-block">Submit</span>
            </Link>
          </Button>
          {/* // TODO: Add User Authentication / Profile link here when auth is implemented.
              // Example: <UserNav /> or <Link href="/profile">Profile</Link> */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
