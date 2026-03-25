import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, Check, X, ChevronDown, ArrowLeft } from 'lucide-react';
import { useTour } from '../services/api';
import LeadForm from '../components/common/LeadForm';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { useLeadCapture } from '../hooks/useLeadCapture';

export default function TourDetail() {
  const { slug } = useParams();
  const { data: tour, isLoading, isError } = useTour(slug);
  const { submit, isSubmitting, isSuccess, isDuplicate, reset } = useLeadCapture();
  const [openDay, setOpenDay] = useState(null);

  const handleSubmit = (data) => submit({ ...data, tourSlug: slug });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-gray-200" style={{ borderTopColor: '#2F6F5E' }} />
      </div>
    );
  }

  if (isError || !tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600 text-lg">Tour not found.</p>
        <Link to="/tours" className="text-sm font-medium flex items-center gap-1" style={{ color: '#2F6F5E' }}>
          <ArrowLeft className="h-4 w-4" /> Back to Tours
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-72 sm:h-96">
        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
          <Link to="/tours" className="text-white/80 text-sm flex items-center gap-1 mb-3 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All Tours
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{tour.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{tour.duration}</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />{tour.destinations?.join(', ')}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full font-semibold">
              ₹{tour.price?.toLocaleString('en-IN')}/person
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Highlights */}
            {tour.highlights?.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tour Highlights</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tour.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#2F6F5E' }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Itinerary */}
            {tour.itinerary?.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Day-by-Day Itinerary</h2>
                <div className="space-y-2">
                  {tour.itinerary.map((day) => (
                    <div key={day.day} className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        className="w-full flex items-center justify-between px-5 py-4 text-left"
                        onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                      >
                        <span className="font-semibold text-sm text-gray-800">Day {day.day}: {day.title}</span>
                        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${openDay === day.day ? 'rotate-180' : ''}`} />
                      </button>
                      {openDay === day.day && (
                        <div className="px-5 pb-4 text-sm text-gray-600 border-t border-gray-100">
                          {day.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tour.inclusions?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-3">Inclusions</h3>
                  <ul className="space-y-2">
                    {tour.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tour.exclusions?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-3">Exclusions</h3>
                  <ul className="space-y-2">
                    {tour.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <X className="h-4 w-4 mt-0.5 shrink-0 text-red-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right: Booking Box */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-5">
                <p className="text-3xl font-bold" style={{ color: '#2F6F5E' }}>
                  ₹{tour.price?.toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-gray-500">per person (all inclusive)</p>
              </div>
              <h3 className="font-bold text-gray-900 mb-4">Book This Tour</h3>
              <LeadForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                showDate
                showTravelers
                submitLabel="Request Booking"
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal isOpen={isSuccess || isDuplicate} isDuplicate={isDuplicate} onClose={reset} />
    </div>
  );
}
