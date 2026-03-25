/**
 * Hero – Full-viewport hero section for the Home page.
 *
 * Features:
 * - Background video (desktop) / static image (mobile < 768px)
 * - Preloader integration: hides #site-loader once video can play
 * - Gradient overlay for text readability
 * - Headline + sub-headline CTA
 */

import { useEffect, useRef } from 'react'

export default function Hero({ children }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const hideSiteLoader = () => {
      const loader = document.getElementById('site-loader')
      if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden')
        loader.addEventListener('transitionend', () => loader.remove(), { once: true })
      }
    }

    video.addEventListener('canplay', hideSiteLoader, { once: true })
    // Fallback: hide loader after 3 s even if video hasn't loaded (slow network)
    const fallbackTimer = setTimeout(hideSiteLoader, 3000)

    return () => {
      video.removeEventListener('canplay', hideSiteLoader)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center">
      {/* Desktop background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        src="/assets/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/hero-fallback.jpg"
        preload="auto"
      />

      {/* Mobile / fallback static image */}
      <div
        className="absolute inset-0 w-full h-full bg-center bg-cover md:hidden"
        style={{ backgroundImage: 'url(/assets/hero-fallback.jpg)' }}
        aria-hidden="true"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
        aria-hidden="true"
      />

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block bg-primary/90 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            ✈ Explore India &amp; Beyond
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            Your Perfect Holiday <br className="hidden sm:block" />
            <span className="text-primary-light">Starts Here</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 mb-8 max-w-xl">
            Discover curated tour packages, luxury hotels, and seamless holiday planning
            — all designed to give you memories that last a lifetime.
          </p>

          {/* Slot for SearchBox rendered by parent */}
          {children}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/60 text-xs">
        <span>Scroll to explore</span>
        <span className="w-0.5 h-8 bg-white/40 animate-pulse" />
      </div>
    </section>
  )
}
