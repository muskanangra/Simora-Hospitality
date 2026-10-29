// MediaRow.jsx — Menu section with stacked menu teaser flanked by synchronised videos.
import { useState, useRef, useEffect, useCallback } from "react"
import AutoVideo from "../AutoVideo.jsx"
import ImagePlaceholder from "../ImagePlaceholder.jsx"
import MenuViewer from "./MenuViewer.jsx"
import useReveal from "../../hooks/useReveal.js"
import "./MediaRow.css"

function MediaRow({
  menu,
  menuLabel = "Menu photo",
  video = menu?.video,
}) {
  const sectionRef = useRef(null)
  const leftVideoRef = useRef(null)
  const rightVideoRef = useRef(null)

  const leftCanPlayRef = useRef(false)
  const rightCanPlayRef = useRef(false)
  const isVisibleRef = useRef(false)
  const hasStartedTogetherRef = useRef(false)

  const [isPlayBlocked, setIsPlayBlocked] = useState(false)

  const menuRef = useReveal()

  // Desktop check (>= 900px)
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true
    return window.matchMedia("(min-width: 900px)").matches
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(min-width: 900px)")
    const handler = (e) => setIsDesktop(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Desktop: Start both videos only after both have fired canplay, setting currentTime = 0 on both and calling play() together
  const tryStartBoth = useCallback(() => {
    if (!isVisibleRef.current) return

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const vLeft = leftVideoRef.current
    const vRight = rightVideoRef.current

    if (isDesktop) {
      if (!vLeft || !vRight) return
      const leftReady = leftCanPlayRef.current || vLeft.readyState >= 3
      const rightReady = rightCanPlayRef.current || vRight.readyState >= 3

      if (leftReady && rightReady) {
        if (!hasStartedTogetherRef.current) {
          hasStartedTogetherRef.current = true
          vLeft.currentTime = 0
          vRight.currentTime = 0
          vLeft.muted = true
          vRight.muted = true
          vLeft.play().catch(() => {})
          vRight.play().catch(() => {})
        } else {
          if (vLeft.paused) {
            vLeft.muted = true
            vLeft.play().catch(() => {})
          }
          if (vRight.paused) {
            vRight.muted = true
            vRight.play().catch(() => {})
          }
        }
      }
    }
  }, [isDesktop])

  // Mobile: start single video immediately on viewport entry without waiting for canplay
  const tryStartMobile = useCallback(() => {
    if (!isVisibleRef.current) return

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return

    const vLeft = leftVideoRef.current
    if (!vLeft) return

    vLeft.muted = true
    const playPromise = vLeft.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlayBlocked(false)
        })
        .catch(() => {
          // Play was blocked (e.g. iOS Low Power Mode)
          setIsPlayBlocked(true)
        })
    }
  }, [])

  // Preload buffer observer: when within ~1 screen height of viewport, set preload="auto" to buffer
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const bufferObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const vLeft = leftVideoRef.current
          if (vLeft && vLeft.preload !== "auto") {
            vLeft.preload = "auto"
          }
          if (isDesktop) {
            const vRight = rightVideoRef.current
            if (vRight && vRight.preload !== "auto") {
              vRight.preload = "auto"
            }
          }
        }
      },
      { rootMargin: "100% 0px 100% 0px" }
    )

    bufferObserver.observe(el)
    return () => bufferObserver.disconnect()
  }, [isDesktop])

  // Viewport playback observer: play when visible (threshold 0.25), pause when not
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const vLeft = leftVideoRef.current
        const vRight = rightVideoRef.current

        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          isVisibleRef.current = true
          if (isDesktop) {
            tryStartBoth()
          } else {
            tryStartMobile()
          }
        } else {
          isVisibleRef.current = false
          if (vLeft) vLeft.pause()
          if (vRight) vRight.pause()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [isDesktop, tryStartBoth, tryStartMobile])

  // Trigger start check on mount / ready / resize
  useEffect(() => {
    if (isDesktop) {
      tryStartBoth()
    } else {
      if (isVisibleRef.current) {
        tryStartMobile()
      }
    }
  }, [isDesktop, tryStartBoth, tryStartMobile])

  // Desktop drift check: if two currentTime values differ by > 0.25s, resync right to left
  const handleLeftTimeUpdate = () => {
    if (!isDesktop) return
    const vLeft = leftVideoRef.current
    const vRight = rightVideoRef.current
    if (!vLeft || !vRight) return
    if (Math.abs(vLeft.currentTime - vRight.currentTime) > 0.25) {
      vRight.currentTime = vLeft.currentTime
    }
  }

  // Desktop loop: when left video ends, reset currentTime = 0 on both and call play() on both
  const handleLeftEnded = () => {
    if (!isDesktop) return
    const vLeft = leftVideoRef.current
    const vRight = rightVideoRef.current

    if (vLeft) {
      vLeft.currentTime = 0
      vLeft.muted = true
      vLeft.play().catch(() => {})
    }
    if (vRight) {
      vRight.currentTime = 0
      vRight.muted = true
      vRight.play().catch(() => {})
    }
  }

  const handleLeftCanPlay = () => {
    leftCanPlayRef.current = true
    if (isDesktop) {
      tryStartBoth()
    }
  }

  const handleRightCanPlay = () => {
    rightCanPlayRef.current = true
    if (isDesktop) {
      tryStartBoth()
    }
  }

  const handleMobilePlay = () => {
    setIsPlayBlocked(false)
  }

  const handleManualPlay = () => {
    const v = leftVideoRef.current
    if (!v) return
    v.muted = true
    const p = v.play()
    if (p !== undefined) {
      p.then(() => setIsPlayBlocked(false)).catch(() => {})
    }
  }

  const videoSrc = video?.src
  const videoPoster = video?.poster

  return (
    <section ref={sectionRef} className="kitchen-media-section" aria-label="Menu and Videos">
      <div className="kitchen-media-card">
        <div className="media-row">
          {/* LEFT: Video 1 (desktop 1st column, mobile above menu stack) — no arrival animation */}
          <div className="media-row__item media-row__video media-row__video--1">
            <AutoVideo
              src={videoSrc}
              poster={videoPoster}
              loop={!isDesktop}
              controlled
              videoRef={leftVideoRef}
              onCanPlay={isDesktop ? handleLeftCanPlay : undefined}
              onTimeUpdate={isDesktop ? handleLeftTimeUpdate : undefined}
              onEnded={isDesktop ? handleLeftEnded : undefined}
              onPlay={handleMobilePlay}
              label={menu?.label ? `${menu.label} video` : "Menu video"}
              className="media-row__auto-video"
            />
            {!isDesktop && isPlayBlocked && (
              <button
                type="button"
                className="media-row__play-btn"
                aria-label="Play video"
                onClick={handleManualPlay}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            )}
          </div>

          {/* CENTER: Menu stack teaser / photo (desktop center column, mobile below video 1) */}
          <div
            ref={menuRef}
            className="media-row__item media-row__menu reveal"
            style={{ "--delay": "120ms" }}
          >
            {menu ? (
              <MenuViewer menu={menu} />
            ) : (
              <ImagePlaceholder
                label={menuLabel}
                className="on-dark media-row__menu-img"
                aspectRatio="125%"
              />
            )}
          </div>

          {/* RIGHT: Video 2 (desktop 3rd column, NEVER mounted on phones < 900px) */}
          {isDesktop && (
            <div className="media-row__item media-row__video media-row__video--2">
              <AutoVideo
                src={videoSrc}
                poster={videoPoster}
                loop={false}
                controlled
                preload="metadata"
                videoRef={rightVideoRef}
                onCanPlay={handleRightCanPlay}
                label={menu?.label ? `${menu.label} video` : "Menu video"}
                className="media-row__auto-video"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default MediaRow
