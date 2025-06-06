// src/components/ui/label.tsx
// This is a reusable Label component, likely adapted from ShadCN UI,
// which itself is often a styled version of Radix UI's Label primitive.
// It's used for labeling form elements, enhancing accessibility.

"use client"; // Indicates this component can be used in Client Components.

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label" // Radix UI Label primitive for accessibility features.
import { cva, type VariantProps } from "class-variance-authority" // For variant-driven class names (though not heavily used here).

import { cn } from "@/lib/utils" // Utility for merging Tailwind classes.

// --- Label Variants Definition ---
// `cva` defines base styles for the label. Variants are minimal here but could be extended.
// 🔍 These styles define the default appearance of the label.
const labelVariants = cva(
  // Base classes for label styling: font size, weight, and behavior with disabled peer inputs.
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

// --- Label Component ---
/**
 * @component Label
 * @description A styled, reusable label component, typically used with form inputs.
 * It enhances accessibility by associating text with a form control.
 * Based on Radix UI's Label primitive.
 * @param {React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>} props - Props for the Label.
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>, // Ref type for the Radix Label root element.
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & // Radix Label props.
    VariantProps<typeof labelVariants> // Props from cva variants.
>(({ className, ...props }, ref) => (
  // Use Radix UI's Label.Root for accessibility and functionality.
  <LabelPrimitive.Root
    ref={ref} // Forward the ref.
    // Apply Tailwind classes from `labelVariants` and any custom `className`.
    className={cn(labelVariants(), className)}
    {...props} // Spread remaining props (like `htmlFor`).
  />
))
Label.displayName = LabelPrimitive.Root.displayName // For better debugging, using Radix's display name.

export { Label }
