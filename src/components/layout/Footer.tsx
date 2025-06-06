// src/components/layout/Footer.tsx

// --- Footer Component ---
/**
 * @component Footer
 * @description A simple, reusable Footer component for the application.
 * Displays copyright information and a disclaimer.
 * This component is part of the main `RootLayout`.
 */
const Footer = () => {
  return (
    // Footer element with Tailwind CSS classes for styling.
    // `border-t` adds a top border.
    // `bg-background/95` gives a slightly transparent background.
    // `py-6` for vertical padding.
    // `text-center` to center the text.
    // `text-sm text-muted-foreground` for smaller, less prominent text.
    <footer className="border-t border-border/40 bg-background/95 py-6 text-center text-sm text-muted-foreground">
      {/* Container to manage content width and padding, consistent with the main layout. */}
      <div className="container mx-auto px-4">
        {/* Copyright information, dynamically showing the current year. */}
        {/* // 🔧 The year could be made dynamic using client-side JS if this were not a server component context, or kept as is for build-time rendering. */}
        <p>&copy; {new Date().getFullYear()} GunDeals Navigator. All rights reserved.</p>
        {/* Disclaimer text. */}
        <p className="mt-1">Prices and availability are subject to change.</p>
      </div>
    </footer>
  );
};

export default Footer;
