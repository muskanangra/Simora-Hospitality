// KitchenCollage.jsx — Full-bleed 10-photo mosaic behind kitchen description.
import { useState } from 'react'
import './KitchenCollage.css'

// 10 tiles definition:
// d = desktop [colStart, colSpan, rowStart, rowSpan] on a 6 col x 4 row grid
// m = mobile [colStart, colSpan, rowStart, rowSpan] on a 4 col x 6 row grid
const TILES = [
  { id: 1, d: [1, 2, 1, 2], m: [1, 2, 1, 2] }, // big square
  { id: 2, d: [3, 1, 1, 2], m: [3, 1, 1, 2] }, // portrait
  { id: 3, d: [4, 2, 1, 2], m: [1, 2, 3, 2] }, // big square
  { id: 4, d: [6, 1, 1, 2], m: [4, 1, 1, 2] }, // portrait
  { id: 5, d: [1, 1, 3, 2], m: [3, 1, 3, 2] }, // portrait
  { id: 6, d: [2, 2, 3, 2], m: [1, 2, 5, 2] }, // big square
  { id: 7, d: [4, 1, 3, 1], m: [4, 1, 3, 1] }, // small square
  { id: 8, d: [5, 2, 3, 1], m: [3, 2, 5, 1] }, // landscape
  { id: 9, d: [4, 2, 4, 1], m: [3, 2, 6, 1] }, // landscape
  { id: 10, d: [6, 1, 4, 1], m: [4, 1, 4, 1] }, // small square
]

function CollageTile({ tile, folder }) {
  const [hasError, setHasError] = useState(false)
  const delay = `${((tile.id * 7) % 10) * 70}ms`

  return (
    <div
      className="collage__tile"
      style={{
        '--dc': `${tile.d[0]} / span ${tile.d[1]}`,
        '--dr': `${tile.d[2]} / span ${tile.d[3]}`,
        '--mc': `${tile.m[0]} / span ${tile.m[1]}`,
        '--mr': `${tile.m[2]} / span ${tile.m[3]}`,
        '--delay': delay,
      }}
    >
      {hasError ? (
        <div className={`collage__fallback collage__fallback--${(tile.id - 1) % 3}`}>
          <span className="collage__fallback-label">Photo {tile.id}</span>
        </div>
      ) : (
        <img
          src={`/images/${folder}/collage-${tile.id}.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}

export default function KitchenCollage({ kitchen }) {
  const folder = kitchen === 'bedres' || kitchen === 'bedres-kitchen' ? 'bedres' : 'umami'

  return (
    <div className="collage" aria-hidden="true">
      {TILES.map((tile) => (
        <CollageTile key={tile.id} tile={tile} folder={folder} />
      ))}
    </div>
  )
}
