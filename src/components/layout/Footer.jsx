/**
 * Footer – Site-wide footer with links, contact info and social media.
 */

import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Globe, Rss, Share2 } from 'lucide-react'

const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/tours', label: 'Tours & Packages' },
  { to: '/hotels', label: 'Hotels' },
  { to: '/contact', label: 'Contact Us' },
]

const POPULAR_TOURS = [
  { to: '/tours', label: 'Goa Beach Package' },
  { to: '/tours', label: 'Kerala Backwaters' },
  { to: '/tours', label: 'Rajasthan Heritage Tour' },
  { to: '/tours', label: 'Himachal Adventure' },
  { to: '/tours', label: 'Andaman Island Retreat' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/assets/logo.png"
                alt="Imagica Holidays"
                className="h-10 w-auto brightness-0 invert"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              <span className="font-bold text-white text-lg">Imagica Holidays</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-5">
              Crafting unforgettable travel experiences across India and beyond.
              Your dream vacation is our commitment.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full bg-gray-800 hover:bg-primary text-gray-400 hover:text-white transition-colors"
              >
                <Globe size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-gray-800 hover:bg-primary text-gray-400 hover:text-white transition-colors"
              >
                <Rss size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="p-2 rounded-full bg-gray-800 hover:bg-primary text-gray-400 hover:text-white transition-colors"
              >
                <Share2 size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Popular Tours
            </h3>
            <ul className="space-y-2">
              {POPULAR_TOURS.map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span className="text-gray-400">123, Travel Street, Mumbai – 400001, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-primary shrink-0" />
                <a href="tel:+919999999999" className="text-gray-400 hover:text-primary transition-colors">
                  +91 99999 99999
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:info@imagicaholidays.com" className="text-gray-400 hover:text-primary transition-colors">
                  info@imagicaholidays.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Imagica Holidays. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
