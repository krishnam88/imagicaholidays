/**
 * FeaturedTours – Grid of highlighted tour packages on the Home page.
 * Fetches data via React Query from the tours API (or static data as fallback).
 */

import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react'
import { fetchTours } from '../../services/api.js'

// Fallback static tours for offline / pre-launch usage
const STATIC_TOURS = [
  {
    id: 'goa-beach',
    name: 'Goa Beach Getaway',
    location: 'Goa',
    duration: '4 Days / 3 Nights',
    price: 12999,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80',
    tag: 'Best Seller',
  },
  {
    id: 'kerala-backwaters',
    name: 'Kerala Backwaters',
    location: 'Kerala',
    duration: '5 Days / 4 Nights',
    price: 18499,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=80',
    tag: 'Top Rated',
  },
  {
    id: 'rajasthan-heritage',
    name: 'Rajasthan Heritage Tour',
    location: 'Rajasthan',
    duration: '7 Days / 6 Nights',
    price: 24999,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80',
    tag: 'Popular',
  },
  {
    id: 'himachal-adventure',
    name: 'Himachal Adventure',
    location: 'Himachal Pradesh',
    duration: '6 Days / 5 Nights',
    price: 21999,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    tag: 'Adventure',
  },
  {
    id: 'andaman-retreat',
    name: 'Andaman Island Retreat',
    location: 'Andaman & Nicobar',
    duration: '5 Days / 4 Nights',
    price: 29999,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
    tag: 'Exotic',
  },
  {
    id: 'manali-honeymoon',
    name: 'Manali Honeymoon Package',
    location: 'Manali',
    duration: '4 Days / 3 Nights',
    price: 16999,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80',
    tag: 'Romantic',
  },
]

function TourCard({ tour }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
      {/* Image */}
      <div className="relative overflow-hidden h-48">
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

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
          <MapPin size={11} className="text-primary" />
          <span>{tour.location}</span>
          <span className="ml-auto flex items-center gap-0.5 text-amber-500 font-medium">
            <Star size={11} fill="currentColor" />
            {tour.rating}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2">
          {tour.name}
        </h3>

        <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
          <Clock size={11} />
          <span>{tour.duration}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400">Starts from</span>
            <p className="text-primary font-bold text-lg leading-none">
              ₹{tour.price.toLocaleString('en-IN')}
            </p>
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

export default function FeaturedTours() {
  const { data: tours } = useQuery({
    queryKey: ['featured-tours'],
    queryFn: () => fetchTours({ featured: true, limit: 6 }),
    placeholderData: STATIC_TOURS,
  })

  const displayTours = (tours && tours.length > 0) ? tours : STATIC_TOURS

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Explore India
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Featured Tour Packages
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
            Hand-picked packages for every type of traveller — beaches, hills, heritage, and adventure.
          </p>
        </div>

        {/* Tour grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-10">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors"
          >
            View All Packages
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
