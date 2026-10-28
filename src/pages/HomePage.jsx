// HomePage.jsx — The main informational page.
// Order of sections (0 to 9, followed by shared footer):
//   0. Framed Hero (id="top") — Maroon card
//   1. About Us (id="about") — Cream, 1 image
//   2. The Person Behind the Plate (id="founder") — Soft-black card, 1 image (real paragraphs)
//   3. Signature & Bestselling Dishes (id="dishes") — Cream, 5 images (real dishes)
//   4. What Makes Us Different (id="different") — Maroon card, 1 image (real paragraphs)
//   5. Inside the Experiment (id="experiment") — Cream, 1 image (real paragraphs)
//   6. From Our Kitchen to Yours (id="delivery") — Soft-black card
//   7. The People We Serve (id="reviews") — Cream, reviews stack
//   8. Our Kitchens (id="kitchens") — Cream, two circle links
//   9. Enquiries & Collaborations (id="enquiries") — Deep maroon, full-bleed (real buttons)
//  10. Company Details footer (id="contact") — Deep maroon directly continuing section 9

import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import siteConfig from '../data/siteConfig.js'
import renderAccent from '../utils/renderAccent.jsx'
import ImagePlaceholder from '../components/ImagePlaceholder.jsx'
import AutoVideo from '../components/AutoVideo.jsx'
import TextPlaceholder from '../components/TextPlaceholder.jsx'
import Paragraphs from '../components/Paragraphs.jsx'
import ReviewsSection from '../components/ReviewsSection.jsx'
import useReveal from '../hooks/useReveal.js'
import usePageMeta from '../hooks/usePageMeta.js'
import './HomePage.css'

// Helper: Split business name into animated letters for intro
function SplitLetters({ text }) {
  let charIndex = 0
  const words = text.split(' ')

  return (
    <>
      {words.map((word, wIdx) => {
        const letters = word.split('').map((char, cIdx) => {
          const delay = 200 + charIndex * 45
          charIndex++
          return (
            <span
              key={cIdx}
              className="letter"
              style={{ '--letter-delay': `${delay}ms` }}
            >
              {char}
            </span>
          )
        })

        if (wIdx < words.length - 1) {
          charIndex++
        }

        return (
          <span key={wIdx} className="hero__word-wrap">
            <span className="hero__word-inner">{letters}</span>
            {wIdx < words.length - 1 && <span className="hero__word-space">&nbsp;</span>}
          </span>
        )
      })}
    </>
  )
}

// Subcomponent for each dish card to ensure its own useReveal hook
function DishCard({ dish, index }) {
  const cardRef = useReveal()
  return (
    <div
      ref={cardRef}
      className="dish-card item-card reveal fan-card"
    >
      <ImagePlaceholder
        src={dish.image}
        alt={dish.name}
        label={`Dish image ${index + 1}`}
        aspectRatio="100%"
      />
      <p className="dish-card__name item-card__name">{dish.name}</p>
    </div>
  )
}

// Subcomponent for each dip card to ensure its own useReveal hook
function DipCard({ dip, index }) {
  const cardRef = useReveal()
  const delay = `${index * 120}ms`
  return (
    <div
      ref={cardRef}
      className="dip-card reveal"
      style={{ '--delay': delay }}
    >
      <ImagePlaceholder
        src={dip.image}
        alt={dip.name}
        label={`Dip image ${index + 1}`}
        aspectRatio="100%"
      />
      <p className="dip-card__name">{dip.name}</p>
      {dip.tagline && <p className="dip-card__tagline">{dip.tagline}</p>}
    </div>
  )
}

// Subcomponent for each kitchen circle link with image error fallback
function KitchenCircle({ kitchen, index, innerRef }) {
  const [hasError, setHasError] = useState(false)
  const { name, path, logo, alt } = kitchen

  const handleImageError = () => {
    console.warn(`Logo failed to load: ${logo}`)
    setHasError(true)
  }

  const showRealLogo = Boolean(logo && !hasError)
  const logoAlt = alt || (name.includes('Bedre') ? 'Bedre’s Kitchen logo' : 'Umami logo')

  return (
    <Link
      ref={innerRef}
      to={path}
      className="kitchen-circle reveal"
      style={{ '--delay': `${index * 150}ms` }}
      aria-label={`Visit ${name}`}
    >
      <div className="kitchen-circle__badge">
        {showRealLogo ? (
          <img
            src={logo}
            alt={logoAlt}
            loading="lazy"
            decoding="async"
            onError={handleImageError}
            className="kitchen-circle__img"
          />
        ) : (
          <div className="kitchen-circle__logo-placeholder">
            <span>[Logo]</span>
          </div>
        )}
      </div>
      <span className="kitchen-circle__name">{name}</span>
    </Link>
  )
}

