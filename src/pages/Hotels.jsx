/**
 * Hotels page – Browse hotel listings by destination.
 *
 * Features:
 * - Destination filter
 * - Hotel grid with static fallback data
 * - React Query integration with api.js
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { MapPin, Star, Wifi, Coffee, Car, ArrowRight, Search } from 'lucide-react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import { fetchHotels } from '../services/api.js'

// Static hotel data for pre-launch / offline use
const STATIC_HOTELS = [
  {
    id: 'grand-goa-beach',
    name: 'Grand Goa Beach Resort',
    location: 'North Goa',
    stars: 5,
    pricePerNight: 8500,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
    amenities: ['wifi', 'breakfast', 'parking'],
  },
  {
    id: 'backwater-kerala',
    name: 'Kerala Backwater Villa',
    location: 'Alleppey, Kerala',
    stars: 4,
    pricePerNight: 6200,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    amenities: ['wifi', 'breakfast'],
  },
  {
    id: 'jaipur-palace',
    name: 'Jaipur Heritage Palace Hotel',
    location: 'Jaipur, Rajasthan',
    stars: 5,
    pricePerNight: 12000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1599619351208-3e6c839d6828?w=600&q=80',
    amenities: ['wifi', 'breakfast', 'parking'],
  },
  {
    id: 'manali-pine',
    name: 'Manali Pine Valley Resort',
    location: 'Manali, Himachal Pradesh',
    stars: 4,
    pricePerNight: 5500,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
    amenities: ['wifi', 'breakfast', 'parking'],
  },
  {
    id: 'andaman-pearl',
    name: 'Andaman Pearl Beachside',
    location: 'Havelock Island, Andaman',
    stars: 4,
    pricePerNight: 9800,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
    amenities: ['wifi', 'breakfast'],
  },
  {
    id: 'munnar-tea',
    name: 'Munnar Tea Valley Retreat',
    location: 'Munnar, Kerala',
    stars: 3,
    pricePerNight: 3200,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=600&q=80',
    amenities: ['wifi', 'breakfast'],
  },
]

const AMENITY_ICONS = {
  wifi: { icon: Wifi, label: 'Free WiFi' },
  breakfast: { icon: Coffee, label: 'Breakfast' },
  parking: { icon: Car, label: 'Parking' },
}

function StarRating({ count }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={11}
          className={i < count ? 'text-amber-400' : 'text-gray-200'}
          fill={i < count ? 'currentColor' : 'currentColor'}
        />
      ))}
    </span>
  )
}

function HotelCard({ hotel }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
      <div className="relative overflow-hidden h-48">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <StarRating count={hotel.stars} />
          <span className="flex items-center gap-0.5 text-xs text-amber-500 font-medium">
            <Star size={11} fill="currentColor" /> {hotel.rating}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{hotel.name}</h3>
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
          <MapPin size={11} className="text-primary" /> {hotel.location}
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-2 mb-3">
          {hotel.amenities.map((a) => {
            const { icon: Icon, label } = AMENITY_ICONS[a] || {}
            return Icon ? (
              <span key={a} title={label} className="flex items-center gap-1 text-xs text-gray-400">
                <Icon size={11} className="text-primary" /> {label}
              </span>
            ) : null
          })}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400">From</span>
            <p className="text-primary font-bold text-base leading-none">
              ₹{hotel.pricePerNight.toLocaleString('en-IN')}
              <span className="text-xs text-gray-400 font-normal"> /night</span>
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            Enquire <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Hotels() {
  const [search, setSearch] = useState('')

  const { data: apiHotels } = useQuery({
    queryKey: ['hotels'],
    queryFn: () => fetchHotels(),
    placeholderData: STATIC_HOTELS,
  })

  const hotels = (apiHotels && apiHotels.length > 0) ? apiHotels : STATIC_HOTELS

  const filtered = hotels.filter(
    (h) =>
      !search ||
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <>
      <Navbar />

      {/* Page header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Hotels</h1>
          <p className="text-white/80">Find the perfect accommodation for your holiday</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative max-w-sm mb-8">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hotel or destination…"
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          {filtered.length} hotel{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Hotel grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-medium">No hotels found</p>
            <p className="text-sm mt-1">Try a different search term</p>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
