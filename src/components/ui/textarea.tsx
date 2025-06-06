// src/components/ui/textarea.tsx
// This is a reusable Textarea component, likely adapted from the ShadCN UI library.
// It provides a consistently styled multi-line text input field.

import * as React from 'react';

import {cn} from '@/lib/utils'; // Utility for merging Tailwind classes.

// --- Textarea Props Interface ---
// Extends standard HTML textarea attributes.
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// --- Textarea Component ---
/**
 * @component Textarea
 * @description A styled, reusable multi-line text input (textarea) component.
 * It applies consistent styling for textareas across the application.
 * This is a foundational UI element for forms requiring larger text inputs.
 * @param {TextareaProps} props - Props for the Textarea component.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        // Base Tailwind classes for textarea styling.
        // Includes min-height, width, border, background, padding, text size, focus states, and disabled states.
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className // Allows overriding or extending styles.
        )}
        ref={ref} // Forward the ref to the underlying textarea element.
        {...props} // Spread remaining props (like `rows`, `placeholder`, `value`, `onChange`).
      />
    );
  }
);
Textarea.displayName = 'Textarea'; // For better debugging.

export {Textarea};
