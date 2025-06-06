// src/app/layout.tsx

// --- Core Imports ---
import type { Metadata } from 'next'; // Type for page metadata.
import { Inter } from 'next/font/google'; // Google Font import.
import './globals.css'; // Global stylesheet, includes Tailwind and ShadCN theme.

// --- Layout Components ---
import Navbar from '@/components/layout/Navbar'; // Reusable Navbar component for site navigation.
import Footer from '@/components/layout/Footer'; // Reusable Footer component for site information.
import { Toaster } from '@/components/ui/toaster'; // Reusable Toaster component for displaying notifications.

// --- Utilities ---
import { cn } from '@/lib/utils'; // Utility function for conditional class names.

// --- Font Configuration ---
// Initialize the Inter font with desired subsets and a CSS variable.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // CSS variable for easy use in Tailwind.
});

// --- Page Metadata ---
// 🔍 Metadata for SEO and browser tab information. This can be dynamically updated per page.
export const metadata: Metadata = {
  title: 'GunDeals Navigator',
  description: 'Curated firearm and accessory deals.',
};

// --- RootLayout Component ---
/**
 * @component RootLayout
 * @description The main layout component for the entire application.
 * It wraps all page content, providing consistent structure like Navbar and Footer.
 * @param {Readonly<{ children: React.ReactNode }>} props - Props for the RootLayout.
 * @param {React.ReactNode} props.children - The content of the current page to be rendered within the layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `suppressHydrationWarning` can be useful if client/server rendering mismatches are known and minor (e.g., timestamps).
    <html lang="en" suppressHydrationWarning>
      {/* Apply Inter font class and variable to the body. `antialiased` for smoother font rendering. */}
      <body className={cn(inter.variable, inter.className, 'antialiased flex flex-col min-h-screen')}>
        {/* Site Navbar - present on all pages. */}
        <Navbar />
        {/* Main content area for pages. `flex-grow` ensures it takes available space. */}
        <main className="flex-grow container mx-auto px-4 py-8">
          {children} {/* Current page content is rendered here. */}
        </main>
        {/* Site Footer - present on all pages. */}
        <Footer />
        {/* Toaster component for displaying global notifications/toasts. */}
        <Toaster />
      </body>
    </html>
  );
}
