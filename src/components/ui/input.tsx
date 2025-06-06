// src/components/ui/input.tsx
// This is a reusable Input component, likely adapted from the ShadCN UI library.
// It provides a consistently styled text input field.

import * as React from "react"

import { cn } from "@/lib/utils" // Utility for merging Tailwind classes.

// --- Input Props Interface ---
// Extends standard HTML input attributes.
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// --- Input Component ---
/**
 * @component Input
 * @description A styled, reusable input field component.
 * It applies consistent styling for text inputs across the application.
 * This is a foundational UI element for forms.
 * @param {InputProps} props - Props for the Input component.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type} // Standard HTML input type (e.g., "text", "number", "email").
        // Base Tailwind classes for input styling.
        // Includes dimensions, border, background, padding, text size, focus states, and disabled states.
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className // Allows overriding or extending styles.
        )}
        ref={ref} // Forward the ref to the underlying input element.
        {...props} // Spread remaining props.
      />
    )
  }
)
Input.displayName = "Input" // For better debugging.

export { Input }
