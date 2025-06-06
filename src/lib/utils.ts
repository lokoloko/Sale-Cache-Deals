// src/lib/utils.ts
// This file contains utility functions used across the application.
// A common utility is `cn` for conditionally joining class names, often used with Tailwind CSS.

import { clsx, type ClassValue } from "clsx" // `clsx` is a utility for constructing `className` strings conditionally.
import { twMerge } from "tailwind-merge" // `tailwind-merge` intelligently merges Tailwind CSS classes, resolving conflicts.

/**
 * @function cn
 * @description A utility function that combines `clsx` and `tailwind-merge`
 * to allow for conditional and clean class name strings, especially useful with Tailwind CSS.
 * It takes any number of class value inputs (strings, arrays, objects) and returns a merged string.
 * Example: cn("p-4", { "bg-red-500": isError }, isActive && "font-bold")
 * @param {...ClassValue[]} inputs - A list of class values to be combined.
 * @returns {string} A string of merged and optimized class names.
 * // This is a highly reusable utility, often provided by UI libraries like ShadCN.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
