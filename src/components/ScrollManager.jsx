// ScrollManager.jsx — Handles scroll behaviour on route changes.
// Rendered once inside Layout so it reacts to every navigation event.
//
// Logic:
//   • If the new URL contains a hash (e.g. "/#about"), wait until the target
//     element exists in the DOM then scroll it into view.
//   • If the target element is not found within ~600ms, stop looking and scroll to top.
//   • If there is no hash, scroll to the very top of the page instantly.
//
// Uses useLocation from react-router-dom to detect route changes.

import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const prevPathnameRef = useRef(pathname)

  useEffect(() => {
    const isNewPage = prevPathnameRef.current !== pathname
    prevPathnameRef.current = pathname

    if (!hash) {
      // No hash → go to page top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }

    if (isNewPage) {
      // Navigated to a new page with a hash: ensure we start at the top while searching
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

    const id = hash.slice(1) // strip the leading "#"

    // Poll for the element in case the DOM hasn't painted yet (up to ~600ms: 12 * 50ms)
    let attempts = 0
    const maxAttempts = 12
    const interval = setInterval(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        clearInterval(interval)
      } else if (++attempts >= maxAttempts) {
        clearInterval(interval)
        // Element not found within ~600ms: stop looking and scroll to page top safely
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
    }, 50)

    return () => clearInterval(interval)
  }, [pathname, hash, key])

  // Renders nothing — purely a behaviour component
  return null
}

export default ScrollManager
