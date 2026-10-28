// KitchenHero.jsx — Framed hero section for Umami and Bedre’s Kitchen pages.
// Inset rounded card under top bar matching homepage hero card geometry.

import { useState } from "react"
import useReveal from "../../hooks/useReveal.js"
import KitchenHeroPattern from "../KitchenHeroPattern.jsx"
import "./KitchenHero.css"

function KitchenHero({
  heroLogo,
  logo,
  logoAlt,
  logoWidth,
  logoHeight,
  logoLabel = "[Kitchen logo]",
  variant,
  heroPattern = variant,
}) {
  const logoRef = useReveal()
  const [hasError, setHasError] = useState(false)
  const activeLogo = heroLogo || logo

  const handleImageError = () => {
    console.warn(`Logo failed to load: ${activeLogo}`)
    setHasError(true)
  }

  const showRealLogo = Boolean(activeLogo && !hasError)

  return (
    <section className="kitchen-hero" aria-label="Kitchen Hero">
      <div className="kitchen-hero__card">
        {heroPattern && <KitchenHeroPattern variant={heroPattern} />}
        {showRealLogo ? (
          <img
            ref={logoRef}
            src={activeLogo}
            alt={logoAlt || logoLabel}
            width={logoWidth}
            height={logoHeight}
            loading="eager"
            decoding="async"
            fetchpriority="high"
            onError={handleImageError}
            className="kitchen-hero__real-logo reveal"
          />
        ) : (
          <div
            ref={logoRef}
            className="kitchen-hero__logo reveal"
            role="img"
            aria-label={logoLabel}
          >
            <span className="kitchen-hero__logo-label">{logoLabel}</span>
          </div>
        )}
      </div>
    </section>
  )
}

export default KitchenHero
