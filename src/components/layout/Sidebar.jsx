import { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, MapPin, Phone, MessageCircle } from 'lucide-react';

export default function Sidebar({ isOpen, onClose, links }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-xl transform transition-transform md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <MapPin className="h-5 w-5" style={{ color: '#2F6F5E' }} />
            <span className="font-bold text-lg" style={{ color: '#2F6F5E' }}>Imagica Holidays</span>
          </Link>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-900" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col px-4 py-6 gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
              style={({ isActive }) => isActive ? { backgroundColor: '#2F6F5E', color: '#fff' } : {}}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 inset-x-0 px-5 py-6 border-t space-y-3">
          <a
            href={`tel:+${waNumber}`}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium text-gray-700"
          >
            <Phone className="h-4 w-4" style={{ color: '#2F6F5E' }} />
            Call Us Now
          </a>
          <a
            href={`https://wa.me/${waNumber}?text=Hi! I'm interested in booking a tour.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-white"
            style={{ backgroundColor: '#2F6F5E' }}
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>
      </aside>
    </>
  );
}
