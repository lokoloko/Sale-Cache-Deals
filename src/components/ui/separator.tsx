// src/components/ui/separator.tsx
// This is a reusable Separator component, likely adapted from ShadCN UI,
// which itself is based on Radix UI's Separator primitive.
// It's used to create a visual division or break between content sections.

"use client"; // Indicates this component can be used in Client Components.

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator" // Radix UI Separator primitive.

import { cn } from "@/lib/utils" // Utility for merging Tailwind classes.

// --- Separator Component ---
/**
 * @component Separator
 * @description A visual separator line, either horizontal or vertical.
 * Useful for dividing content sections or groups of elements.
 * Based on Radix UI's Separator primitive.
 * @param {React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>} props - Props for the Separator.
 * @param {'horizontal' | 'vertical'} [props.orientation='horizontal'] - The orientation of the separator.
 * @param {boolean} [props.decorative=true] - If true, indicates the separator is purely for visual presentation.
 */
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>, // Ref type for Radix Separator root.
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> // Radix Separator props.
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref} // Forward the ref.
      decorative={decorative} // Accessibility hint: true if purely visual.
      orientation={orientation} // 'horizontal' or 'vertical'.
      // Base Tailwind classes for separator styling.
      // `shrink-0` prevents it from shrinking in flex layouts.
      // `bg-border` sets its color using a theme variable.
      // Conditional styling for height/width based on orientation.
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className // Allows overriding or extending styles.
      )}
      {...props} // Spread remaining props.
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName // For better debugging.

export { Separator }
