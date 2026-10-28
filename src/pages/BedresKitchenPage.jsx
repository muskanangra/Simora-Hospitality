// BedresKitchenPage.jsx — Route: /bedres-kitchen
// Shared TopNav and Footer rendered automatically by Layout.

import siteConfig from '../data/siteConfig.js'
import usePageMeta from '../hooks/usePageMeta.js'
import KitchenHero from '../components/kitchen/KitchenHero.jsx'
import DescriptionSection from '../components/kitchen/DescriptionSection.jsx'
import MediaRow from '../components/kitchen/MediaRow.jsx'
import SubscriptionsSection from '../components/kitchen/SubscriptionsSection.jsx'
import '../components/kitchen/kitchenTheme.css'

function BedresKitchenPage() {
  usePageMeta(siteConfig.meta?.bedres)
  const bedresKitchen = siteConfig.kitchens?.find((k) => k.path === '/bedres-kitchen') || siteConfig.kitchens?.[0]
  const patternVariant = bedresKitchen?.heroPattern || siteConfig.kitchenPages?.bedres?.heroPattern

  return (
    <main
      className="kitchen-page kitchen-page--bedres"
      style={{ paddingTop: 'var(--nav-h)' }}
    >
      <h1 className="sr-only">Bedre’s Kitchen</h1>
      <KitchenHero
        variant={patternVariant}
        heroPattern={patternVariant}
        heroLogo={bedresKitchen?.heroLogo || bedresKitchen?.logo}
        logo={bedresKitchen?.logo}
        logoAlt={bedresKitchen?.alt || 'Bedre’s Kitchen logo'}
        logoWidth={bedresKitchen?.logoWidth}
        logoHeight={bedresKitchen?.logoHeight}
        logoLabel={siteConfig.bedresLogoLabel}
      />
      <DescriptionSection
        data={siteConfig.kitchenPages?.bedres}
        kitchen="bedres"
      />
      <MediaRow
        menu={siteConfig.menus?.bedres}
        video={siteConfig.menus?.bedres?.video}
        menuLabel={siteConfig.menuPhotoLabel}
        video1Label={siteConfig.video1Label}
        video2Label={siteConfig.video2Label}
      />
      <SubscriptionsSection data={siteConfig.kitchenPages?.bedres?.subscriptions} />
    </main>
  )
}

export default BedresKitchenPage
