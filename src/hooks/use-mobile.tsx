// src/hooks/use-mobile.tsx
// This custom React hook detects if the current viewport width corresponds to a mobile device size.
// It's useful for applying responsive logic or styles in components.

import * as React from "react"

// Define the breakpoint for mobile devices.
// 🔍 This constant determines the width threshold for considering the view as "mobile".
const MOBILE_BREAKPOINT = 768 // pixels

/**
 * @hook useIsMobile
 * @description A custom React hook that returns `true` if the window width is less than `MOBILE_BREAKPOINT`, `false` otherwise.
 * It handles initial state and updates on window resize.
 * @returns {boolean} `true` if the viewport is considered mobile, `false` otherwise. `undefined` during initial server render.
 * // 🔧 Useful for conditional rendering of components or applying different layouts based on screen size.
 */
export function useIsMobile() {
  // State to store whether the viewport is mobile. `undefined` initially to handle SSR.
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // This effect runs only on the client-side after hydration.
    
    // Create a MediaQueryList object.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Handler to update `isMobile` state when the media query match changes.
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add event listener for changes in the media query.
    mql.addEventListener("change", onChange)
    
    // Set the initial state based on the current window width.
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Cleanup function: remove the event listener when the component unmounts.
    return () => mql.removeEventListener("change", onChange)
  }, []) // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount.

  // Return the current mobile status.
  // `!!isMobile` converts `undefined` to `false` for a boolean return type,
  // though consumers should be aware it might be `undefined` briefly if not handled carefully with SSR.
  return !!isMobile
}
