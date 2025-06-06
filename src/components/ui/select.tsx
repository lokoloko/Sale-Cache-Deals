
"use client"; // Indicates this component can be used in Client Components.

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select" // Radix UI Select primitives.
import { Check, ChevronDown } from "lucide-react" // Icons for checkmark and dropdown arrows.

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
 */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, asChild, ...otherProps }, ref) => { // Explicitly destructure asChild
  // `asChild` is destructured and NOT passed in `...otherProps` to `SelectPrimitive.Trigger`.
  // This is correct because our wrapper provides multiple children to `SelectPrimitive.Trigger`
  // (the `children` prop like <SelectValue /> AND <SelectPrimitive.Icon />),
  // which would conflict if `SelectPrimitive.Trigger` became a Slot.
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )}
      {...otherProps} // Pass otherProps (which does NOT include asChild)
    >
      {children} {/* Typically contains <SelectValue />. This is the first child of SelectPrimitive.Trigger. */}
      {/* SelectPrimitive.Icon acts as the second child. */}
      <SelectPrimitive.Icon>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName


// --- SelectContent Component ---
/**
 * @component SelectContent
 * @description The part of the select that appears when it's open, containing the list of options.
 */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", asChild, container, ...otherProps }, ref) => { // Destructure asChild and container
  // `asChild` is destructured and NOT passed in `...otherProps` to `SelectPrimitive.Content`.
  // `container` is destructured but NOT explicitly passed to `SelectPrimitive.Portal` to rely on default behavior.
  // This is correct as `SelectPrimitive.Content` in our wrapper has one child (<SelectPrimitive.Viewport>),
  // but being explicit with `asChild` adds robustness.
  return (
  <SelectPrimitive.Portal> {/* Portals the content to avoid z-index issues. Removed explicit container prop. */}
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
      {...otherProps} // Pass otherProps (which does NOT include asChild or container)
    >
      {/* Standard structure: Viewport handles scrolling content. */}
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
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
  );
});
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
>(({ className, children, asChild, ...otherProps }, ref) => { // Destructure asChild
  // `asChild` is destructured and NOT passed in `...otherProps` to `SelectPrimitive.Item`.
  // This is correct because our wrapper provides multiple children to `SelectPrimitive.Item`
  // (the `span` for checkmark AND <SelectPrimitive.ItemText />),
  // which would conflict if `SelectPrimitive.Item` became a Slot.
  return (
  <SelectPrimitive.Item
    ref={ref}
    // Base Tailwind classes for item: flex, cursor, alignment, padding, text style, focus, disabled states.
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...otherProps} // Pass otherProps (which does NOT include asChild)
  >
    {/* Span for positioning the checkmark icon. This is the first child of SelectPrimitive.Item. */}
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" /> {/* Checkmark icon for selected item. */}
      </SelectPrimitive.ItemIndicator>
    </span>

    {/* SelectPrimitive.ItemText is the second child of SelectPrimitive.Item. */}
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

// These are not typically part of the default exported SelectContent structure in ShadCN
// const SelectScrollUpButton = React.forwardRef<
//   React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
//   React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
// >(({ className, ...props }, ref) => (
//   <SelectPrimitive.ScrollUpButton
//     ref={ref}
//     className={cn(
//       "flex cursor-default items-center justify-center py-1",
//       className
//     )}
//     {...props}
//   >
//     <ChevronUp className="h-4 w-4" />
//   </SelectPrimitive.ScrollUpButton>
// ))
// SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

// const SelectScrollDownButton = React.forwardRef<
//   React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
//   React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
// >(({ className, ...props }, ref) => (
//   <SelectPrimitive.ScrollDownButton
//     ref={ref}
//     className={cn(
//       "flex cursor-default items-center justify-center py-1",
//       className
//     )}
//     {...props}
//   >
//     <ChevronDown className="h-4 w-4" />
//   </SelectPrimitive.ScrollDownButton>
// ))
// SelectScrollDownButton.displayName =
//   SelectPrimitive.ScrollDownButton.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  // SelectScrollUpButton, // Not exporting by default
  // SelectScrollDownButton, // Not exporting by default
}
