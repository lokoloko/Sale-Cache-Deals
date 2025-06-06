// src/hooks/use-toast.ts
// This custom hook provides functionality for managing and displaying toast notifications.
// It's inspired by libraries like react-hot-toast and is designed to work with
// the ShadCN UI Toast components.
// It allows adding, updating, dismissing, and removing toasts from a global state.

"use client" // This hook is intended for client-side use.

// --- Core React Imports ---
import * as React from "react"

// --- Type Imports ---
// 🔍 Types related to the Toast component from ShadCN UI.
import type {
  ToastActionElement, // Type for the optional action button in a toast.
  ToastProps,         // Props for the individual Toast component.
} from "@/components/ui/toast"

// --- Constants ---
const TOAST_LIMIT = 1 // Maximum number of toasts to display at once. Older toasts are removed.
const TOAST_REMOVE_DELAY = 1000000 // A very long delay before a dismissed toast is actually removed from state.
                                  // This allows for exit animations. Could be configured.

// --- Type Definitions for Toaster ---
/**
 * @type ToasterToast
 * @description Extends `ToastProps` with an `id` and optional `title`, `description`, and `action`.
 * This is the internal representation of a toast managed by this hook.
 */
type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
}

// --- Action Types for Reducer ---
// Defines the types of actions that can be dispatched to modify the toast state.
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST", // Makes toast invisible, schedules removal.
  REMOVE_TOAST: "REMOVE_TOAST",   // Actually removes toast from state.
} as const

// --- Utility for Generating Unique IDs ---
let count = 0 // Counter for generating unique toast IDs.
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// --- TypeScript Action and State Types ---
type ActionType = typeof actionTypes

// Defines the structure of actions for the reducer.
type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast> // For updating existing toasts.
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"] // Optional: dismiss all if no ID.
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"] // Optional: remove all if no ID.
    }

// Defines the shape of the global toast state.
interface State {
  toasts: ToasterToast[]; // Array of active toasts.
}

// --- Toast Timeout Management ---
// Manages timeouts for removing toasts after they are dismissed.
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

// Schedules a toast for removal from the state after a delay.
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) { // Avoid duplicate timeouts.
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId) // Clear the timeout entry.
    dispatch({ // Dispatch action to remove the toast from state.
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout) // Store the timeout ID.
}

// --- Reducer Function ---
// Manages state transitions based on dispatched actions.
// 🔍 This reducer logic controls how the `toasts` array is modified.
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        // Add new toast to the beginning and limit the total number of toasts.
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        // Update an existing toast by its ID.
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action
      // Side effect: Schedule the toast for actual removal.
      if (toastId) {
        addToRemoveQueue(toastId)
      } else { // If no toastId, dismiss all active toasts.
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        // Mark toast(s) as not open (invisible), but keep in state for exit animation.
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false, // This triggers the exit animation in the Toast component.
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) { // If no toastId, remove all toasts.
        return {
          ...state,
          toasts: [],
        }
      }
      // Filter out the toast to be removed.
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// --- Global State and Dispatcher ---
const listeners: Array<(state: State) => void> = [] // Array of listener functions to be called on state change.
let memoryState: State = { toasts: [] } // The single source of truth for toast state.

// Dispatches an action to the reducer and notifies all listeners.
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

// --- Public Toast Function ---
/**
 * @typedef Toast
 * @description The properties required to create a new toast, excluding the `id`.
 */
type Toast = Omit<ToasterToast, "id">

/**
 * @function toast
 * @description Public function to create and display a new toast notification.
 * @param {Toast} props - Properties for the new toast (title, description, variant, etc.).
 * @returns {{ id: string, dismiss: () => void, update: (props: ToasterToast) => void }}
 *          An object containing the ID of the created toast and functions to dismiss or update it.
 * // 🔧 This is the primary function components will call to show notifications.
 */
function toast({ ...props }: Toast) {
  const id = genId() // Generate a unique ID for the new toast.

  // Function to update this specific toast.
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  // Function to dismiss this specific toast.
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  // Add the new toast to the state.
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true, // New toasts are open by default.
      onOpenChange: (open) => { // Callback from Toast component when its open state changes (e.g., by swipe).
        if (!open) dismiss() // If the toast is closed by user action, dismiss it.
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

// --- useToast Hook ---
/**
 * @hook useToast
 * @description Custom React hook that provides access to the current toast state and functions
 * to create (`toast`) or dismiss toasts.
 * @returns {{ toasts: ToasterToast[], toast: (props: Toast) => { id: string, dismiss: () => void, update: (props: ToasterToast) => void }, dismiss: (toastId?: string) => void }}
 *          An object containing the current array of toasts, and functions to interact with them.
 */
function useToast() {
  // Local React state, synchronized with the global `memoryState`.
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    // Register this component's `setState` as a listener to global state changes.
    listeners.push(setState)
    return () => {
      // Cleanup: remove the listener when the component unmounts.
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state]) // Effect dependencies.

  return {
    ...state, // Current array of `toasts`.
    toast,    // Function to create a new toast.
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }), // Function to dismiss toast(s).
  }
}

export { useToast, toast }
