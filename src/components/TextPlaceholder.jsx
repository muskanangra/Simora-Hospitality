// TextPlaceholder.jsx — Reusable grey text-lines placeholder.
// Renders N narrow grey bars to represent lines of body text.
// Props:
//   lines {number} — How many text-line bars to draw (default 3)
//
// TODO: replace placeholder — remove <TextPlaceholder> and replace with a <p> or
// <div> containing the real text supplied from siteConfig once available.

import './TextPlaceholder.css'

function TextPlaceholder({ lines = 3, className = '', onDark = false }) {
  const isDark = onDark || className.includes('on-dark')
  return (
    <div
      className={`text-placeholder ${isDark ? 'on-dark' : ''} ${className}`.trim()}
      aria-hidden="true"
    >
      {Array.from({ length: lines }, (_, i) => (
        <span
          key={i}
          className="text-placeholder__line"
          /* Last line is slightly shorter for a natural text feel */
          style={{ width: i === lines - 1 ? '72%' : '100%' }}
        />
      ))}
    </div>
  )
}

export default TextPlaceholder