// Component for Inside the Experiment photo with error fallback
function ExperimentPhoto() {
  const [hasError, setHasError] = useState(false)
  const revealRef = useReveal()

  return (
    <div ref={revealRef} className="img-reveal-container">
      <div className="img-reveal-wrap">
        {hasError ? (
          <ImagePlaceholder label="Experiment image" aspectRatio="calc(744 / 1205 * 100%)" />
        ) : (
          <div className="experiment-photo-box">
            <img
              src="/images/home/experiment.jpg"
              alt="Six gravies being tested in steel pans"
              loading="lazy"
              decoding="async"
              className="experiment-photo"
              onError={() => setHasError(true)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function HomePage() {
  usePageMeta(siteConfig.meta?.home)

  const {
    businessName,
    heroTagline,
    labels,
    aboutHeading,
    aboutParagraphs,
    founderHeading,
    founderParagraphs,
    founderImage,
    founderAlt,
    dishesHeading,
    differentHeading,
    differentParagraphs,
    experimentHeading,
    experimentParagraphs,
    deliveryHeading,
    dips,
    dipsLink,
    kitchensHeading,
    enquiriesHeading,
    enquiriesParagraphs,
    enquiriesSubheading,
    enquiriesBtnLabel,
    enquiriesBtnHref,
    collaborationsSubheading,
    collaborationsBtnLabel,
    collaborationsBtnHref,
    dishes,
    kitchens,
  } = siteConfig

  // Intro phases driver
  useEffect(() => {
    if (document.documentElement.dataset.intro === 'loading') {
      const t1 = setTimeout(() => {
        document.documentElement.dataset.intro = 'lifting'
      }, 1700)

      const t2 = setTimeout(() => {
        document.documentElement.dataset.intro = 'done'
      }, 2800)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [])

  // Hero replay observation refs
  const heroRef = useRef(null)
  const heroContentRef = useRef(null)

  useEffect(() => {
    const heroEl = heroRef.current
    const contentEl = heroContentRef.current
    if (!heroEl || !contentEl) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      return
    }

    let armed = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          armed = true
        } else if (entry.isIntersecting && entry.intersectionRatio >= 0.3 && armed) {
          armed = false
          contentEl.classList.remove('hero-replay')
          void contentEl.offsetWidth
          contentEl.classList.add('hero-replay')
        }
      },
      { threshold: [0, 0.3] }
    )

    observer.observe(heroEl)

    const handleAnimationEnd = (e) => {
      if (e.target.classList.contains('hero__tagline')) {
        contentEl.classList.remove('hero-replay')
      }
    }

    contentEl.addEventListener('animationend', handleAnimationEnd)

    return () => {
      observer.disconnect()
      contentEl.removeEventListener('animationend', handleAnimationEnd)
    }
  }, [])

  // Scroll reveals for section headings and content
  const aboutHeadingRef = useReveal()
  const aboutTextRef = useReveal()
  const founderHeadingRef = useReveal()
  const founderTextRef = useReveal()
  const dishesHeadingRef = useReveal()
  const diffHeadingRef = useReveal()
  const diffTextRef = useReveal()
  const expHeadingRef = useReveal()
  const expTextRef = useReveal()
  const deliveryRef = useReveal()
  const dipsLinkRef = useReveal()
  const kitchensHeadingRef = useReveal()
  const kitchen0Ref = useReveal()
  const kitchen1Ref = useReveal()
  const enquiriesHeadingRef = useReveal()
  const enquiriesCol1Ref = useReveal()
  const enquiriesCol2Ref = useReveal()

  return (
    <main>

      {/* ────────────────────────────────────────────────────────
          0. HERO: MAROON CARD (id="top", unchanged)
          Card shape clipped with inset(var(--nav-h) var(--frame-gap)...)
          Huge h1 business name + tagline in Instrument Serif.
      ──────────────────────────────────────────────────────── */}
      <section id="top" ref={heroRef} className="hero" aria-label="Hero">
        <div className="hero-card">
          {/* // Optional hero photo can be added later */}
        </div>

        <div ref={heroContentRef} className="hero-content">
          <h1 className="hero__name" aria-label={businessName}>
            <span aria-hidden="true">
              <SplitLetters text={businessName} />
            </span>
          </h1>
          <p className="hero__tagline">
            <span className="hero__tagline-line">Beyond Hospitality.</span>
            <span className="hero__tagline-line">Into Experience.</span>
          </p>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          1. ABOUT US: CREAM (id="about"), 1 image
          Text left, image right. Real paragraphs rendered.
      ──────────────────────────────────────────────────────── */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="two-col">

            {/* Left: label tag + heading + text paragraphs */}
            <div className="section__text-block">
              <div ref={aboutHeadingRef} className="reveal">
                <span className="section-label">{labels.about}</span>
                <h2 className="section-heading">
                  {renderAccent(aboutHeading)}
                </h2>
              </div>
              <div ref={aboutTextRef} className="reveal" style={{ '--delay': '150ms' }}>
                <Paragraphs items={aboutParagraphs} className="about-paragraphs" />
              </div>
            </div>

            {/* Right: kitchen / team photo with image reveal */}
            <div className="section__img-block">
              <ImagePlaceholder label="Kitchen / team photo" aspectRatio="75%" reveal />
            </div>

          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          2. THE PERSON BEHIND THE PLATE: SOFT BLACK CARD (id="founder"), 1 image
          Image left, text right on desktop. Text first on mobile.
          Heading links to /founder (no arrow). Real paragraphs rendered.
      ──────────────────────────────────────────────────────── */}
      <section id="founder" className="section founder-section">
        <div className="container">
          <div className="two-col two-col--img-first">

            {/* DOM Order: Text first for mobile; desktop order: -1 flips image to left */}
            <div className="section__text-block">
              <div ref={founderHeadingRef} className="reveal">
                <span className="section-label">{labels.founder}</span>
                <h2 className="section-heading">
                  {renderAccent(founderHeading)}
                </h2>
              </div>
              <div ref={founderTextRef} className="reveal" style={{ '--delay': '150ms' }}>
                <Paragraphs items={founderParagraphs} />
              </div>
            </div>

            {/* Image on left on desktop */}
            <div className="section__img-block">
              <ImagePlaceholder
                src={founderImage}
                alt={founderAlt || "Siddharth Bedre"}
                label="Founder photo"
                aspectRatio="125%"
                reveal
              />
            </div>

          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          3. SIGNATURE & BESTSELLING DISHES: CREAM (id="dishes"), 5 images
          Centered label tag and heading above the cards.
          5 dish cards with 3 top row, 2 centered bottom row on desktop.
      ──────────────────────────────────────────────────────── */}
      <section id="dishes" className="section dishes-section" aria-label="Signature & Bestselling Dishes">
        <div className="container">
          <div ref={dishesHeadingRef} className="dishes-section__heading-wrap reveal">
            <span className="section-label section-label--center">{labels.dishes}</span>
            <h2 className="section-heading section-heading--center">
              {renderAccent(dishesHeading)}
            </h2>
          </div>

          <div className="dishes-grid">
            {dishes.slice(0, 5).map((dish, index) => (
              <DishCard key={index} dish={dish} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          4. WHAT MAKES US DIFFERENT: MAROON CARD (id="different"), 1 image
          Image left, text right on desktop. Real paragraphs rendered.
      ──────────────────────────────────────────────────────── */}
      <section id="different" className="section different-section">
        <div className="container">
          <div className="two-col two-col--img-first">

            {/* Text block */}
            <div className="section__text-block">
              <div ref={diffHeadingRef} className="reveal">
                <span className="section-label">{labels.different}</span>
                <h2 className="section-heading">
                  {renderAccent(differentHeading)}
                </h2>
              </div>
              <div ref={diffTextRef} className="reveal" style={{ '--delay': '150ms' }}>
                <Paragraphs items={differentParagraphs} />
              </div>
            </div>

            {/* Image block (order: -1 on desktop) */}
            <div className="section__img-block">
              <AutoVideo
                src={siteConfig.videos?.different?.src}
                poster={siteConfig.videos?.different?.poster}
                label="Food images"
                className="different-video"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          5. INSIDE THE EXPERIMENT: CREAM (id="experiment"), 1 image
          Text left, image right (mirror of About). Real paragraphs rendered.
      ──────────────────────────────────────────────────────── */}
      <section id="experiment" className="section experiment-section">
        <div className="container">
          <div className="two-col">

            {/* Left: label tag + heading + text placeholder */}
            <div className="section__text-block">
              <div ref={expHeadingRef} className="reveal">
                <span className="section-label">{labels.experiment}</span>
                <h2 className="section-heading">
                  {renderAccent(experimentHeading)}
                </h2>
              </div>
              <div ref={expTextRef} className="reveal" style={{ '--delay': '150ms' }}>
                <Paragraphs items={experimentParagraphs} />
              </div>
            </div>

            {/* Right: Experiment image (4:3) with image reveal */}
            <div className="section__img-block">
              <ExperimentPhoto />
            </div>

          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          6. FROM OUR KITCHEN TO YOURS: SOFT BLACK CARD (id="delivery")
          Centered tag and heading, dips grid (4 cards) and shared recipe link.
      ──────────────────────────────────────────────────────── */}
      <section id="delivery" className="section delivery-section" aria-label="From our kitchen to yours">
        <div className="container">
          <div ref={deliveryRef} className="delivery-card reveal">
            <span className="section-label section-label--center">{labels.delivery}</span>
            <h2 className="section-heading section-heading--center">
              {renderAccent(deliveryHeading)}
            </h2>

            {/* Dips Grid: 4 equal columns from 900px, 2 columns below 900px */}
            {dips && dips.length > 0 && (
              <div className="dips-grid">
                {dips.map((dip, index) => (
                  <DipCard key={index} dip={dip} index={index} />
                ))}
              </div>
            )}

            {/* TODO: the Umami page will get a recipes section with id="recipes". Until then this link just opens the Umami page. */}
            {dipsLink && (
              <div
                ref={dipsLinkRef}
                className="dips-link-wrap reveal"
                style={{ '--delay': '500ms' }}
              >
                <Link to={dipsLink.to} className="dips-recipes-link">
                  <span className="dips-recipes-link__mouse">Click for recipes</span>
                  <span className="dips-recipes-link__touch">Tap for recipes</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          7. THE PEOPLE WE SERVE: CREAM (id="reviews")
          Pinned 3D stacked-card deck. (Reviews content kept as placeholders)
      ──────────────────────────────────────────────────────── */}
      <ReviewsSection />

      {/* ────────────────────────────────────────────────────────
          8. OUR KITCHENS: CREAM (id="kitchens")
          Centered heading + pill tag, two circle links with logo slot.
      ──────────────────────────────────────────────────────── */}
      <section id="kitchens" className="section kitchens-section" aria-label="Our kitchens">
        <div className="container">
          <div ref={kitchensHeadingRef} className="kitchens-section__heading-wrap reveal">
            <span className="section-label section-label--center">{labels.kitchens}</span>
            <h2 className="section-heading section-heading--center">
              {renderAccent(kitchensHeading || 'Our *Kitchens*')}
            </h2>
          </div>

          <div className="kitchens-circles">
            {kitchens.map((kitchen, index) => (
              <KitchenCircle
                key={kitchen.path}
                kitchen={kitchen}
                index={index}
                innerRef={index === 0 ? kitchen0Ref : kitchen1Ref}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          9. ENQUIRIES & COLLABORATIONS: DEEP MAROON, FULL-BLEED (id="enquiries")
          Label, heading, two columns (stacked on mobile).
          Buttons: Column 1 mailto, Column 2 WhatsApp chat.
      ──────────────────────────────────────────────────────── */}
      <section id="enquiries" className="enquiries-section" aria-label="Enquiries and Collaborations">
        <div className="container">
          <div ref={enquiriesHeadingRef} className="enquiries__header reveal">
            <span className="section-label">{labels.enquiries}</span>
            <h2 className="section-heading">
              {renderAccent(enquiriesHeading)}
            </h2>
          </div>

          <div className="enquiries__grid">
            {/* Column 1 (LEFT): All paragraphs (1, 2, and 3) */}
            <div ref={enquiriesCol1Ref} className="enquiries__col enquiries__col--left reveal" style={{ '--delay': '100ms' }}>
              <p className="enquiries__p">{enquiriesParagraphs?.[0]}</p>
              <p className="enquiries__p">{enquiriesParagraphs?.[1]}</p>
              <p className="enquiries__p">{enquiriesParagraphs?.[2]}</p>
            </div>

            {/* Column 2 (RIGHT): Contact buttons at the top */}
            <div ref={enquiriesCol2Ref} className="enquiries__col enquiries__col--right reveal" style={{ '--delay': '200ms' }}>
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
          </div>
        </div>
      </section>

    </main>
  )
}

export default HomePage
