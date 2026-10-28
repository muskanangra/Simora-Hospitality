// SubscriptionsSection.jsx — Shared subscriptions section for Bedre’s Kitchen and Umami.
// Centered heading "*Subscriptions*", alternating rows (starting with image left).
// Mobile: image first, then text.

import siteConfig from '../../data/siteConfig.js'
import renderAccent from '../../utils/renderAccent.jsx'
import ImagePlaceholder from '../ImagePlaceholder.jsx'
import useReveal from '../../hooks/useReveal.js'
import './SubscriptionsSection.css'

function SubscriptionRow({ sub, index }) {
  const nameRef = useReveal()
  const bodyRef = useReveal()
  const ctaRef = useReveal()
  const isImageLeft = index % 2 === 0
  const rowId = `subscription-${index + 1}`

  const whatsappDigits = siteConfig.contact?.whatsappDigits || '917738101181'
  const whatsappMessage = sub.whatsappMessage || ''
  const whatsappHref = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(whatsappMessage)}`
  const ctaText = siteConfig.subscriptionCta?.text || 'Enquire on WhatsApp'

  return (
    <div
      id={rowId}
      className={`sub-row ${isImageLeft ? 'sub-row--image-left' : 'sub-row--text-left'}`}
    >
      {/* TEXT SIDE */}
      <div className="sub-row__text">
        <h3 ref={nameRef} className="sub-row__name reveal">
          {sub.name}
        </h3>

        <div
          ref={bodyRef}
          className="sub-row__body reveal"
          style={{ '--delay': '150ms' }}
        >
          {sub.intro && <p className="sub-row__intro">{sub.intro}</p>}

          {sub.description && (
            <p className="sub-row__description">{sub.description}</p>
          )}

          {sub.bullets && sub.bullets.length > 0 && (
            <ul className="sub-row__bullets">
              {sub.bullets.map((bullet, i) => (
                <li key={i} className="sub-row__bullet-item">
                  {bullet}
                </li>
              ))}
            </ul>
          )}

          {sub.bestFor && (
            <p className="sub-row__best-for">
              <span className="sub-row__best-for-prefix">Best for:</span>{' '}
              {sub.bestFor.replace(/^Best for:\s*/i, '')}
            </p>
          )}

          {sub.schedule && (
            <p className="sub-row__schedule">{sub.schedule}</p>
          )}

          <a
            ref={ctaRef}
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="sub-cta-btn reveal"
            style={{ '--delay': '250ms' }}
            aria-label={`Enquire on WhatsApp about ${sub.name}`}
          >
            {ctaText}
          </a>
        </div>
      </div>

      {/* IMAGE SIDE: 4:3 image with standard image reveal */}
      <div className="sub-row__media">
        <ImagePlaceholder
          src={sub.image}
          alt={sub.name}
          label={`Subscription image ${index + 1}`}
          aspectRatio="75%"
          reveal={true}
        />
      </div>
    </div>
  )
}

function SubscriptionsSection({ data, heading = '*Subscriptions*' }) {
  const headerRef = useReveal()
  const subscriptions = data || siteConfig.subscriptions || []

  return (
    <section id="subscriptions" className="kitchen-subs-section" aria-label="Subscriptions">
      <div className="container">
        {/* Centered Heading and conditional pill (renders nothing for empty label) */}
        <div ref={headerRef} className="kitchen-subs-header reveal">
          {siteConfig.labels?.subscriptions ? (
            <span className="section-label section-label--center">
              {siteConfig.labels.subscriptions}
            </span>
          ) : null}
          <h2 className="section-heading section-heading--center">
            {renderAccent(heading)}
          </h2>
        </div>

        {/* Subscription Rows */}
        <div className="subs-rows">
          {subscriptions.map((sub, index) => (
            <SubscriptionRow key={index} sub={sub} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SubscriptionsSection
