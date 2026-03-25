/**
 * Contact page – Full contact form (Form 3) + contact info + Google Maps embed.
 *
 * Uses LeadForm component for submission and ConfirmationModal for success state.
 */

import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import LeadForm from '../components/common/LeadForm.jsx'

const CONTACT_INFO = [
  {
    icon: Phone,
    title: 'Phone / WhatsApp',
    lines: ['+91 99999 99999', '+91 88888 88888'],
    href: 'tel:+919999999999',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['info@imagicaholidays.com', 'bookings@imagicaholidays.com'],
    href: 'mailto:info@imagicaholidays.com',
  },
  {
    icon: MapPin,
    title: 'Office Address',
    lines: ['123, Travel Street,', 'Mumbai – 400001, India'],
    href: 'https://maps.google.com',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    lines: ['Mon–Sat: 10 AM – 7 PM', 'Sun: 11 AM – 4 PM'],
    href: null,
  },
]

export default function Contact() {
  return (
    <>
      <Navbar />

      {/* Page header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-white/80">We'd love to help you plan your next adventure</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Left: Contact form ── */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Send Us an Enquiry</h2>
            <p className="text-sm text-gray-500 mb-6">
              Fill in the form below and our team will get back to you within 24 hours.
            </p>
            <LeadForm source="contact-page" />
          </div>

          {/* ── Right: Info + Map ── */}
          <div className="space-y-8">
            {/* Contact info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONTACT_INFO.map((info) => {
                const ContactIcon = info.icon
                return (
                  <div key={info.title} className="bg-gray-50 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <ContactIcon size={17} className="text-primary" />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900">{info.title}</h3>
                    </div>
                    {info.lines.map((line) =>
                      info.href ? (
                        <a
                          key={line}
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="block text-sm text-gray-600 hover:text-primary transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-sm text-gray-600">{line}</p>
                      ),
                    )}
                  </div>
                )
              })}
            </div>

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-64">
              <iframe
                title="Imagica Holidays Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.9498658!2d72.7410911!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
