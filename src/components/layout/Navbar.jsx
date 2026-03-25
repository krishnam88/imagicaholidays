import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, MapPin, Phone } from 'lucide-react';
import Sidebar from './Sidebar';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/tours', label: 'Tours' },
  { to: '/hotels', label: 'Hotels' },
  { to: '/contact', label: 'Contact' },
  { to: '/payments', label: 'Pay Online' },
];

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <MapPin className="text-primary h-6 w-6" style={{ color: '#2F6F5E' }} />
              <span className="text-xl font-bold" style={{ color: '#2F6F5E' }}>
                Imagica <span className="text-gray-700">Holidays</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary font-semibold'
                        : 'text-gray-600 hover:text-primary'
                    }`
                  }
                  style={({ isActive }) => isActive ? { color: '#2F6F5E' } : {}}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href={`tel:+${import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999'}`}
                className="hidden sm:flex items-center gap-1 text-sm font-medium"
                style={{ color: '#2F6F5E' }}
              >
                <Phone className="h-4 w-4" />
                <span>Call Us</span>
              </a>
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: '#2F6F5E' }}
              >
                Book Now
              </Link>
              <button
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
