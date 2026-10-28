// MenuViewer.jsx — Menu stack teaser and full-screen menu viewer modal.
// Displays in the center column of the MediaRow card on Umami and Bedre’s Kitchen pages.
// Features FLIP shared-element expansion, touch zoom, page counter, PDF download, and full a11y.

import { useState, useRef, useEffect, useCallback, useId } from 'react'
import { createPortal } from 'react-dom'
import siteConfig from '../../data/siteConfig.js'
import ImagePlaceholder from '../ImagePlaceholder.jsx'
import useReveal from '../../hooks/useReveal.js'
import './MenuViewer.css'

// Single active viewer tracker across instances
let currentActiveViewerId = null

function ViewerPageItem({
  pageNumber,
  pageCount,
  src,
  alt,
  scrollRootRef,
  isZoomed,
  onToggleZoom,
}) {
  const isCover = pageNumber === 1
  const revealRef = useReveal(
    isCover ? undefined : { root: scrollRootRef, threshold: [0, 0.15], rootMargin: '0px 0px -5% 0px' }
  )
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div
      ref={isCover ? null : revealRef}
      className={`menu-viewer__page-item ${
        isCover ? 'menu-viewer__page-item--cover' : 'menu-viewer__page-item--subsequent reveal'
      }`}
      data-page-index={pageNumber}
    >
      <div
        className={`menu-viewer__page-wrap ${isZoomed ? 'is-zoomed' : ''}`}
        onClick={() => onToggleZoom(pageNumber)}
      >
        {imgFailed ? (
          <div className="menu-viewer__page-placeholder">
            <ImagePlaceholder
              label={`Menu page ${pageNumber}`}
              aspectRatio="141.4%"
              className="menu-viewer__placeholder-box"
            />
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            width={1500}
            height={2122}
            loading={isCover ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setImgFailed(true)}
            className="menu-viewer__page-img"
          />
        )}
      </div>
    </div>
  )
}

