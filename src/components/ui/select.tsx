// src/components/ui/select.tsx
// This is a reusable Select (dropdown) component, likely adapted from ShadCN UI,
// which builds upon Radix UI's Select primitives for accessibility and functionality.
// It provides a styled dropdown menu for selecting an option from a list.

"use client"; // Indicates this component can be used in Client Components.

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select" // Radix UI Select primitives.
import { Check, ChevronDown, ChevronUp } from "lucide-react" // Icons for checkmark and dropdown arrows.

import { cn } from "@/lib/utils" // Utility for merging Tailwind classes.

// --- Select Root and Group Components ---
// Re-exporting Radix primitives for direct use if needed.
const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value // Component to display the selected value.

// --- SelectTrigger Component ---
/**
 * @component SelectTrigger
 * @description The button part of the select that opens/closes the dropdown.
 * This is a common UI pattern for dropdown controls.
 */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    // Base Tailwind classes for the trigger: flex, height, width, alignment, border, background, padding, text style, focus, disabled states.
    // `[&>span]:line-clamp-1` ensures the selected value text doesn't overflow.
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className // Allows overriding or extending styles.
    )}
    {...props}
  >
    {children} {/* Typically contains <SelectValue /> */}
    <SelectPrimitive.Icon>
      <ChevronDown className="h-4 w-4 opacity-50" /> {/* Dropdown arrow icon. */}
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

// --- SelectScrollUpButton / SelectScrollDownButton Components ---
// Used internally by SelectContent for scrollable dropdowns if content overflows.
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

// --- SelectContent Component ---
/**
 * @component SelectContent
 * @description The part of the select that appears when it's open, containing the list of options.
 */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal> {/* Portals the content to avoid z-index issues. */}
    <SelectPrimitive.Content
      ref={ref}
      // Base Tailwind classes for content: z-index, max-height, width, overflow, border, background, shadow, animations for open/close states.
      // `position="popper"` allows smart positioning relative to the trigger.
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        // Styling for the viewport within the content area.
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children} {/* Contains <SelectItem /> components. */}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

// --- SelectLabel Component ---
/**
 * @component SelectLabel
 * @description A label for a group of items within the select dropdown.
 */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    // Styling for the label.
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

// --- SelectItem Component ---
/**
 * @component SelectItem
 * @description An individual selectable option within the dropdown.
 */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, asChild, ...otherProps }, ref) => { // Destructure asChild from props
  // We explicitly do not pass `asChild` to SelectPrimitive.Item if our wrapper
  // provides multiple children (like the span for indicator and ItemText),
  // as this would violate React.Children.only if SelectPrimitive.Item acts as a Slot.
  return (
    <SelectPrimitive.Item
      ref={ref}
      // Base Tailwind classes for item: flex, cursor, alignment, padding, text style, focus, disabled states.
      // `data-[state=checked]` (implicit via Radix) styles are handled by the checkmark.
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...otherProps} // Pass otherProps, excluding asChild
    >
      {/* Span for positioning the checkmark icon. */}
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" /> {/* Checkmark icon for selected item. */}
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText> {/* The text content of the item. */}
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName

// --- SelectSeparator Component ---
/**
 * @component SelectSeparator
 * @description A visual separator between groups of items in the dropdown.
 */
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    // Styling for the separator line.
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
