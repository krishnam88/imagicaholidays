import { useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import { useHotels } from '../services/api';
import { useLeadCapture } from '../hooks/useLeadCapture';
import ConfirmationModal from '../components/common/ConfirmationModal';
import LeadForm from '../components/common/LeadForm';

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i < count ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
      ))}
    </div>
  );
}

export default function Hotels() {
  const { data: hotels = [], isLoading } = useHotels();
  const { submit, isSubmitting, isSuccess, isDuplicate, reset } = useLeadCapture();
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-14 text-white text-center" style={{ backgroundColor: '#2F6F5E' }}>
        <h1 className="text-4xl font-bold mb-2">Our Hotel Partners</h1>
        <p className="text-white/80 text-lg">Carefully selected stays for a memorable experience</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <div key={i} className="bg-gray-200 rounded-2xl h-64 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative h-44 overflow-hidden">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-4">
                  <StarRating count={hotel.stars} />
                  <h3 className="font-bold text-gray-900 mt-1 mb-1 line-clamp-1">{hotel.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                    <MapPin className="h-3 w-3" /> {hotel.location}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {hotel.amenities.slice(0, 3).map((a) => (
                      <span key={a} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">{a}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold" style={{ color: '#2F6F5E' }}>₹{hotel.pricePerNight.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-gray-500">/night</span>
                    </div>
                    <button
                      onClick={() => setSelectedHotel(hotel)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
                      style={{ backgroundColor: '#2F6F5E' }}
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* General Enquiry Form */}
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hotel Enquiry</h2>
          <p className="text-gray-500 text-sm mb-6">Tell us your destination and dates – we'll find the best options for you.</p>
          <LeadForm
            onSubmit={(data) => submit({ ...data, message: selectedHotel ? `Interested in: ${selectedHotel.name}` : data.message })}
            isSubmitting={isSubmitting}
            showDestination
            showDate
            showTravelers
            submitLabel="Check Availability"
          />
        </div>
      </div>

      <ConfirmationModal isOpen={isSuccess || isDuplicate} isDuplicate={isDuplicate} onClose={() => { reset(); setSelectedHotel(null); }} />
    </div>
  );
}
