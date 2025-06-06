// src/components/ui/tooltip.tsx
// This is a reusable Tooltip component, likely adapted from ShadCN UI,
// which builds upon Radix UI's Tooltip primitives for accessibility and functionality.
// Tooltips provide contextual information when a user hovers over or focuses on an element.

"use client"; // Indicates this component can be used in Client Components.

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip" // Radix UI Tooltip primitives.

import { cn } from "@/lib/utils" // Utility for merging Tailwind classes.

// --- Tooltip Provider, Root, and Trigger Components ---
// Re-exporting Radix primitives for direct use and as building blocks.
const TooltipProvider = TooltipPrimitive.Provider // Must wrap the application or parts of it where tooltips are used.
const Tooltip = TooltipPrimitive.Root // The main container for a tooltip instance.
const TooltipTrigger = TooltipPrimitive.Trigger // The element that, when interacted with, shows the tooltip.

// --- TooltipContent Component ---
/**
 * @component TooltipContent
 * @description The content part of the tooltip that appears when the trigger is activated.
 * It is styled and positioned by default.
 * This is a common UI pattern for providing hints or extra information.
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>, // Ref type for Radix Tooltip content.
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> // Radix Tooltip content props.
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref} // Forward the ref.
    sideOffset={sideOffset} // Distance between the trigger and the content.
    // Base Tailwind classes for tooltip content styling.
    // Includes z-index, overflow, border, background, padding, text style, shadow, and animations.
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className // Allows overriding or extending styles.
    )}
    {...props} // Spread remaining props.
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName // For better debugging.

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
