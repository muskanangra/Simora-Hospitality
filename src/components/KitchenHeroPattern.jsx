// KitchenHeroPattern.jsx — Static SVG background pattern for kitchen hero cards.
// Supports "waves" (Seigaiha for Umami) and "lattice" (triangular overlapping circles for Bedre’s Kitchen).

import { useMemo } from "react"
import "./KitchenHeroPattern.css"

export default function KitchenHeroPattern({ variant }) {
  const shapes = useMemo(() => {
    if (variant === "waves") {
      const R = 56
      const items = []
      let rowIndex = 0

      // Rows drawn from top of viewBox to bottom in increasing order of y
      for (let y = -R; y <= 1000 + R + 0.001; y += R / 2, rowIndex++) {
        // Odd rows shift x by R
        const xShift = (rowIndex % 2 !== 0) ? R : 0

        // In each row centers go from x = -2R in steps of 2R until 1600 + 2R
        for (let baseX = -2 * R; baseX <= 1600 + 2 * R + 0.001; baseX += 2 * R) {
          const cx = baseX + xShift
          const keyBase = `w_${rowIndex}_${baseX}`

          // Draw in this order:
          // 1. circle r = R with fill="var(--hero-pattern-bg)" and a stroke
          items.push(
            <circle
              key={`${keyBase}_r1`}
              cx={cx}
              cy={y}
              r={R}
              fill="var(--hero-pattern-bg)"
              stroke="var(--maroon)"
              strokeWidth="1.5"
              strokeOpacity="0.16"
            />
          )
          // 2. circles r = 0.75R, 0.5R and 0.25R with fill="none" and a stroke
          items.push(
            <circle
              key={`${keyBase}_r2`}
              cx={cx}
              cy={y}
              r={0.75 * R}
              fill="none"
              stroke="var(--maroon)"
              strokeWidth="1.5"
              strokeOpacity="0.16"
            />
          )
          items.push(
            <circle
              key={`${keyBase}_r3`}
              cx={cx}
              cy={y}
              r={0.5 * R}
              fill="none"
              stroke="var(--maroon)"
              strokeWidth="1.5"
              strokeOpacity="0.16"
            />
          )
          items.push(
            <circle
              key={`${keyBase}_r4`}
              cx={cx}
              cy={y}
              r={0.25 * R}
              fill="none"
              stroke="var(--maroon)"
              strokeWidth="1.5"
              strokeOpacity="0.16"
            />
          )
        }
      }
      return items
    }

    if (variant === "lattice") {
      const R = 48
      const items = []

      // Triangular lattice: row r has y = r * R * 0.866 for r from -1 until y passes 1000 + R
      for (let r = -1; ; r++) {
        const y = r * R * 0.866
        if (y > 1000 + R) break

        // x starts at -R + (r % 2) * R / 2 and steps by R until 1600 + R
        const xStart = -R + (r % 2) * R / 2

        for (let x = xStart; x <= 1600 + R + 0.001; x += R) {
          items.push(
            <circle
              key={`l_${r}_${x.toFixed(1)}`}
              cx={x}
              cy={y}
              r={R}
              fill="none"
              stroke="#D2A06F"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />
          )
        }
      }
      return items
    }

    return null
  }, [variant])

  if (!shapes) return null

  return (
    <svg
      className="hero-pattern"
      aria-hidden="true"
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      style={{ "--hero-pattern-bg": "var(--hero-card-bg, #FBF6F3)" }}
    >
      {shapes}
    </svg>
  )
}
