// useReveal.js — High-performance scroll reveal hook using pooled IntersectionObserver.
// Shares observer instances across elements to minimize scroll overhead, and avoids
// React state updates during scrolling.

import { useRef, useEffect } from "react"

// Pool of shared IntersectionObservers keyed by observer configuration
const observerPool = new Map()

function getSharedObserver(threshold, rootMargin, root) {
  const rootElement = root && typeof root === "object" && "current" in root ? root.current : root
  if (rootElement) {
    // Custom scroll root (e.g. MenuViewer dialog) uses a dedicated instance
    return null
  }

  const thStr = Array.isArray(threshold) ? threshold.join(",") : String(threshold)
  const key = thStr + "_" + rootMargin
  if (!observerPool.has(key)) {
    const callbacks = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i]
          const cb = callbacks.get(entry.target)
          if (cb) cb(entry)
        }
      },
      { threshold, rootMargin }
    )
    observerPool.set(key, { observer, callbacks })
  }
  return observerPool.get(key)
}

/**
 * @param {Object} [options]
 * @param {number|number[]} [options.threshold=[0, 0.15]] — Observer thresholds
 * @param {string} [options.rootMargin="0px 0px -8% 0px"] — Observer root margin
 * @param {React.RefObject|Element|null} [options.root=null] — Optional scroll container root
 * @returns {React.RefObject} — Attach this ref to the element you want to reveal
 */
export default function useReveal({
  threshold = [0, 0.15],
  rootMargin = "0px 0px -8% 0px",
  root = null,
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Reduced motion or missing IntersectionObserver: show immediately
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible")
      return
    }

    const handleEntry = (entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
        el.classList.add("is-visible")
      } else if (!entry.isIntersecting) {
        el.classList.remove("is-visible")
      }
    }

    const shared = getSharedObserver(threshold, rootMargin, root)
    if (shared) {
      shared.callbacks.set(el, handleEntry)
      shared.observer.observe(el)
      return () => {
        shared.callbacks.delete(el)
        shared.observer.unobserve(el)
      }
    }

    // Fallback for custom root containers (like MenuViewer)
    const rootElement = root && typeof root === "object" && "current" in root ? root.current : root
    const observer = new IntersectionObserver(([entry]) => handleEntry(entry), {
      root: rootElement,
      threshold,
      rootMargin,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, root])

  return ref
}
