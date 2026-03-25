import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Clock, MapPin, Search, Filter, ArrowRight } from 'lucide-react';
import { useTours } from '../services/api';

export default function Tours() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('destination') || '');
  const [priceFilter, setPriceFilter] = useState('all');
  const { data: tours = [], isLoading } = useTours();

  const filtered = tours.filter((t) => {
    const matchSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.destinations?.some((d) => d.toLowerCase().includes(search.toLowerCase()));

    const matchPrice =
      priceFilter === 'all' ||
      (priceFilter === 'budget' && t.price <= 15000) ||
      (priceFilter === 'mid' && t.price > 15000 && t.price <= 25000) ||
      (priceFilter === 'premium' && t.price > 25000);

    return matchSearch && matchPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="py-14 text-white text-center" style={{ backgroundColor: '#2F6F5E' }}>
        <h1 className="text-4xl font-bold mb-2">Our Tour Packages</h1>
        <p className="text-white/80 text-lg">Discover handcrafted holidays across India</p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destination or tour name..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2"
            >
              <option value="all">All Budgets</option>
              <option value="budget">Budget (Under ₹15,000)</option>
              <option value="mid">Mid Range (₹15,000–₹25,000)</option>
              <option value="premium">Premium (₹25,000+)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No tours found matching your criteria.</p>
            <button onClick={() => { setSearch(''); setPriceFilter('all'); }} className="mt-4 text-sm font-medium" style={{ color: '#2F6F5E' }}>Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tour) => (
              <div key={tour.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                <div className="relative h-52 overflow-hidden">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <span className="text-sm font-bold" style={{ color: '#2F6F5E' }}>₹{tour.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-gray-500">/person</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{tour.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{tour.duration}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{tour.destinations?.[0]}</span>
                  </div>
                  <Link to={`/tours/${tour.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: '#2F6F5E' }}>
                    View Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
