/**
 * Navbar – Primary navigation bar for Imagica Holidays.
 *
 * Features:
 * - Transparent on hero, solid on scroll (via IntersectionObserver)
 * - Mobile hamburger that opens the Sidebar drawer
 * - WhatsApp CTA button
 */

import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Phone, Menu } from 'lucide-react'
import Sidebar from './Sidebar.jsx'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/tours', label: 'Tours' },
  { to: '/hotels', label: 'Hotels' },
  { to: '/contact', label: 'Contact' },
]

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img
                src="/assets/logo.png"
                alt="Imagica Holidays"
                className="h-9 w-auto"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <span
                className={`font-bold text-lg leading-tight ${
                  scrolled ? 'text-primary' : 'text-white'
                }`}
              >
                Imagica Holidays
              </span>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary ${
                      scrolled
                        ? isActive
                          ? 'text-primary'
                          : 'text-gray-700'
                        : isActive
                        ? 'text-white underline underline-offset-4'
                        : 'text-white/90'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
              >
                <Phone size={15} />
                Book Now
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Open navigation menu"
              className={`md:hidden p-2 rounded-md ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Drawer */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  )
}
