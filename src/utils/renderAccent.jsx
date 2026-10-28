// renderAccent.jsx — Helper that turns *word* into <em className="accent">word</em>.
import React from 'react'

export default function renderAccent(text) {
  if (!text || typeof text !== 'string') return text

  const parts = text.split(/(\*[^*]+\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      const word = part.slice(1, -1)
      return (
        <em key={index} className="accent">
          {word}
        </em>
      )
    }
    return part
  })
}
