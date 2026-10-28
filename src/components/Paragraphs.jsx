// Paragraphs.jsx — Renders an array of paragraph strings with consistent body styling
import './Paragraphs.css'

export function renderRich(text) {
  if (!text || typeof text !== 'string') return text
  if (!text.includes('**') && !text.includes('_')) return text

  const parts = text.split(/(\*{2}[^*]+\*{2}|_[^_]+_)/g)
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('_') && part.endsWith('_') && part.length >= 2) {
      return (
        <em key={idx} className="accent-inline">
          {part.slice(1, -1)}
        </em>
      )
    }
    return part
  })
}

function Paragraphs({ items, className = '' }) {
  if (!items || !items.length) return null

  return (
    <div className={`paragraphs ${className}`}>
      {items.map((text, idx) => (
        <p key={idx} className="paragraphs__item">
          {renderRich(text)}
        </p>
      ))}
    </div>
  )
}

export default Paragraphs
