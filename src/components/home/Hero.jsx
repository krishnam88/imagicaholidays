import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      const loader = document.getElementById('site-loader');
      if (loader) {
        loader.classList.add('hidden');
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    return () => video.removeEventListener('canplay', handleCanPlay);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Video (desktop) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/hero-fallback.jpg"
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        aria-hidden="true"
      >
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Fallback image (mobile) */}
      <div
        className="absolute inset-0 md:hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/hero-fallback.jpg')" }}
        aria-hidden="true"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <p className="text-sm uppercase tracking-widest mb-3 opacity-90" style={{ color: '#a7d9cc' }}>
          Discover India with Imagica Holidays
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Unforgettable Journeys,<br />
          <span style={{ color: '#7ec8b8' }}>Priceless Memories</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Handcrafted holidays across India's most stunning destinations.
          Let us plan your perfect escape.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/tours"
            className="px-8 py-3.5 rounded-xl text-base font-semibold text-white transition-transform hover:scale-105"
            style={{ backgroundColor: '#2F6F5E' }}
          >
            Explore Tours
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-xl text-base font-semibold bg-white/10 backdrop-blur text-white border border-white/30 transition-transform hover:scale-105"
          >
            Plan My Trip
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#search"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </a>
    </section>
  );
}
