const fs = require('fs');

// 1. KitchenHero.css
const heroCss = `/*
 * KitchenHero.css — Framed card hero styling for kitchen pages.
 */

.kitchen-hero {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.kitchen-hero__card {
  height: calc(100svh - var(--nav-h) - var(--frame-gap));
  min-height: calc(560px - var(--nav-h) - var(--frame-gap));
  margin-inline: var(--frame-gap);
  margin-bottom: var(--frame-gap);
  border-radius: var(--radius);
  background-color: #FBF6F3;
  border: 1.5px solid color-mix(in srgb, var(--theme-primary) 40%, transparent);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Logo fills the whole card while maintaining aspect ratio and centering */
.kitchen-hero__real-logo {
  height: calc(100% - 2 * clamp(1.5rem, 4vw, 3rem));
  width: auto;
  max-width: calc(100% - 2 * clamp(1.5rem, 4vw, 3rem));
  object-fit: contain;
  object-position: center;
  display: block;
}

/* Centered dashed logo placeholder box */
.kitchen-hero__logo {
  width: min(70vw, 560px);
  aspect-ratio: 2 / 1;
  border-radius: 18px;
  border: 2px dashed rgba(42, 36, 35, 0.35);
  background-color: rgba(42, 36, 35, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  box-sizing: border-box;
}

.kitchen-hero__logo-label {
  font-family: var(--font-sans);
  font-size: clamp(1rem, 2.5vw, 1.35rem);
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--theme-primary);
  text-align: center;
  user-select: none;
}
`;
fs.writeFileSync('src/components/kitchen/KitchenHero.css', heroCss, 'utf8');

// 2. KitchenHero.jsx
const heroJsx = `// KitchenHero.jsx — Framed hero section for Umami and Bedre’s Kitchen pages.
// Inset rounded card under top bar matching homepage hero card geometry.

import { useState } from 'react'
import useReveal from '../../hooks/useReveal.js'
import './KitchenHero.css'

function KitchenHero({
  heroLogo,
  logo,
  logoAlt,
  logoWidth,
  logoHeight,
  logoLabel = '[Kitchen logo]',
}) {
  const logoRef = useReveal()
  const [hasError, setHasError] = useState(false)
  const activeLogo = heroLogo || logo

  const handleImageError = () => {
    console.warn(\`Logo failed to load: \${activeLogo}\`)
    setHasError(true)
  }

  const showRealLogo = Boolean(activeLogo && !hasError)

  return (
    <section className="kitchen-hero" aria-label="Kitchen Hero">
      <div className="kitchen-hero__card">
        {showRealLogo ? (
          <img
            ref={logoRef}
            src={activeLogo}
            alt={logoAlt || logoLabel}
            width={logoWidth}
            height={logoHeight}
            loading="eager"
            decoding="async"
            fetchPriority="high"
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
`;
fs.writeFileSync('src/components/kitchen/KitchenHero.jsx', heroJsx, 'utf8');

// 3. BedresKitchenPage.jsx
const bedresJsx = `// BedresKitchenPage.jsx — Route: /bedres-kitchen
// Shared TopNav and Footer rendered automatically by Layout.

import siteConfig from '../data/siteConfig.js'
import KitchenHero from '../components/kitchen/KitchenHero.jsx'
import DescriptionSection from '../components/kitchen/DescriptionSection.jsx'
import MediaRow from '../components/kitchen/MediaRow.jsx'
import SubscriptionsSection from '../components/kitchen/SubscriptionsSection.jsx'
import '../components/kitchen/kitchenTheme.css'

function BedresKitchenPage() {
  const bedresKitchen = siteConfig.kitchens?.find((k) => k.path === '/bedres-kitchen') || siteConfig.kitchens?.[0]

  return (
    <main
      className="kitchen-page kitchen-page--bedres"
      style={{ paddingTop: 'var(--nav-h)' }}
    >
      <h1 className="sr-only">Bedre’s Kitchen</h1>
      <KitchenHero
        heroLogo={bedresKitchen?.heroLogo || bedresKitchen?.logo}
        logo={bedresKitchen?.logo}
        logoAlt={bedresKitchen?.alt || 'Bedre’s Kitchen logo'}
        logoWidth={bedresKitchen?.logoWidth}
        logoHeight={bedresKitchen?.logoHeight}
        logoLabel={siteConfig.bedresLogoLabel}
      />
      <DescriptionSection
        data={siteConfig.kitchenPages?.bedres}
        imageLabel={siteConfig.foodImagesLabel}
      />
      <MediaRow
        menu={siteConfig.menus?.bedres}
        menuLabel={siteConfig.menuPhotoLabel}
        video1Label={siteConfig.video1Label}
        video2Label={siteConfig.video2Label}
      />
      <SubscriptionsSection data={siteConfig.kitchenPages?.bedres?.subscriptions} />
    </main>
  )
}

export default BedresKitchenPage
`;
fs.writeFileSync('src/pages/BedresKitchenPage.jsx', bedresJsx, 'utf8');

// 4. UmamiPage.jsx
const umamiJsx = `// UmamiPage.jsx — Route: /umami
// Shared TopNav and Footer rendered automatically by Layout.

import siteConfig from '../data/siteConfig.js'
import KitchenHero from '../components/kitchen/KitchenHero.jsx'
import DescriptionSection from '../components/kitchen/DescriptionSection.jsx'
import MediaRow from '../components/kitchen/MediaRow.jsx'
import SubscriptionsSection from '../components/kitchen/SubscriptionsSection.jsx'
import DipsSection from '../components/kitchen/DipsSection.jsx'
import '../components/kitchen/kitchenTheme.css'

function UmamiPage() {
  const umamiKitchen = siteConfig.kitchens?.find((k) => k.path === '/umami') || siteConfig.kitchens?.[1]

  return (
    <main
      className="kitchen-page kitchen-page--umami"
      style={{ paddingTop: 'var(--nav-h)' }}
    >
      <h1 className="sr-only">Umami</h1>
      <KitchenHero
        heroLogo={umamiKitchen?.heroLogo || umamiKitchen?.logo}
        logo={umamiKitchen?.logo}
        logoAlt={umamiKitchen?.alt || 'Umami logo'}
        logoWidth={umamiKitchen?.logoWidth}
        logoHeight={umamiKitchen?.logoHeight}
        logoLabel={siteConfig.umamiLogoLabel}
      />
      <DescriptionSection
        data={siteConfig.kitchenPages?.umami}
        imageLabel={siteConfig.foodImagesLabel}
      />
      <MediaRow
        menu={siteConfig.menus?.umami}
        menuLabel={siteConfig.menuPhotoLabel}
        video1Label={siteConfig.video1Label}
        video2Label={siteConfig.video2Label}
      />
      <SubscriptionsSection data={siteConfig.kitchenPages?.umami?.subscriptions} />
      <div className="kitchen-cream-divider" aria-hidden="true" />
      <DipsSection />
    </main>
  )
}

export default UmamiPage
`;
fs.writeFileSync('src/pages/UmamiPage.jsx', umamiJsx, 'utf8');

console.log('All hero files written successfully.');
