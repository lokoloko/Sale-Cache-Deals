// src/components/ui/card.tsx
// This file defines a set of reusable Card components, likely adapted from the ShadCN UI library.
// Cards are used to group related content and actions in a visually distinct block.
// They consist of several sub-components: Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent.

import * as React from "react"

import { cn } from "@/lib/utils" // Utility for merging Tailwind classes.

// --- Card Component (Root) ---
/**
 * @component Card
 * @description The main container for a card. Provides base styling like border, background, and shadow.
 * This is a highly reusable layout component.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Base Tailwind classes for card styling.
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className // Allows overriding or extending styles.
    )}
    {...props}
  />
))
Card.displayName = "Card" // For better debugging.

// --- CardHeader Component ---
/**
 * @component CardHeader
 * @description A section for the header content of a card, typically containing a title and description.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Base Tailwind classes for card header styling (flex, spacing, padding).
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

// --- CardTitle Component ---
/**
 * @component CardTitle
 * @description A component for rendering the title within a CardHeader.
 */
const CardTitle = React.forwardRef<
  HTMLDivElement, // Note: This is a div, not an h-tag by default. Use appropriate heading tags within it for semantics if needed.
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Base Tailwind classes for card title styling (font size, weight, etc.).
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

// --- CardDescription Component ---
/**
 * @component CardDescription
 * @description A component for rendering descriptive text within a CardHeader, usually below the CardTitle.
 */
const CardDescription = React.forwardRef<
  HTMLDivElement, // Note: This is a div.
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Base Tailwind classes for card description styling (font size, color).
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

// --- CardContent Component ---
/**
 * @component CardContent
 * @description The main content area of the card, placed after the header and before the footer.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} /> // `pt-0` if header has padding.
))
CardContent.displayName = "CardContent"

// --- CardFooter Component ---
/**
 * @component CardFooter
 * @description A section for the footer content of a card, often used for action buttons or summary information.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Base Tailwind classes for card footer styling (flex, padding).
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
