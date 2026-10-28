const fs = require('fs');

console.log('Applying Stage 1 Part 2 updates...');

// ============================================================================
// 1. TopNav.jsx
// ============================================================================
let topNav = fs.readFileSync('src/components/TopNav.jsx', 'utf8');
topNav = topNav.replace(
  "if (to === '/#about') return location.pathname === '/' && location.hash === '#about'",
  "if (to === '/#about') return location.pathname === '/' && location.hash === '#about'\n    if (to === '/#founder') return location.pathname === '/' && location.hash === '#founder'"
);
fs.writeFileSync('src/components/TopNav.jsx', topNav, 'utf8');
console.log('Updated src/components/TopNav.jsx');

// ============================================================================
// 2. ReviewsSection.jsx
// ============================================================================
let reviewsSection = fs.readFileSync('src/components/ReviewsSection.jsx', 'utf8');
// Import Paragraphs if not present
if (!reviewsSection.includes("import Paragraphs from './Paragraphs.jsx'")) {
  reviewsSection = reviewsSection.replace(
    "import TextPlaceholder from './TextPlaceholder.jsx'",
    "import TextPlaceholder from './TextPlaceholder.jsx'\nimport Paragraphs from './Paragraphs.jsx'"
  );
}

// Replace TextPlaceholder in reviews-intro-text
const oldReviewsText = `<div className="reviews-intro-text">
            <TextPlaceholder lines={2} />
          </div>`;

const newReviewsText = `<div className="reviews-intro-text">
            <Paragraphs items={siteConfig.reviewsParagraphs} className="reviews-paragraphs" />
          </div>`;

reviewsSection = reviewsSection.replace(oldReviewsText, newReviewsText);
fs.writeFileSync('src/components/ReviewsSection.jsx', reviewsSection, 'utf8');
console.log('Updated src/components/ReviewsSection.jsx');

// ============================================================================
// 3. Footer.jsx and Footer.css
// ============================================================================
const footerJsx = `// Footer.jsx — Shared site footer. Appears on every page via Layout.
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
                    href={\`tel:\${p.tel}\`}
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
                    href={\`https://wa.me/\${p.wa}\`}
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
`;
fs.writeFileSync('src/components/Footer.jsx', footerJsx, 'utf8');
console.log('Updated src/components/Footer.jsx');

const footerCss = `/*
 * Footer.css — Shared footer styles.
 * Dark maroon-deep background, cream text, two-column grid on desktop.
 */

.footer {
  background-color: var(--maroon-deep);
  color: var(--cream);
  padding: 4rem var(--content-px);
  border-top: 1px solid rgba(247, 237, 232, 0.15);
}

.footer__inner {
  max-width: var(--content-max);
  margin-inline: auto;
}

.footer__heading {
  margin-bottom: 2.5rem;
}

.footer__heading .accent {
  color: var(--cream);
}

/* ─── CONTACT DETAILS GRID ───────────────────────────────────── */
.footer__details {
  display: grid;
  grid-template-columns: 1fr; /* mobile: single column */
  gap: 1.5rem 3rem;
}

@media (min-width: 768px) {
  .footer__details {
    grid-template-columns: 1fr 1fr; /* desktop: two columns */
  }
}

.footer__detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.footer__detail-label {
  font-family: var(--font-sans);
  font-size: 0.6875rem;       /* ~11px */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(247, 237, 232, 0.6);
}

.footer__detail-value {
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  font-weight: 400;
  color: var(--cream);
  word-break: break-word;
}

.footer__detail-value--phones {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.footer__number-wrap {
  display: inline-flex;
  align-items: center;
}

.footer__detail-sep {
  white-space: pre;
  color: var(--cream);
  user-select: none;
}

.footer__detail-link--nowrap {
  white-space: nowrap;
}

/* Link style: cream, no underline at rest, 1px cream underline growing from left on hover/focus (250ms) */
.footer__detail-link {
  color: var(--cream);
  text-decoration: none;
  position: relative;
  display: inline-block;
  word-break: break-word;
  transition: color 250ms var(--ease-out);
}

.footer__detail-link::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--cream);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 250ms var(--ease-out);
}

.footer__detail-link:hover::after,
.footer__detail-link:focus-visible::after {
  transform: scaleX(1);
}
`;
fs.writeFileSync('src/components/Footer.css', footerCss, 'utf8');
console.log('Updated src/components/Footer.css');

