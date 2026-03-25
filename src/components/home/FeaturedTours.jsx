import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { useTours } from '../../services/api';

function TourCard({ tour }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
      <div className="relative h-52 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <span className="text-sm font-bold" style={{ color: '#2F6F5E' }}>
            ₹{tour.price.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-gray-500">/person</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">
          {tour.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {tour.duration}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {tour.destinations?.[0] || 'India'}
          </span>
        </div>
        <Link
          to={`/tours/${tour.slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
          style={{ color: '#2F6F5E' }}
        >
          View Details <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function FeaturedTours() {
  const { data: tours = [], isLoading } = useTours();
  const featured = tours.slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: '#2F6F5E' }}>
              Curated For You
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Featured Tours</h2>
          </div>
          <Link
            to="/tours"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold"
            style={{ color: '#2F6F5E' }}
          >
            View All Tours <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        )}

        <div className="text-center mt-10 sm:hidden">
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold"
            style={{ backgroundColor: '#2F6F5E' }}
          >
            View All Tours <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
