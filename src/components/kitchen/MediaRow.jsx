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

  // Start both videos only after both have fired canplay, setting currentTime = 0 on both and calling play() together
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
          vLeft.play().catch(() => {})
          vRight.play().catch(() => {})
        } else {
          if (vLeft.paused) vLeft.play().catch(() => {})
          if (vRight.paused) vRight.play().catch(() => {})
        }
      }
    } else {
      if (!vLeft) return
      const leftReady = leftCanPlayRef.current || vLeft.readyState >= 3
      if (leftReady) {
        if (!hasStartedTogetherRef.current) {
          hasStartedTogetherRef.current = true
          vLeft.currentTime = 0
        }
        if (vLeft.paused) vLeft.play().catch(() => {})
      }
    }
  }, [isDesktop])

  // Synchronised start when visible, pause when not
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const vLeft = leftVideoRef.current
        const vRight = rightVideoRef.current

        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          isVisibleRef.current = true
          tryStartBoth()
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
  }, [tryStartBoth])

  // Trigger start check if ready
  useEffect(() => {
    tryStartBoth()
  }, [tryStartBoth])

  // On the left video's timeupdate event, if the two currentTime values differ by more than 0.25s, set the right video's currentTime to the left's
  const handleLeftTimeUpdate = () => {
    const vLeft = leftVideoRef.current
    const vRight = rightVideoRef.current
    if (!vLeft || !vRight) return
    if (Math.abs(vLeft.currentTime - vRight.currentTime) > 0.25) {
      vRight.currentTime = vLeft.currentTime
    }
  }

  // When left video ends, reset currentTime = 0 on both and call play() on both
  const handleLeftEnded = () => {
    const vLeft = leftVideoRef.current
    const vRight = rightVideoRef.current

    if (vLeft) {
      vLeft.currentTime = 0
      vLeft.play().catch(() => {})
    }
    if (vRight) {
      vRight.currentTime = 0
      vRight.play().catch(() => {})
    }
  }

  const handleLeftCanPlay = () => {
    leftCanPlayRef.current = true
    tryStartBoth()
  }

  const handleRightCanPlay = () => {
    rightCanPlayRef.current = true
    tryStartBoth()
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
              loop={false}
              controlled
              videoRef={leftVideoRef}
              onCanPlay={handleLeftCanPlay}
              onTimeUpdate={handleLeftTimeUpdate}
              onEnded={handleLeftEnded}
              label={menu?.label ? `${menu.label} video` : "Menu video"}
              className="media-row__auto-video"
            />
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

          {/* RIGHT: Video 2 (desktop 3rd column, hidden on < 900px) — no arrival animation */}
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
