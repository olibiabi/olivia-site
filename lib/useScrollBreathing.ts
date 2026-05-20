"use client"

import { useEffect } from "react"

/**
 * Toggles a `scrolling` class on `<body>` while the user is actively
 * scrolling. The class is added on the first scroll event and removed
 * `quietMs` after the last one (default 150ms).
 *
 * Pair with this CSS in globals.css:
 *
 *   body.scrolling .cross {
 *     animation: breathePulse 1.2s ease-in-out infinite;
 *   }
 *
 * Effect: every element with the `cross` class pulses while the page is
 * being scrolled, freezes when the user stops. Per design doc §4.1.
 *
 * The scroll listener uses the passive option to avoid blocking
 * scrolling on touch devices.
 */
export function useScrollBreathing(quietMs = 150) {
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const onScroll = () => {
      document.body.classList.add("scrolling")
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        document.body.classList.remove("scrolling")
      }, quietMs)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (timeoutId) clearTimeout(timeoutId)
      document.body.classList.remove("scrolling")
    }
  }, [quietMs])
}
