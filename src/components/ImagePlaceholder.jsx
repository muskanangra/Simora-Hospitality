// ImagePlaceholder.jsx — Reusable labeled image placeholder or real image component.
// Props:
//   src         {string}  — Optional real image URL
//   alt         {string}  — Alt text for real image (defaults to label)
//   width       {number}  — HTML width attribute (default 1000)
//   height      {number}  — HTML height attribute (default 1000)
//   label       {string}  — Text displayed inside placeholder (e.g. "Hero image")
//   aspectRatio {string}  — CSS padding-top value to set aspect ratio
//   className   {string}  — Optional extra class name for outer wrapper
//   reveal      {boolean} — When true, calls useReveal() and wraps the placeholder in .img-reveal-container
//   onDark      {boolean} — Dark card modifier

import { useState, useRef } from 'react'
import useReveal from '../hooks/useReveal.js'
import './ImagePlaceholder.css'

function ImagePlaceholder({
  src,
  alt = '',
  width = 1000,
  height = 1000,
  label = 'Image',
  aspectRatio = '75%',
  className = '',
  reveal = false,
  onDark = false,
}) {
  const revealRef = useReveal()
  const isDark = onDark || className.includes('on-dark')
  const [hasError, setHasError] = useState(false)
  const prevSrcRef = useRef(src)

  if (prevSrcRef.current !== src) {
    prevSrcRef.current = src
    setHasError(false)
  }

  const showRealImage = Boolean(src && !hasError)

  const handleImageError = () => {
    console.warn(`Image failed to load: ${src}`)
    setHasError(true)
  }

  const box = (
    <div
      className={`img-placeholder ${showRealImage ? 'img-placeholder--has-img' : ''} ${isDark ? 'on-dark' : ''} ${className}`.trim()}
      aria-label={showRealImage ? undefined : label}
      role={showRealImage ? undefined : 'img'}
    >
      {/* padding-top trick preserves aspect ratio without a fixed height */}
      <div
        className="img-placeholder__inner"
        style={{ '--aspect-ratio': aspectRatio }}
      />
      {showRealImage ? (
        <img
          src={src}
          alt={alt || label}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onError={handleImageError}
          className="img-placeholder__real-img"
        />
      ) : (
        <span className="img-placeholder__label">{label}</span>
      )}
    </div>
  )

  if (reveal) {
    return (
      <div ref={revealRef} className="img-reveal-container">
        <div className="img-reveal-wrap">
          {box}
        </div>
      </div>
    )
  }

  return box
}

export default ImagePlaceholder