function MenuViewer({ menu = siteConfig.menus?.umami || {} }) {
  const instanceId = useId()
  const [isOpen, setIsOpen] = useState(false)
  const [isBackdropActive, setIsBackdropActive] = useState(false)
  const [isContentVisible, setIsContentVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [zoomedPage, setZoomedPage] = useState(null)

  const teaserBtnRef = useRef(null)
  const frontPageRef = useRef(null)
  const panelRef = useRef(null)
  const scrollAreaRef = useRef(null)
  const closeBtnRef = useRef(null)
  const initialRectRef = useRef(null)
  const isAnimatingRef = useRef(false)
  const preloadedRef = useRef(false)

  const viewHint = siteConfig.menus?.viewHint || siteConfig.viewHint || 'View menu'
  const downloadText = siteConfig.menus?.downloadText || siteConfig.downloadText || 'Download PDF'
  const closeLabel = siteConfig.menus?.closeLabel || siteConfig.closeLabel || 'Close menu'

  const pageCount = menu.pageCount || 6
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

  // Preload pages 1 & 2 on hover or focus of teaser
  const handlePreload = useCallback(() => {
    if (preloadedRef.current) return
    preloadedRef.current = true
    const p1 = new Image()
    p1.src = `${menu.pagesBase}1.${menu.ext}`
    if (pageCount >= 2) {
      const p2 = new Image()
      p2.src = `${menu.pagesBase}2.${menu.ext}`
    }
  }, [menu, pageCount])

  // Open viewer with FLIP animation
  const handleOpen = () => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true

    // Close any other open viewer
    if (currentActiveViewerId && currentActiveViewerId !== instanceId) {
      window.dispatchEvent(new CustomEvent('close-all-menu-viewers'))
    }
    currentActiveViewerId = instanceId

    const frontEl = frontPageRef.current
    if (!frontEl) {
      isAnimatingRef.current = false
      return
    }

    initialRectRef.current = frontEl.getBoundingClientRect()
    frontEl.style.visibility = 'hidden'

    setIsOpen(true)
    setCurrentPage(1)
    setZoomedPage(null)
  }

  // Close viewer with reverse FLIP
  const handleClose = useCallback(() => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true

    currentActiveViewerId = null
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setIsBackdropActive(false)
      setIsContentVisible(false)
      if (panelRef.current) {
        panelRef.current.style.transition = 'opacity 150ms ease'
        panelRef.current.style.opacity = '0'
      }
      setTimeout(() => {
        const btn = teaserBtnRef.current
        setIsOpen(false)
        if (frontPageRef.current) frontPageRef.current.style.visibility = ''
        isAnimatingRef.current = false
        requestAnimationFrame(() => {
          btn?.focus()
        })
      }, 150)
      return
    }

    // 1. Content (header and subsequent pages) fades out in 150ms
    setIsContentVisible(false)

    setTimeout(() => {
      // 2. Measure current front-page rect and animate panel back over 450ms
      const frontEl = frontPageRef.current
      const panel = panelRef.current

      if (frontEl && panel) {
        const frontRect = frontEl.getBoundingClientRect()
        const panelRect = panel.getBoundingClientRect()
        const dx = frontRect.left - panelRect.left
        const dy = frontRect.top - panelRect.top
        const sx = frontRect.width / panelRect.width
        const sy = frontRect.height / panelRect.height

        panel.style.transformOrigin = 'top left'
        panel.style.transition = 'transform 450ms cubic-bezier(0.65, 0, 0.35, 1)'
        panel.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`
      }

      setIsBackdropActive(false)

      // 3. After 450ms, viewer unmounts and teaser front page is visible again
      setTimeout(() => {
        const btn = teaserBtnRef.current
        setIsOpen(false)
        if (frontPageRef.current) frontPageRef.current.style.visibility = ''
        isAnimatingRef.current = false
        requestAnimationFrame(() => {
          btn?.focus()
        })
      }, 450)
    }, 150)
  }, [])

  // Listen for external close requests to ensure only one viewer is open
  useEffect(() => {
    const handleExternalClose = () => {
      if (isOpen) {
        handleClose()
      }
    }
    window.addEventListener('close-all-menu-viewers', handleExternalClose)
    return () => window.removeEventListener('close-all-menu-viewers', handleExternalClose)
  }, [isOpen, handleClose])

  // FLIP animation mount effect
  useEffect(() => {
    if (!isOpen) return

    const panel = panelRef.current
    if (!panel) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      panel.style.transform = 'none'
      panel.style.opacity = '0'
      requestAnimationFrame(() => {
        panel.style.transition = 'opacity 150ms ease'
        panel.style.opacity = '1'
        setIsBackdropActive(true)
        setIsContentVisible(true)
      })
      const t = setTimeout(() => {
        isAnimatingRef.current = false
        closeBtnRef.current?.focus()
      }, 150)
      return () => clearTimeout(t)
    }

    const rect = initialRectRef.current
    if (!rect) return

    const panelRect = panel.getBoundingClientRect()
    const dx = rect.left - panelRect.left
    const dy = rect.top - panelRect.top
    const sx = rect.width / panelRect.width
    const sy = rect.height / panelRect.height

    panel.style.transformOrigin = 'top left'
    panel.style.transition = 'none'
    panel.style.transform = `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.transition = 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1)'
        panel.style.transform = 'none'
        setIsBackdropActive(true)
      })
    })

    const contentTimer = setTimeout(() => {
      setIsContentVisible(true)
    }, 250)

    const finishTimer = setTimeout(() => {
      isAnimatingRef.current = false
      closeBtnRef.current?.focus()
    }, 650)

    return () => {
      clearTimeout(contentTimer)
      clearTimeout(finishTimer)
    }
  }, [isOpen])

  // Scroll lock, inert background, and layout shift prevention
  useEffect(() => {
    if (!isOpen) return

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = document.body.style.overflow
    const prevPaddingRight = document.body.style.paddingRight

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const topnav = document.querySelector('.topnav')
    const prevTopnavPadding = topnav ? topnav.style.paddingRight : ''
    if (topnav && scrollbarWidth > 0) {
      topnav.style.paddingRight = `${scrollbarWidth}px`
    }

    const appRoot = document.getElementById('root')
    if (appRoot) {
      appRoot.setAttribute('inert', '')
      appRoot.setAttribute('aria-hidden', 'true')
    }

    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPaddingRight
      if (topnav) {
        topnav.style.paddingRight = prevTopnavPadding
      }
      if (appRoot) {
        appRoot.removeAttribute('inert')
        appRoot.removeAttribute('aria-hidden')
      }
    }
  }, [isOpen])

  // Keyboard navigation & Focus trap inside modal
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
        return
      }

      if (e.key === 'Tab') {
        const dialog = panelRef.current
        if (!dialog) return

        const focusables = dialog.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  // Page counter on scroll using requestAnimationFrame to throttle getBoundingClientRect
  const rafIdRef = useRef(null)

  const handleScroll = useCallback(() => {
    if (rafIdRef.current) return
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null
      const container = scrollAreaRef.current
      if (!container) return

      const cRect = container.getBoundingClientRect()
      const pageEls = container.querySelectorAll('[data-page-index]')
      let active = 1
      for (let i = 0; i < pageEls.length; i++) {
        const el = pageEls[i]
        const r = el.getBoundingClientRect()
        if (r.top <= cRect.top + cRect.height * 0.5) {
          active = parseInt(el.getAttribute('data-page-index'), 10)
        }
      }
      setCurrentPage((prev) => (prev === active ? prev : active))
    })
  }, [])

  // Direct native scroll listener
  useEffect(() => {
    if (!isOpen) return
    const el = scrollAreaRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [isOpen, handleScroll])

  const handleToggleZoom = (pageNum) => {
    const isTouch =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(any-pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0)
    if (isTouch) {
      setZoomedPage((prev) => (prev === pageNum ? null : pageNum))
    }
  }

  return (
    <div className="menu-teaser">
      {/* ─── STACK TEASER BUTTON ────────────────────────────────── */}
      <button
        ref={teaserBtnRef}
        type="button"
        className="menu-teaser__button"
        aria-label="Open menu"
        onClick={handleOpen}
        onMouseEnter={handlePreload}
        onFocus={handlePreload}
      >
        <div className="menu-teaser__stage">
          {/* Back 2 (Page 3) */}
          {pageCount >= 3 && (
            <div className="menu-teaser__page menu-teaser__page--back2">
              <ImagePlaceholder
                src={`${menu.pagesBase}3.${menu.ext}`}
                alt={`${menu.label} menu page 3`}
                label="Page 3"
                className="menu-teaser__placeholder"
              />
            </div>
          )}

          {/* Back 1 (Page 2) */}
          {pageCount >= 2 && (
            <div className="menu-teaser__page menu-teaser__page--back1">
              <ImagePlaceholder
                src={`${menu.pagesBase}2.${menu.ext}`}
                alt={`${menu.label} menu page 2`}
                label="Page 2"
                className="menu-teaser__placeholder"
              />
            </div>
          )}

          {/* Front (Page 1, the cover) */}
          <div ref={frontPageRef} className="menu-teaser__page menu-teaser__page--front">
            <ImagePlaceholder
              src={`${menu.pagesBase}1.${menu.ext}`}
              alt={`${menu.label} menu cover`}
              label="Menu cover"
              className="menu-teaser__placeholder"
            />
            <span className="menu-teaser__pill">{viewHint}</span>
          </div>
        </div>
      </button>

      {/* ─── MODAL VIEWER (PORTAL) ──────────────────────────────── */}
      {isOpen &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className={`menu-viewer__backdrop ${isBackdropActive ? 'is-active' : ''}`}
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Panel */}
            <div
              ref={panelRef}
              className="menu-viewer__panel"
              role="dialog"
              aria-modal="true"
              aria-label={`${menu.label} menu`}
            >
              {/* Header */}
              <header className={`menu-viewer__header ${isContentVisible ? 'is-visible' : ''}`}>
                <div className="menu-viewer__header-left">
                  <h2 className="menu-viewer__title">
                    {menu.label} {menu.title}
                  </h2>
                </div>

                <div className="menu-viewer__header-right">
                  <span className="menu-viewer__counter">
                    {currentPage} / {pageCount}
                  </span>

                  <a
                    href={menu.pdf}
                    download={menu.downloadName}
                    className="menu-viewer__download-btn"
                    aria-label={downloadText}
                  >
                    <svg
                      className="menu-viewer__download-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span className="menu-viewer__download-text">{downloadText}</span>
                  </a>

                  <button
                    ref={closeBtnRef}
                    type="button"
                    className="menu-viewer__close-btn"
                    onClick={handleClose}
                    aria-label={closeLabel}
                  >
                    <svg
                      className="menu-viewer__close-icon"
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
                </div>
              </header>

              {/* Scroll Area */}
              <div
                ref={scrollAreaRef}
                className="menu-viewer__scroll-area"
                onScroll={handleScroll}
              >
                {/* Page 1 (Cover) — always visible immediately */}
                <ViewerPageItem
                  pageNumber={1}
                  pageCount={pageCount}
                  src={`${menu.pagesBase}1.${menu.ext}`}
                  alt={`${menu.label} menu, page 1 of ${pageCount}`}
                  scrollRootRef={scrollAreaRef}
                  isZoomed={zoomedPage === 1}
                  onToggleZoom={handleToggleZoom}
                />

                {/* Subsequent pages (2..N) — fade in after 250ms & reveal on scroll */}
                {pageCount > 1 && (
                  <div
                    className={`menu-viewer__subsequent-wrap ${
                      isContentVisible ? 'is-visible' : ''
                    }`}
                  >
                    {pages.slice(1).map((n) => (
                      <ViewerPageItem
                        key={n}
                        pageNumber={n}
                        pageCount={pageCount}
                        src={`${menu.pagesBase}${n}.${menu.ext}`}
                        alt={`${menu.label} menu, page ${n} of ${pageCount}`}
                        scrollRootRef={scrollAreaRef}
                        isZoomed={zoomedPage === n}
                        onToggleZoom={handleToggleZoom}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  )
}

export default MenuViewer
