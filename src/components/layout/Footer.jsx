import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';

export default function Footer() {
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#1a2e2a' }} className="text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5" style={{ color: '#2F6F5E' }} />
              <span className="text-white font-bold text-lg">Imagica Holidays</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted travel partner for curated holiday experiences across India and beyond.
            </p>
            <div className="flex gap-3">
              {[
                { href: '#', Icon: Instagram },
                { href: '#', Icon: Facebook },
                { href: '#', Icon: Youtube },
              ].map(({ href, Icon }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <Icon className="h-4 w-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[['/', 'Home'], ['/tours', 'Tours'], ['/hotels', 'Hotels'], ['/contact', 'Contact Us'], ['/payments', 'Pay Online']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2 text-sm">
              {['Goa', 'Kerala', 'Rajasthan', 'Himachal Pradesh', 'Andaman Islands', 'Uttarakhand'].map((dest) => (
                <li key={dest}>
                  <Link to={`/tours?destination=${dest}`} className="hover:text-white transition-colors">{dest}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#2F6F5E' }} />
                <span>123 Travel Lane, Mumbai, Maharashtra 400001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" style={{ color: '#2F6F5E' }} />
                <a href={`tel:+${waNumber}`} className="hover:text-white">+{waNumber}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" style={{ color: '#2F6F5E' }} />
                <a href="mailto:info@imagicaholidays.com" className="hover:text-white">info@imagicaholidays.com</a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${waNumber}?text=Hi! I want to book a holiday.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white text-xs font-medium mt-1"
                  style={{ backgroundColor: '#2F6F5E' }}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {year} Imagica Holidays. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-gray-300">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-gray-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