// ============================================================================
// 4. animations.css (remove hero placeholder scale-settle)
// ============================================================================
let animCss = fs.readFileSync('src/styles/animations.css', 'utf8');
const oldHeroScale = `/* --- Hero image placeholder scaling --- */
html[data-intro="loading"] .hero-card__img {
  transform: scale(1.12);
  transition: none;
}

html[data-intro="lifting"] .hero-card__img {
  transform: scale(1);
  transition: transform 1800ms cubic-bezier(0.22, 1, 0.36, 1);
}

html[data-intro="done"] .hero-card__img {
  transform: scale(1);
  transition: none;
}`;

animCss = animCss.replace(oldHeroScale, '/* Optional hero photo can be added later */');
fs.writeFileSync('src/styles/animations.css', animCss, 'utf8');
console.log('Updated src/styles/animations.css');

// ============================================================================
// 5. HomePage.jsx
// ============================================================================
let homeJsx = fs.readFileSync('src/pages/HomePage.jsx', 'utf8');

// Unpack enquiriesParagraphs
homeJsx = homeJsx.replace(
  'enquiriesHeading,',
  'enquiriesHeading,\n    enquiriesParagraphs,'
);

// Hero: plain maroon card
const oldHeroBlock = `<section id="top" ref={heroRef} className="hero" aria-label="Hero">
        <div className="hero-card">
          <div className="hero-card__img" role="img" aria-label="Hero image">
            <span className="hero-card__img-label">Hero image</span>
          </div>
        </div>`;

const newHeroBlock = `<section id="top" ref={heroRef} className="hero" aria-label="Hero">
        <div className="hero-card">
          {/* // Optional hero photo can be added later */}
        </div>`;

homeJsx = homeJsx.replace(oldHeroBlock, newHeroBlock);

// Founder heading: no link
const oldFounderHeading = `<h2 className="section-heading">
                  <Link to="/founder" className="founder-heading-link">
                    {renderAccent(founderHeading)}
                  </Link>
                </h2>`;

const newFounderHeading = `<h2 className="section-heading">
                  {renderAccent(founderHeading)}
                </h2>`;

homeJsx = homeJsx.replace(oldFounderHeading, newFounderHeading);

// Enquiries restructured into 2 columns
const oldEnquiriesBlock = `<div className="enquiries__grid">
            {/* Column 1: Enquiries */}
            <div ref={enquiriesCol1Ref} className="enquiries__col reveal" style={{ '--delay': '100ms' }}>
              <h3 className="enquiries__subheading">{enquiriesSubheading || 'Enquiries'}</h3>
              <div className="enquiries__text">
                <TextPlaceholder lines={2} />
              </div>
              <a href={enquiriesBtnHref || 'mailto:Bedres14@yahoo.com'} className="enquiries-pill-btn">
                {enquiriesBtnLabel || 'Bedres14@yahoo.com'}
              </a>
            </div>

            {/* Column 2: Collaborations */}
            <div ref={enquiriesCol2Ref} className="enquiries__col reveal" style={{ '--delay': '200ms' }}>
              <h3 className="enquiries__subheading">{collaborationsSubheading || 'Collaborations'}</h3>
              <div className="enquiries__text">
                <TextPlaceholder lines={2} />
              </div>
              <a
                href={collaborationsBtnHref || 'https://wa.me/917738101181'}
                target="_blank"
                rel="noopener noreferrer"
                className="enquiries-pill-btn"
              >
                {collaborationsBtnLabel || 'WhatsApp +91 77381 01181'}
              </a>
            </div>
          </div>`;

const newEnquiriesBlock = `<div className="enquiries__grid">
            {/* Column 1 (LEFT): Paragraphs 1 and 2 */}
            <div ref={enquiriesCol1Ref} className="enquiries__col enquiries__col--left reveal" style={{ '--delay': '100ms' }}>
              <p className="enquiries__p">{enquiriesParagraphs?.[0]}</p>
              <p className="enquiries__p">{enquiriesParagraphs?.[1]}</p>
            </div>

            {/* Column 2 (RIGHT): Paragraph 3 followed by contact buttons */}
            <div ref={enquiriesCol2Ref} className="enquiries__col enquiries__col--right reveal" style={{ '--delay': '200ms' }}>
              <p className="enquiries__p">{enquiriesParagraphs?.[2]}</p>
              
              <div className="enquiries__actions">
                <div className="enquiries__action-item">
                  <span className="enquiries__action-label">{enquiriesSubheading || 'Enquiries'}</span>
                  <a href={enquiriesBtnHref || 'mailto:Bedres14@yahoo.com'} className="enquiries-pill-btn">
                    {enquiriesBtnLabel || 'Bedres14@yahoo.com'}
                  </a>
                </div>

                <div className="enquiries__action-item">
                  <span className="enquiries__action-label">{collaborationsSubheading || 'Collaborations'}</span>
                  <a
                    href={collaborationsBtnHref || 'https://wa.me/917738101181'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="enquiries-pill-btn"
                  >
                    {collaborationsBtnLabel || 'WhatsApp +91 77381 01181'}
                  </a>
                </div>
              </div>
            </div>
          </div>`;

