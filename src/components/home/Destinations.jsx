import { Link } from 'react-router-dom';
import { DESTINATIONS } from '../../services/api';
import { ArrowRight } from 'lucide-react';

export default function Destinations() {
  return (
    <section className="py-16" style={{ backgroundColor: '#f0f7f4' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#2F6F5E' }}>
            Where Do You Want To Go?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Popular Destinations</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {DESTINATIONS.map((dest) => (
            <Link
              key={dest.id}
              to={`/tours?destination=${dest.name}`}
              className="group relative rounded-2xl overflow-hidden shadow-md aspect-[3/4] hover:shadow-xl transition-shadow"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-3">
                <p className="text-white font-bold text-sm">{dest.name}</p>
                <p className="text-white/70 text-xs">{dest.toursCount} Tours</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
