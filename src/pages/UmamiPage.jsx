// UmamiPage.jsx — Route: /umami
// Shared TopNav and Footer rendered automatically by Layout.

import siteConfig from '../data/siteConfig.js'
import usePageMeta from '../hooks/usePageMeta.js'
import KitchenHero from '../components/kitchen/KitchenHero.jsx'
import DescriptionSection from '../components/kitchen/DescriptionSection.jsx'
import MediaRow from '../components/kitchen/MediaRow.jsx'
import SubscriptionsSection from '../components/kitchen/SubscriptionsSection.jsx'
import DipsSection from '../components/kitchen/DipsSection.jsx'
import '../components/kitchen/kitchenTheme.css'

function UmamiPage() {
  usePageMeta(siteConfig.meta?.umami)
  const umamiKitchen = siteConfig.kitchens?.find((k) => k.path === '/umami') || siteConfig.kitchens?.[1]
  const patternVariant = umamiKitchen?.heroPattern || siteConfig.kitchenPages?.umami?.heroPattern

  return (
    <main
      className="kitchen-page kitchen-page--umami"
      style={{ paddingTop: 'var(--nav-h)' }}
    >
      <h1 className="sr-only">Umami</h1>
      <KitchenHero
        variant={patternVariant}
        heroPattern={patternVariant}
        heroLogo={umamiKitchen?.heroLogo || umamiKitchen?.logo}
        logo={umamiKitchen?.logo}
        logoAlt={umamiKitchen?.alt || 'Umami logo'}
        logoWidth={umamiKitchen?.logoWidth}
        logoHeight={umamiKitchen?.logoHeight}
        logoLabel={siteConfig.umamiLogoLabel}
      />
      <DescriptionSection
        data={siteConfig.kitchenPages?.umami}
        kitchen="umami"
      />
      <MediaRow
        menu={siteConfig.menus?.umami}
        video={siteConfig.menus?.umami?.video}
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
