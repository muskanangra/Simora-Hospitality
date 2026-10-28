// VideoPlaceholder.jsx — 9:16 vertical video placeholder with inline SVG play icon.
// Accepts optional `src` prop: plays muted looping video while >=50% visible in viewport.

import { useRef, useEffect } from 'react'
import './VideoPlaceholder.css'

function VideoPlaceholder({
  label = 'Behind-the-scenes video',
  src,
  className = '',
}) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (!src || !videoRef.current) return
    const video = videoRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          video.play().catch(() => {
            // Autoplay could be blocked by browser policy
          })
        } else {
          video.pause()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(video)

    return () => observer.disconnect()
  }, [src])

  if (src) {
    return (
      <div
        className={`video-placeholder video-placeholder--with-video ${className}`}
        role="region"
        aria-label={label}
      >
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          className="video-placeholder__video"
          aria-label={label}
        />
      </div>
    )
  }

  return (
    <div
      className={`video-placeholder ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="video-placeholder__content">
        <div className="video-placeholder__play-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="video-placeholder__label">{label}</span>
      </div>
    </div>
  )
}

export default VideoPlaceholder
