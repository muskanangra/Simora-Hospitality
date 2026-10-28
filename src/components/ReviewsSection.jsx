// ReviewsSection.jsx — "The People We Serve" section with sliding text review cards and ordering block.

import { useState, useRef, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import siteConfig from "../data/siteConfig.js"
import renderAccent from "../utils/renderAccent.jsx"
import Paragraphs from "./Paragraphs.jsx"
import useReveal from "../hooks/useReveal.js"
import "./ReviewsSection.css"

function ReviewsSection() {
  const {
    reviewsHeading,
    reviewsParagraphs = [],
    reviews = [],
    orderLinks = {},
    labels = {},
  } = siteConfig

  const sectionRef = useRef(null)
  const revealRef = useReveal()
  const stripRef = useRef(null)
  const cardRefs = useRef([])
  const lastActiveCardRef = useRef(null)
  const closeBtnRef = useRef(null)

  const [activeModalIndex, setActiveModalIndex] = useState(null)
  const [imageErrors, setImageErrors] = useState({})
  const [isInView, setIsInView] = useState(true)
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(() => {
    if (typeof window === "undefined") return false
    return (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
  })

  // Detect touch or reduced-motion preference changes
  useEffect(() => {
    if (typeof window === "undefined") return
    const mqTouch = window.matchMedia("(pointer: coarse)")
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)")

    const update = () => {
      setIsTouchOrReduced(mqTouch.matches || mqReduce.matches)
    }

    mqTouch.addEventListener("change", update)
    mqReduce.addEventListener("change", update)
    return () => {
      mqTouch.removeEventListener("change", update)
      mqReduce.removeEventListener("change", update)
    }
  }, [])

  // IntersectionObserver: toggle animation-play-state when strip leaves viewport
  useEffect(() => {
    const el = stripRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }))
  }

  const handleOpen = (index) => {
    lastActiveCardRef.current = cardRefs.current[index]
    setActiveModalIndex(index)
  }

  const handleClose = useCallback(() => {
    setActiveModalIndex(null)
    if (lastActiveCardRef.current) {
      lastActiveCardRef.current.focus()
    }
  }, [])

  const goToPrev = useCallback((e) => {
    e?.stopPropagation()
    setActiveModalIndex((prev) =>
      prev === null ? null : (prev - 1 + reviews.length) % reviews.length
    )
  }, [reviews.length])

  const goToNext = useCallback((e) => {
    e?.stopPropagation()
    setActiveModalIndex((prev) =>
      prev === null ? null : (prev + 1) % reviews.length
    )
  }, [reviews.length])

  // Body scroll lock & keyboard controls while dialog is open
  useEffect(() => {
    if (activeModalIndex === null) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const timer = setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 50)

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault()
        handleClose()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        goToPrev()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeModalIndex, handleClose, goToPrev, goToNext])

  const isPaused = !isInView || activeModalIndex !== null
  const currentModalReview = activeModalIndex !== null ? reviews[activeModalIndex] : null

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="reviews-section"
      aria-label="Customer Reviews"
    >
      <div ref={revealRef} className="reviews-wrapper reveal">
        {/* ─── 2. HEADER: Pill above row, two-column row from 900px, stacked below ─── */}
        <div className="reviews-header container">
          {/* Pill on its own line above the row, at the left content edge */}
          <div className="reviews-header__pill">
            <span className="section-label">{labels.reviews || "OUR GUESTS"}</span>
          </div>

          {/* Two-column row (from 900px) */}
          <div className="reviews-header__row">
            <div className="reviews-header__left">
              <h2 className="reviews-heading section-heading">
                {renderAccent(reviewsHeading || "The People We *Serve*")}
              </h2>
            </div>
            <div className="reviews-header__right">
              <div className="reviews-header__paragraphs">
                <Paragraphs items={reviewsParagraphs} />
              </div>
            </div>
          </div>
        </div>

        {/* ─── 3. STRIP: Edge-to-edge sliding text review cards ─── */}
        <div
          ref={stripRef}
          className={`review-strip ${isPaused ? "is-paused" : ""}`}
          style={{ "--count": reviews.length }}
        >
          <div className="review-track">
            {/* First copy */}
            {reviews.map((rev, idx) => (
              <button
                key={`rev-1-${idx}`}
                ref={(el) => (cardRefs.current[idx] = el)}
                type="button"
                className="review-card"
                onClick={() => handleOpen(idx)}
                aria-label={rev.alt || `Zomato review of ${rev.kitchen} by ${rev.name}`}
              >
                {/* Top row: reviewer name & 5 stars */}
                <div className="review-card__top">
                  <span className="review-card__name">{rev.name}</span>
                  <span className="review-card__stars" aria-hidden="true">★★★★★</span>
                </div>

                {/* Review text: 5 lines clamped */}
                <p className="review-card__text">{rev.text}</p>

                {/* Bottom row: kitchen name & view original */}
                <div className="review-card__bottom">
                  <span className="review-card__meta">{rev.kitchen} · Zomato</span>
                  <span className="review-card__action">View original</span>
                </div>
              </button>
            ))}

            {/* Second copy (hidden on touch and reduced motion) */}
            {!isTouchOrReduced &&
              reviews.map((rev, idx) => (
                <button
                  key={`rev-2-${idx}`}
                  type="button"
                  className="review-card review-card--clone"
                  onClick={() => handleOpen(idx)}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <div className="review-card__top">
                    <span className="review-card__name">{rev.name}</span>
                    <span className="review-card__stars" aria-hidden="true">★★★★★</span>
                  </div>

                  <p className="review-card__text">{rev.text}</p>

                  <div className="review-card__bottom">
                    <span className="review-card__meta">{rev.kitchen} · Zomato</span>
                    <span className="review-card__action">View original</span>
                  </div>
                </button>
              ))}
          </div>
        </div>

        {/* ─── 5. ORDERING BLOCK ─── */}
        <div className="reviews-order container">
          <div className="reviews-order__inner">
            <div className="reviews-order__left">
              <h3 className="reviews-order__title">Order online</h3>
            </div>
            <div className="reviews-order__right">
              {/* Bedre’s Kitchen */}
              <div className="reviews-order__group">
                <span className="reviews-order__group-label">BEDRE’S KITCHEN</span>
                <div className="reviews-order__buttons">
                  <a
                    href={orderLinks?.bedres?.swiggy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="reviews-order__btn"
                  >
                    Order on Swiggy
                  </a>
                  <a
                    href={orderLinks?.bedres?.zomato}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="reviews-order__btn"
                  >
                    Order on Zomato
                  </a>
                </div>
              </div>

              {/* Umami */}
              <div className="reviews-order__group">
                <span className="reviews-order__group-label">UMAMI</span>
                <div className="reviews-order__buttons">
                  <a
                    href={orderLinks?.umami?.swiggy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="reviews-order__btn"
                  >
                    Order on Swiggy
                  </a>
                  <a
                    href={orderLinks?.umami?.zomato}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="reviews-order__btn"
                  >
                    Order on Zomato
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 4. CLICK TO ENLARGE: Modal Viewer (Portal) ─── */}
      {activeModalIndex !== null &&
        currentModalReview &&
        createPortal(
          <div
            className="review-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Zomato review of ${currentModalReview.kitchen} by ${currentModalReview.name}`}
          >
            {/* Backdrop */}
            <div
              className="review-dialog__backdrop"
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Dialog Content */}
            <div className="review-dialog__container" onClick={handleClose}>
              <div
                className="review-dialog__content"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="review-dialog__close-btn"
                  onClick={handleClose}
                  aria-label="Close review"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                {/* Left Arrow Button */}
                <button
                  type="button"
                  className="review-dialog__nav-btn review-dialog__nav-btn--prev"
                  onClick={goToPrev}
                  aria-label="Previous review"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Screenshot & Caption Wrap */}
                <div className="review-dialog__figure">
                  <div className="review-dialog__img-wrap">
                    {imageErrors[activeModalIndex] || !currentModalReview.image ? (
                      <div className="review-dialog__text-fallback">
                        <div className="review-dialog__fallback-header">
                          <span className="review-dialog__fallback-name">
                            {currentModalReview.name}
                          </span>
                          <span className="review-dialog__fallback-stars" aria-hidden="true">
                            ★★★★★
                          </span>
                        </div>
                        <p className="review-dialog__fallback-text">
                          “{currentModalReview.text}”
                        </p>
                      </div>
                    ) : (
                      <img
                        src={currentModalReview.image}
                        alt={currentModalReview.alt || "Review screenshot"}
                        loading="lazy"
                        decoding="async"
                        onError={() => handleImageError(activeModalIndex)}
                        className="review-dialog__img"
                      />
                    )}
                  </div>
                  <div className="review-dialog__caption">
                    {currentModalReview.kitchen} · Zomato
                  </div>
                </div>

                {/* Right Arrow Button */}
                <button
                  type="button"
                  className="review-dialog__nav-btn review-dialog__nav-btn--next"
                  onClick={goToNext}
                  aria-label="Next review"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}

export default ReviewsSection