homeJsx = homeJsx.replace(oldEnquiriesBlock, newEnquiriesBlock);
fs.writeFileSync('src/pages/HomePage.jsx', homeJsx, 'utf8');
console.log('Updated src/pages/HomePage.jsx');

// ============================================================================
// 6. HomePage.css
// ============================================================================
let homeCss = fs.readFileSync('src/pages/HomePage.css', 'utf8');

// Section scroll-margin-top
const sectionRule = `.section {
  padding-block: var(--section-pad-y);
  scroll-margin-top: var(--nav-h);
}`;
homeCss = homeCss.replace('.section {\n  padding-block: var(--section-pad-y);\n}', sectionRule);

// Founder body text & strong styling
const founderTextRule = `.founder-section .paragraphs__item {
  font-size: clamp(1.0625rem, 0.95rem + 0.5vw, 1.1875rem);
  line-height: 1.7;
  max-width: 60ch;
}

.founder-section strong {
  font-weight: 700;
  color: var(--cream);
}`;

homeCss = homeCss.replace(
  '.founder-section .accent {\n  color: var(--cream);\n}',
  `.founder-section .accent {\n  color: var(--cream);\n}\n\n${founderTextRule}`
);

// Remove founder-heading-link CSS
homeCss = homeCss.replace(
  /\/\* Founder heading link[\s\S]*?\.founder-heading-link:focus-visible::after \{\s*transform: scaleX\(1\);\s*\}/,
  '/* Founder heading is a static h2 */'
);

// Dip tagline: upright sans, 400, clamp(0.9rem, 1vw, 1rem), 1.5, -0.01em, cream at 80%
const oldDipTagline = `.dip-card__tagline {
  font-family: var(--font-accent);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1rem, 1.2vw, 1.1rem);
  line-height: 1.4;
  color: rgba(247, 237, 232, 0.78);
  margin-top: 0.4rem;
  text-wrap: pretty;
  text-align: center;
  max-width: 100%;
}`;

const newDipTagline = `.dip-card__tagline {
  font-family: var(--font-sans);
  font-style: normal;
  font-weight: 400;
  font-size: clamp(0.9rem, 1vw, 1rem);
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: rgba(247, 237, 232, 0.8);
  margin-top: 0.4rem;
  text-wrap: pretty;
  text-align: center;
  max-width: 100%;
}`;

homeCss = homeCss.replace(oldDipTagline, newDipTagline);

// "Our Kitchens" heading: one color (charcoal) for both words, Kitchens in accent font, italic, but color inherit
const kitchensHeadingAccent = `\n.kitchens-section .section-heading .accent {
  color: inherit;
}\n`;

if (!homeCss.includes('.kitchens-section .section-heading .accent')) {
  homeCss = homeCss.replace(
    '.kitchens-section__heading-wrap {',
    `${kitchensHeadingAccent}.kitchens-section__heading-wrap {`
  );
}

// Enquiries grid & text styles
const oldEnquiriesCss = `.enquiries__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem clamp(2rem, 5vw, 6rem);
}

@media (min-width: 768px) {
  .enquiries__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.enquiries__col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
}

.enquiries__subheading {
  font-family: var(--font-accent);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1.75rem, 3vw, 2.4rem);
  color: var(--cream);
  line-height: 1.1;
}

.enquiries__text {
  max-width: 440px;
  width: 100%;
}

.enquiries-section .text-placeholder__line {
  background-color: rgba(247, 237, 232, 0.55);
}`;

const newEnquiriesCss = `.enquiries__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.25rem;
}

@media (min-width: 900px) {
  .enquiries__grid {
    grid-template-columns: 1fr 1fr;
    gap: clamp(3rem, 6vw, 6rem);
  }
}

.enquiries__col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.enquiries__p {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 1.0625rem;
  line-height: 1.7;
  color: rgba(247, 237, 232, 0.88);
  max-width: 52ch;
  margin-bottom: 1.25rem;
}

.enquiries__p:last-child {
  margin-bottom: 0;
}

.enquiries__actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.enquiries__action-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.enquiries__action-label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(247, 237, 232, 0.65);
}`;

homeCss = homeCss.replace(oldEnquiriesCss, newEnquiriesCss);

fs.writeFileSync('src/pages/HomePage.css', homeCss, 'utf8');
console.log('Updated src/pages/HomePage.css');

console.log('Stage 1 Part 2 completed successfully.');
