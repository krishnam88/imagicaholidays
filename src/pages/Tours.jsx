/**
 * Tours page – Searchable, filterable listing of all tour packages.
 *
 * Features:
 * - Filter by destination (from URL search params)
 * - Responsive grid layout
 * - Uses React Query + api.js (falls back to static data)
 */

import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { MapPin, Clock, Star, Search, ArrowRight, Filter } from 'lucide-react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import { fetchTours } from '../services/api.js'

// Static tour data used when API is unavailable
const STATIC_TOURS = [
  { id: 'goa-beach', name: 'Goa Beach Getaway', location: 'Goa', duration: '4D/3N', price: 12999, rating: 4.7, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80', tag: 'Best Seller', category: 'Beach' },
  { id: 'kerala-backwaters', name: 'Kerala Backwaters', location: 'Kerala', duration: '5D/4N', price: 18499, rating: 4.9, image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80', tag: 'Top Rated', category: 'Nature' },
  { id: 'rajasthan-heritage', name: 'Rajasthan Heritage Tour', location: 'Rajasthan', duration: '7D/6N', price: 24999, rating: 4.8, image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80', tag: 'Popular', category: 'Heritage' },
  { id: 'himachal-adventure', name: 'Himachal Adventure', location: 'Himachal Pradesh', duration: '6D/5N', price: 21999, rating: 4.6, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', tag: 'Adventure', category: 'Adventure' },
  { id: 'andaman-retreat', name: 'Andaman Island Retreat', location: 'Andaman', duration: '5D/4N', price: 29999, rating: 4.9, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80', tag: 'Exotic', category: 'Beach' },
  { id: 'manali-honeymoon', name: 'Manali Honeymoon Package', location: 'Manali', duration: '4D/3N', price: 16999, rating: 4.7, image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80', tag: 'Romantic', category: 'Hill Station' },
  { id: 'ooty-nilgiris', name: 'Ooty & Nilgiris', location: 'Tamil Nadu', duration: '3D/2N', price: 9999, rating: 4.5, image: 'https://images.unsplash.com/photo-1597131628154-17cab64ea7e7?w=600&q=80', tag: 'Weekend Getaway', category: 'Hill Station' },
  { id: 'varanasi-spiritual', name: 'Varanasi Spiritual Tour', location: 'Uttar Pradesh', duration: '3D/2N', price: 8499, rating: 4.6, image: 'https://images.unsplash.com/photo-1561361058-c24e02aa1b3c?w=600&q=80', tag: 'Spiritual', category: 'Heritage' },
  { id: 'darjeeling-sikkim', name: 'Darjeeling & Sikkim', location: 'West Bengal', duration: '6D/5N', price: 19999, rating: 4.8, image: 'https://images.unsplash.com/photo-1570651440445-9a7de0ab41a1?w=600&q=80', tag: 'Scenic', category: 'Hill Station' },
]

const CATEGORIES = ['All', 'Beach', 'Hill Station', 'Heritage', 'Adventure', 'Nature']

function TourCard({ tour }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
      <div className="relative overflow-hidden h-52">
        <img
          src={tour.image}
          alt={tour.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {tour.tag && (
          <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {tour.tag}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
          <MapPin size={11} className="text-primary" />
          <span>{tour.location}</span>
          <span className="ml-auto flex items-center gap-0.5 text-amber-500 font-medium">
            <Star size={11} fill="currentColor" /> {tour.rating}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 text-sm mb-2">{tour.name}</h3>
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
          <Clock size={11} /> <span>{tour.duration}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400">Starts from</span>
            <p className="text-primary font-bold text-lg leading-none">₹{tour.price.toLocaleString('en-IN')}</p>
          </div>
          <Link
            to={`/tours/${tour.id}`}
            className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            View <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Tours() {
  const [searchParams] = useSearchParams()
  const initialDest = searchParams.get('destination') || ''
  const [search, setSearch] = useState(initialDest)
  const [activeCategory, setActiveCategory] = useState('All')

  const { data: apiTours } = useQuery({
    queryKey: ['tours'],
    queryFn: () => fetchTours(),
    placeholderData: STATIC_TOURS,
  })

  const tours = (apiTours && apiTours.length > 0) ? apiTours : STATIC_TOURS

  const filtered = tours.filter((t) => {
    const matchesSearch =
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      <Navbar />

      {/* Page header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Tour Packages</h1>
          <p className="text-white/80">Discover the perfect holiday for you and your family</p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search input */}
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destination or tour name…"
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Filter size={14} className="text-gray-400 shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 text-xs font-medium px-3 py-2 rounded-full transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          {filtered.length} package{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Tour grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-medium">No packages found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
