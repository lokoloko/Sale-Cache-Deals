// src/components/ui/toaster.tsx
// This component is responsible for rendering toasts (notifications) managed by the `useToast` hook.
// It's typically placed in the root layout of the application.
// It uses ShadCN UI's Toast components.

"use client"; // This component needs to be a Client Component because it uses the `useToast` hook.

// --- Hook Imports ---
import { useToast } from "@/hooks/use-toast"; // Custom hook for managing and accessing toast state.

// --- UI Component Imports ---
// Reusable Toast components from ShadCN UI.
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

// --- Toaster Component ---
/**
 * @component Toaster
 * @description Renders all active toasts managed by the `useToast` hook.
 * This component should be included once in the application's layout (e.g., `RootLayout`).
 * It acts as the container and renderer for toast notifications.
 */
export function Toaster() {
  // Retrieve the list of current toasts from the `useToast` hook.
  // 🔍 `toasts` is an array of toast objects, each containing properties like id, title, description, etc.
  const { toasts } = useToast();

  return (
    // `ToastProvider` is a necessary wrapper from Radix UI (via ShadCN) for toast functionality.
    <ToastProvider>
      {/* Map over the `toasts` array and render a `Toast` component for each one. */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          // Individual `Toast` component. `key` is essential for React list rendering.
          <Toast key={id} {...props}> {/* Spread other toast props (like variant, onOpenChange). */}
            <div className="grid gap-1"> {/* Container for title and description. */}
              {title && <ToastTitle>{title}</ToastTitle>} {/* Render title if provided. */}
              {description && (
                <ToastDescription>{description}</ToastDescription> // Render description if provided.
              )}
            </div>
            {action} {/* Render action button if provided (e.g., an "Undo" button). */}
            <ToastClose /> {/* Standard close button for the toast. */}
          </Toast>
        );
      })}
      {/* `ToastViewport` defines the area where toasts will appear on the screen. */}
      <ToastViewport />
    </ToastProvider>
  );
}
