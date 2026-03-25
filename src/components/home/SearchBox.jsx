import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import ConfirmationModal from '../common/ConfirmationModal';
import { useLeadCapture } from '../../hooks/useLeadCapture';

export default function SearchBox() {
  const { submit, isSubmitting, isSuccess, isDuplicate, reset } = useLeadCapture();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    destination: '',
    travelDate: '',
    travelers: '2',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    await submit(formData);
  };

  return (
    <section id="search" className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Plan Your Dream Holiday</h2>
          <p className="text-gray-500 mt-2">Tell us where you want to go and we'll create the perfect package.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Name */}
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Your Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                required
                placeholder="Full name"
                className="w-full pl-4 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': 'rgba(47,111,94,0.3)' }}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                required
                placeholder="10-digit mobile"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2"
              />
            </div>

            {/* Destination */}
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  type="text"
                  placeholder="Where to? (e.g. Goa)"
                  className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2"
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Travel Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  type="date"
                  className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2"
                />
              </div>
            </div>

            {/* Travelers */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Travelers</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 bg-white"
                >
                  {[1,2,3,4,5,6,7,8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                  ))}
                  <option value="10+">10+ (Group)</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold transition-opacity disabled:opacity-70"
                style={{ backgroundColor: '#2F6F5E' }}
              >
                <Search className="h-4 w-4" />
                {isSubmitting ? 'Sending...' : 'Get Free Quote'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isSuccess || isDuplicate}
        isDuplicate={isDuplicate}
        onClose={reset}
      />
    </section>
  );
}
