// AutoVideo.jsx — Responsive video player that autoplays only when in viewport.
import { useState, useRef, useEffect } from 'react'
import ImagePlaceholder from './ImagePlaceholder.jsx'
import useReveal from '../hooks/useReveal.js'
import './AutoVideo.css'

export default function AutoVideo({
  src,
  poster,
  className = '',
  reveal = false,
  loop = true,
  preload = 'metadata',
  label = 'Video',
  videoRef: externalVideoRef,
  onEnded,
  onCanPlay,
  onTimeUpdate,
  controlled = false,
}) {
  const localVideoRef = useRef(null)
  const revealRef = useReveal()
  const [videoFailed, setVideoFailed] = useState(false)
  const [posterFailed, setPosterFailed] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  // Listen for prefers-reduced-motion changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Ref merger
  const setRef = (node) => {
    localVideoRef.current = node
    if (externalVideoRef) {
      if (typeof externalVideoRef === 'function') {
        externalVideoRef(node)
      } else {
        externalVideoRef.current = node
      }
    }
  }

  // IntersectionObserver: play when visible (threshold 0.25), pause when not
  // Skipped when controlled externally or when reduced motion is requested
  useEffect(() => {
    if (controlled || prefersReduced) return
    const video = localVideoRef.current
    if (!video || !src || videoFailed) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: [0, 0.25, 0.5] }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [controlled, prefersReduced, src, videoFailed])

  const handleVideoError = () => {
    setVideoFailed(true)
  }

  const handlePosterError = () => {
    setPosterFailed(true)
  }

  let content = null

  if (!videoFailed && src) {
    content = (
      <div className={`auto-video ${className}`.trim()}>
        <video
          ref={setRef}
          muted
          loop={loop}
          playsInline
          preload={preload}
          poster={poster}
          controls={prefersReduced}
          onEnded={onEnded}
          onCanPlay={onCanPlay}
          onTimeUpdate={onTimeUpdate}
          onError={handleVideoError}
          className="auto-video__video"
        >
          <source src={src} type="video/mp4" onError={handleVideoError} />
        </video>
      </div>
    )
  } else if (!posterFailed && poster) {
    content = (
      <div className={`auto-video auto-video--fallback ${className}`.trim()}>
        <img
          src={poster}
          alt={label}
          loading="lazy"
          decoding="async"
          onError={handlePosterError}
          className="auto-video__poster-fallback"
        />
      </div>
    )
  } else {
    content = <ImagePlaceholder label={label} className={className} />
  }

  if (reveal) {
    return (
      <div ref={revealRef} className="img-reveal-container">
        <div className="img-reveal-wrap">
          {content}
        </div>
      </div>
    )
  }

  return content
}
