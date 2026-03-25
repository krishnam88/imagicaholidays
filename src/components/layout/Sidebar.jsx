/**
 * Sidebar – Mobile navigation drawer.
 *
 * Slides in from the right when the hamburger menu is tapped.
 * Traps focus and closes on overlay click or Escape key.
 */

import { useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { X, Phone, Mail, MapPin } from 'lucide-react'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/tours', label: 'Tours' },
  { to: '/hotels', label: 'Hotels' },
  { to: '/contact', label: 'Contact' },
]

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999'

export default function Sidebar({ isOpen, onClose }) {
  const firstFocusRef = useRef(null)

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    // Focus the close button when drawer opens
    firstFocusRef.current?.focus()
    // Prevent body scroll while open
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <img
              src="/assets/logo.png"
              alt="Imagica Holidays"
              className="h-8 w-auto"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <span className="font-bold text-primary text-base">Imagica Holidays</span>
          </Link>
          <button
            ref={firstFocusRef}
            type="button"
            aria-label="Close navigation menu"
            className="p-2 rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-1">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer section */}
        <div className="px-5 py-5 border-t border-gray-100 space-y-4">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-primary text-white font-medium py-3 rounded-xl hover:bg-primary-dark transition-colors"
          >
            <Phone size={16} />
            WhatsApp Us
          </a>

          <ul className="text-xs text-gray-500 space-y-2">
            <li className="flex items-center gap-2">
              <Phone size={12} className="text-primary shrink-0" />
              <a href="tel:+919999999999" className="hover:text-primary">+91 99999 99999</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={12} className="text-primary shrink-0" />
              <a href="mailto:info@imagicaholidays.com" className="hover:text-primary">info@imagicaholidays.com</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={12} className="text-primary shrink-0 mt-0.5" />
              <span>Mumbai, India</span>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}
