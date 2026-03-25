/**
 * Destinations – Popular destination highlights section for the Home page.
 * Showcases 6 top destinations as visual cards.
 */

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const DESTINATIONS = [
  {
    name: 'Goa',
    tagline: 'Sun, Sand & Serenity',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80',
    tours: 12,
  },
  {
    name: 'Kerala',
    tagline: 'God\'s Own Country',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&q=80',
    tours: 18,
  },
  {
    name: 'Rajasthan',
    tagline: 'Land of Kings',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=80',
    tours: 22,
  },
  {
    name: 'Himachal Pradesh',
    tagline: 'Mountains & Meadows',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    tours: 15,
  },
  {
    name: 'Andaman',
    tagline: 'Pristine Island Life',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80',
    tours: 9,
  },
  {
    name: 'Manali',
    tagline: 'Adventure Awaits',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400&q=80',
    tours: 14,
  },
]

export default function Destinations() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              Top Destinations
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
              Where Do You Want to Go?
            </h2>
          </div>
          <Link
            to="/tours"
            className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline shrink-0"
          >
            All Destinations <ArrowRight size={14} />
          </Link>
        </div>

        {/* Destination grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.name}
              to={`/tours?destination=${encodeURIComponent(dest.name)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <img
                src={dest.image}
                alt={dest.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <p className="font-bold text-sm leading-tight">{dest.name}</p>
                <p className="text-xs text-white/70">{dest.tours} tours</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
