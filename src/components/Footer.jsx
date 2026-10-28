// Footer.jsx — Shared site footer. Appears on every page via Layout.
// Contains the "Company Details" (id="contact") section.
// Values and links are read from siteConfig.

import siteConfig from '../data/siteConfig.js'
import useReveal from '../hooks/useReveal.js'
import renderAccent from '../utils/renderAccent.jsx'
import './Footer.css'

function Footer() {
  const { contact, contactHeading } = siteConfig
  const headingRef = useReveal()
  const phoneRef = useReveal()
  const emailRef = useReveal()
  const waRef = useReveal()
  const addrRef = useReveal()

  const phones = contact.phones || [
    { display: '+91 77381 01181', tel: '+917738101181', wa: '917738101181' },
    { display: '+91 98212 66550', tel: '+919821266550', wa: '919821266550' },
  ]

  return (
    <footer id="contact" className="footer">
      <div className="footer__inner">
        <h2
          ref={headingRef}
          className="section-heading section-heading--cream footer__heading reveal"
        >
          {renderAccent(contactHeading || 'Company *Details*')}
        </h2>

        <dl className="footer__details">
          {/* Row 1, Col 1: Phone */}
          <div
            ref={phoneRef}
            className="footer__detail-item reveal"
            style={{ '--delay': '0ms' }}
          >
            <dt className="footer__detail-label">Phone</dt>
            <dd className="footer__detail-value footer__detail-value--phones">
              {phones.map((p, idx) => (
                <span key={p.tel} className="footer__number-wrap">
                  {idx > 0 && <span className="footer__detail-sep" aria-hidden="true"> / </span>}
                  <a
                    href={`tel:${p.tel}`}
                    className="footer__detail-link footer__detail-link--nowrap"
                  >
                    {p.display}
                  </a>
                </span>
              ))}
            </dd>
          </div>

          {/* Row 1, Col 2: Email */}
          <div
            ref={emailRef}
            className="footer__detail-item reveal"
            style={{ '--delay': '100ms' }}
          >
            <dt className="footer__detail-label">Email</dt>
            <dd className="footer__detail-value">
              <a href={contact.emailHref} className="footer__detail-link">
                {contact.email}
              </a>
            </dd>
          </div>

          {/* Row 2, Col 1: WhatsApp */}
          <div
            ref={waRef}
            className="footer__detail-item reveal"
            style={{ '--delay': '200ms' }}
          >
            <dt className="footer__detail-label">WhatsApp</dt>
            <dd className="footer__detail-value footer__detail-value--phones">
              {phones.map((p, idx) => (
                <span key={p.wa} className="footer__number-wrap">
                  {idx > 0 && <span className="footer__detail-sep" aria-hidden="true"> / </span>}
                  <a
                    href={`https://wa.me/${p.wa}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__detail-link footer__detail-link--nowrap"
                  >
                    {p.display}
                  </a>
                </span>
              ))}
            </dd>
          </div>

          {/* Row 2, Col 2: Address */}
          <div
            ref={addrRef}
            className="footer__detail-item reveal"
            style={{ '--delay': '300ms' }}
          >
            <dt className="footer__detail-label">Address</dt>
            <dd className="footer__detail-value">
              {contact.address}
            </dd>
          </div>
        </dl>
      </div>
    </footer>
  )
}

export default Footer
