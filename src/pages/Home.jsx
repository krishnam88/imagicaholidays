/**
 * Home page – Landing page for Imagica Holidays.
 *
 * Sections:
 * 1. Hero (full-viewport video/image background) + SearchBox (Form 1)
 * 2. FeaturedTours – grid of popular packages
 * 3. Destinations – visual destination highlights
 * 4. Why Choose Us – trust-building section
 * 5. WhatsApp CTA banner
 */

import { Link } from 'react-router-dom'
import { Shield, Headphones, ThumbsUp, Award } from 'lucide-react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Hero from '../components/home/Hero.jsx'
import SearchBox from '../components/home/SearchBox.jsx'
import FeaturedTours from '../components/home/FeaturedTours.jsx'
import Destinations from '../components/home/Destinations.jsx'

const WHY_US = [
  {
    icon: Shield,
    title: 'Trusted Since 2010',
    desc: 'Over 10,000+ happy travellers have chosen Imagica Holidays for their dream vacations.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'Our travel experts are always available to assist you before, during, and after your trip.',
  },
  {
    icon: ThumbsUp,
    title: 'Best Price Guarantee',
    desc: "We match any lower price you find. You'll never overpay for your holiday with us.",
  },
  {
    icon: Award,
    title: 'Award-Winning Service',
    desc: "Recognised as one of India's top travel agencies for 3 consecutive years.",
  },
]

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999'

export default function Home() {
  return (
    <>
      <Navbar />

      {/* 1. Hero + Search Box */}
      <Hero>
        <SearchBox />
      </Hero>

      {/* 2. Featured Tours */}
      <FeaturedTours />

      {/* 3. Destinations */}
      <Destinations />

      {/* 4. Why Choose Us */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Why Imagica Holidays
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
              Travel with Confidence
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item) => {
              const ItemIcon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <ItemIcon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. WhatsApp CTA banner */}
      <section className="bg-primary py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Plan Your Dream Trip? 🌍
          </h2>
          <p className="text-white/80 mb-6 text-sm sm:text-base">
            Talk to our travel experts right now on WhatsApp. Instant responses, no waiting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              💬 Chat on WhatsApp
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Send Enquiry
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
