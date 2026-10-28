// DipsSection.jsx — Umami Section 5A: "From Our Kitchen to Yours".
// id="recipes", scroll-margin-top: var(--nav-h).
// 4 dip rows with full recipe text (serves, ingredients, method, closing).

import siteConfig from '../../data/siteConfig.js'
import renderAccent from '../../utils/renderAccent.jsx'
import ImagePlaceholder from '../ImagePlaceholder.jsx'
import useReveal from '../../hooks/useReveal.js'
import './DipsSection.css'

function DipRow({ dip, index }) {
  const headerRef = useReveal()
  const recipeRef = useReveal()
  const isTextLeft = index % 2 === 0
  const rowId = `dip-${index + 1}`

  return (
    <div
      id={rowId}
      className={`dip-row ${isTextLeft ? 'dip-row--text-left' : 'dip-row--image-left'}`}
    >
      {/* TEXT SIDE: max-width 60ch */}
      <div className="dip-row__text">
        {/* Header reveal block: Dip Name & Dish Name */}
        <div ref={headerRef} className="dip-row__header reveal">
          <h3 className="dip-row__name">{dip.name}</h3>
          {dip.dish && <p className="dip-row__dish">{dip.dish}</p>}
        </div>

        {/* Recipe reveal block: 150ms delay */}
        <div
          ref={recipeRef}
          className="dip-row__recipe reveal"
          style={{ '--delay': '150ms' }}
        >
          <span className="dip-row__recipe-label">
            {siteConfig.recipeLabel || 'RECIPE'}
          </span>

          {dip.serves && <p className="dip-row__serves">{dip.serves}</p>}

          {dip.ingredients && dip.ingredients.length > 0 && (
            <div className="dip-row__ingredients-wrap">
              <h4 className="dip-row__subheading">Ingredients</h4>
              <ul className="dip-row__ingredients-list">
                {dip.ingredients.map((item, i) => (
                  <li key={i} className="dip-row__ingredient-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {dip.method && dip.method.length > 0 && (
            <div className="dip-row__method-wrap">
              <h4 className="dip-row__subheading">Method</h4>
              <ol className="dip-row__method-list">
                {dip.method.map((step, i) => (
                  <li key={i} className="dip-row__method-item">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {dip.closing && <p className="dip-row__closing">{dip.closing}</p>}
        </div>
      </div>

      {/* IMAGE SIDE: square image with standard image reveal */}
      <div className="dip-row__media">
        <ImagePlaceholder
          src={dip.image}
          alt={dip.name}
          label={`Dip image ${index + 1}`}
          aspectRatio="100%"
          reveal={true}
        />
      </div>
    </div>
  )
}

function DipsSection() {
  const headerRef = useReveal()

  return (
    <section id="recipes" className="kitchen-recipes-section" aria-label="Recipes">
      <div className="container">
        {/* Centered Pill and Heading */}
        <div ref={headerRef} className="kitchen-recipes-header reveal">
          {siteConfig.labels?.delivery && (
            <span className="section-label section-label--center">
              {siteConfig.labels.delivery}
            </span>
          )}
          <h2 className="section-heading section-heading--center">
            {renderAccent(siteConfig.deliveryHeading)}
          </h2>
        </div>

        {/* 4 Dip Rows */}
        <div className="dips-rows">
          {siteConfig.dips.map((dip, index) => (
            <DipRow key={index} dip={dip} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default DipsSection
