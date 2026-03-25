/**
 * TourDetail page – Full details for a single tour package.
 *
 * Features:
 * - Hero image + tour highlights
 * - Itinerary accordion
 * - Sticky right-side Booking Box (Form 2) using LeadForm
 * - Inclusions / Exclusions list
 */

import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  MapPin, Clock, Star, CheckCircle2, XCircle, ChevronDown,
  ArrowLeft, Share2, Heart,
} from 'lucide-react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import LeadForm from '../components/common/LeadForm.jsx'
import { fetchTourById } from '../services/api.js'

// Fallback static tour detail used when API is unavailable
const STATIC_TOUR = {
  id: 'goa-beach',
  name: 'Goa Beach Getaway',
  location: 'Goa, India',
  duration: '4 Days / 3 Nights',
  price: 12999,
  rating: 4.7,
  reviewCount: 248,
  image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=85',
  gallery: [
    'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=600&q=80',
    'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=600&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  ],
  overview: `Experience the vibrant mix of sun, sand, and culture in Goa — India's beach paradise.
This curated 4-day package includes the best beaches, seafood, heritage churches, and
a sunset cruise. Whether you seek relaxation or adventure, Goa delivers.`,
  itinerary: [
    { day: 1, title: 'Arrival & North Goa Beaches', desc: 'Arrive at Goa airport. Transfer to hotel. Evening at Baga & Calangute beach. Welcome dinner at a beach-side shack.' },
    { day: 2, title: 'Heritage & South Goa', desc: 'Morning visit to Old Goa churches. Afternoon at Colva & Palolem beaches. Sunset at Cabo De Rama fort.' },
    { day: 3, title: 'Water Sports & Night Market', desc: 'Full-day water sports at Anjuna beach (parasailing, jet-ski included). Evening at Anjuna flea market & Tito\'s strip.' },
    { day: 4, title: 'Leisure & Departure', desc: 'Free morning. Optional Spice Plantation tour. Airport transfer. Tour ends.' },
  ],
  inclusions: [
    '3 nights hotel (3-star, AC double occupancy)',
    'Daily breakfast',
    'Airport transfers (pick-up & drop)',
    'AC transport throughout',
    'Water sports pass (Day 3)',
    'Dedicated tour guide',
  ],
  exclusions: [
    'Airfare / train tickets',
    'Lunch & dinner (except Day 1 welcome dinner)',
    'Personal expenses & tips',
    'Travel insurance',
  ],
}

function AccordionItem({ day, title, desc }) {
  const [open, setOpen] = useState(day === 1)
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
            {day}
          </span>
          <span className="text-sm font-medium text-gray-900">{title}</span>
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4">
          <p className="text-sm text-gray-500 leading-relaxed pl-10">{desc}</p>
        </div>
      )}
    </div>
  )
}

export default function TourDetail() {
  const { id } = useParams()

  const { data: tour } = useQuery({
    queryKey: ['tour', id],
    queryFn: () => fetchTourById(id),
    placeholderData: STATIC_TOUR,
    enabled: !!id,
  })

  const displayTour = tour || STATIC_TOUR

  return (
    <>
      <Navbar />

      {/* Hero image */}
      <div className="relative h-[55vh] min-h-[320px] pt-16 overflow-hidden">
        <img
          src={displayTour.image}
          alt={displayTour.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back link */}
        <Link
          to="/tours"
          className="absolute top-20 left-4 sm:left-8 flex items-center gap-1 text-white/80 text-sm hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> All Tours
        </Link>

        {/* Action buttons */}
        <div className="absolute top-20 right-4 sm:right-8 flex gap-2">
          {[Share2, Heart].map((Icon, i) => (
            <button
              key={i}
              type="button"
              className="p-2.5 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors backdrop-blur-sm"
            >
              <Icon size={16} />
            </button>
          ))}
        </div>

        {/* Tour title overlay */}
        <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8">
          <div className="flex items-center gap-1 text-white/80 text-sm mb-1">
            <MapPin size={13} /> <span>{displayTour.location}</span>
            <span className="ml-3 flex items-center gap-1 text-amber-400">
              <Star size={13} fill="currentColor" />
              <span>{displayTour.rating}</span>
              <span className="text-white/60">({displayTour.reviewCount} reviews)</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{displayTour.name}</h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Left content ── */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Quick stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-xl">
                <Clock size={16} className="text-primary" />
                <span className="text-sm font-medium text-gray-700">{displayTour.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-xl">
                <span className="text-sm font-medium text-gray-700">
                  ₹{displayTour.price.toLocaleString('en-IN')} / person
                </span>
              </div>
            </div>

            {/* Overview */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Overview</h2>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {displayTour.overview}
              </p>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">Day-by-Day Itinerary</h2>
              <div className="space-y-2">
                {displayTour.itinerary.map((item) => (
                  <AccordionItem key={item.day} {...item} />
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">Inclusions</h2>
                <ul className="space-y-2">
                  {displayTour.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">Exclusions</h2>
                <ul className="space-y-2">
                  {displayTour.exclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <XCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── Right: Sticky Booking Box (Form 2) ── */}
          <div className="w-full lg:w-80 shrink-0">
            <div className="sticky top-20 bg-white rounded-2xl border border-gray-200 shadow-lg p-5">
              <div className="mb-4">
                <p className="text-xs text-gray-400">Starts from</p>
                <p className="text-3xl font-extrabold text-primary">
                  ₹{displayTour.price.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-gray-400">per person</p>
              </div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Book this package →
              </p>
              <LeadForm
                source="tour-detail"
                tourName={displayTour.name}
                compact
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
