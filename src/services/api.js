import { useQuery } from '@tanstack/react-query';

const BASE_URL = import.meta.env.VITE_CRM_BASE_URL || '';

// ─── Static Fallback Data ──────────────────────────────────────────────────
export const STATIC_TOURS = [
  {
    id: 1,
    slug: 'goa-beach-getaway',
    title: 'Goa Beach Getaway',
    duration: '4 Days / 3 Nights',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80',
    destinations: ['Goa'],
    highlights: ['Baga Beach', 'Old Goa Churches', 'Dudhsagar Falls', 'Water Sports'],
    itinerary: [
      { day: 1, title: 'Arrival & Beach Evening', description: 'Arrive at Goa airport, check-in to hotel, evening at Baga Beach.' },
      { day: 2, title: 'North Goa Sightseeing', description: 'Visit Fort Aguada, Calangute Beach, Anjuna Flea Market.' },
      { day: 3, title: 'Dudhsagar Falls & Spice Farm', description: 'Full-day trip to Dudhsagar Falls and a spice plantation tour.' },
      { day: 4, title: 'Leisure & Departure', description: 'Morning leisure, shopping at local markets, departure.' },
    ],
    inclusions: ['Hotel stay (3★)', 'Breakfast daily', 'Airport transfers', 'Sightseeing as per itinerary'],
    exclusions: ['Flights', 'Lunch & Dinner', 'Personal expenses', 'Optional activities'],
  },
  {
    id: 2,
    slug: 'kerala-backwaters',
    title: 'Kerala Backwaters Bliss',
    duration: '5 Days / 4 Nights',
    price: 18499,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
    destinations: ['Kochi', 'Alleppey', 'Munnar'],
    highlights: ['Houseboat Stay', 'Tea Gardens', 'Kathakali Show', 'Spice Plantations'],
    itinerary: [
      { day: 1, title: 'Kochi Arrival', description: 'Arrive Kochi, check-in, evening Fort Kochi walk.' },
      { day: 2, title: 'Kochi to Munnar', description: 'Drive to Munnar, visit tea gardens and Mattupetty Dam.' },
      { day: 3, title: 'Munnar Exploration', description: 'Eravikulam National Park, tea museum, local markets.' },
      { day: 4, title: 'Alleppey Houseboat', description: 'Drive to Alleppey, board houseboat, backwater cruise.' },
      { day: 5, title: 'Return & Departure', description: 'Morning check-out from houseboat, drive to Kochi airport.' },
    ],
    inclusions: ['4★ Hotel + Houseboat', 'All meals on houseboat', 'Airport transfers', 'AC vehicle'],
    exclusions: ['Flights', 'Entry fees', 'Personal expenses'],
  },
  {
    id: 3,
    slug: 'rajasthan-royal-trail',
    title: 'Rajasthan Royal Trail',
    duration: '7 Days / 6 Nights',
    price: 24999,
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80',
    destinations: ['Jaipur', 'Jodhpur', 'Udaipur'],
    highlights: ['Amber Fort', 'Mehrangarh Fort', 'Lake Pichola', 'Desert Safari'],
    itinerary: [
      { day: 1, title: 'Jaipur Arrival', description: 'Arrive Jaipur, check-in, evening City Palace visit.' },
      { day: 2, title: 'Jaipur Sightseeing', description: 'Amber Fort, Hawa Mahal, Jantar Mantar.' },
      { day: 3, title: 'Jaipur to Jodhpur', description: 'Drive to Jodhpur, visit Mehrangarh Fort.' },
      { day: 4, title: 'Jodhpur & Onward', description: 'Jaswant Thada, Umaid Bhawan, drive to Udaipur.' },
      { day: 5, title: 'Udaipur Lake City', description: 'Lake Pichola boat ride, City Palace, Saheliyon Ki Bari.' },
      { day: 6, title: 'Udaipur Leisure', description: 'Morning at leisure, shopping at local bazaars.' },
      { day: 7, title: 'Departure', description: 'Transfer to Udaipur airport/railway station.' },
    ],
    inclusions: ['Heritage hotels', 'Breakfast daily', 'AC vehicle', 'Expert guide'],
    exclusions: ['Flights', 'Lunch & Dinner', 'Camera fees', 'Personal expenses'],
  },
  {
    id: 4,
    slug: 'manali-adventure',
    title: 'Manali Adventure Escape',
    duration: '6 Days / 5 Nights',
    price: 16999,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    destinations: ['Delhi', 'Manali', 'Rohtang Pass'],
    highlights: ['Rohtang Pass Snow', 'Solang Valley', 'River Rafting', 'Hadimba Temple'],
    itinerary: [
      { day: 1, title: 'Delhi to Manali (Overnight Bus)', description: 'Board overnight Volvo bus from Delhi to Manali.' },
      { day: 2, title: 'Manali Arrival & Local', description: 'Arrive Manali, check-in, visit Hadimba Temple, Mall Road.' },
      { day: 3, title: 'Solang Valley', description: 'Full day at Solang Valley, snow activities, zorbing.' },
      { day: 4, title: 'Rohtang Pass', description: 'Day trip to Rohtang Pass (subject to permit), snow play.' },
      { day: 5, title: 'River Rafting & Leisure', description: 'Beas River rafting, Old Manali cafes, leisure.' },
      { day: 6, title: 'Return Journey', description: 'Board overnight bus back to Delhi.' },
    ],
    inclusions: ['Volvo bus both ways', 'Hotel (4 nights)', 'Breakfast & Dinner', 'Rohtang permit'],
    exclusions: ['Snow activity charges', 'Personal expenses', 'Rafting charges'],
  },
  {
    id: 5,
    slug: 'andaman-island-paradise',
    title: 'Andaman Island Paradise',
    duration: '6 Days / 5 Nights',
    price: 29999,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
    destinations: ['Port Blair', 'Havelock Island', 'Neil Island'],
    highlights: ['Radhanagar Beach', 'Cellular Jail', 'Scuba Diving', 'Glass Bottom Boat'],
    itinerary: [
      { day: 1, title: 'Port Blair Arrival', description: 'Arrive Port Blair, Cellular Jail light & sound show.' },
      { day: 2, title: 'Port Blair to Havelock', description: 'Ferry to Havelock Island, Radhanagar Beach sunset.' },
      { day: 3, title: 'Havelock Water Activities', description: 'Scuba diving or snorkeling at Elephant Beach.' },
      { day: 4, title: 'Neil Island Day Trip', description: 'Ferry to Neil Island, Laxmanpur Beach, natural bridge.' },
      { day: 5, title: 'Return to Port Blair', description: 'Ferry back, shopping at Aberdeen Bazaar.' },
      { day: 6, title: 'Departure', description: 'Transfer to airport for departure flight.' },
    ],
    inclusions: ['Resort stay', 'All ferry tickets', 'Breakfast daily', 'Airport transfers'],
    exclusions: ['Flights', 'Scuba/snorkeling charges', 'Entry permits', 'Meals other than breakfast'],
  },
  {
    id: 6,
    slug: 'shimla-manali-combo',
    title: 'Shimla–Manali Combo',
    duration: '8 Days / 7 Nights',
    price: 21999,
    image: 'https://images.unsplash.com/photo-1571805341302-94c2b0a3f3c0?w=600&q=80',
    destinations: ['Shimla', 'Kufri', 'Manali'],
    highlights: ['Mall Road Shimla', 'Kufri Adventure', 'Rohtang Pass', 'Kullu Valley'],
    itinerary: [
      { day: 1, title: 'Delhi to Shimla', description: 'Drive from Delhi to Shimla, check-in, Mall Road evening.' },
      { day: 2, title: 'Shimla Sightseeing', description: 'Jakhu Temple, Kufri, Indian Institute of Advanced Study.' },
      { day: 3, title: 'Shimla to Manali', description: 'Scenic drive via Kullu Valley, Kullu Shawl factories.' },
      { day: 4, title: 'Manali Local', description: 'Hadimba Temple, Van Vihar, Tibetan Monastery.' },
      { day: 5, title: 'Solang Valley', description: 'Adventure activities at Solang Valley.' },
      { day: 6, title: 'Rohtang Pass', description: 'Day excursion to Rohtang Pass.' },
      { day: 7, title: 'Manali Leisure', description: 'Old Manali, Manu Temple, river side leisure.' },
      { day: 8, title: 'Return to Delhi', description: 'Overnight Volvo bus back to Delhi.' },
    ],
    inclusions: ['Hotels throughout', 'Breakfast & Dinner', 'AC vehicle', 'Overnight bus'],
    exclusions: ['Flights', 'Activity charges', 'Lunch', 'Personal expenses'],
  },
];

export const STATIC_HOTELS = [
  {
    id: 1,
    name: 'The Green Leaf Resort',
    location: 'Goa',
    stars: 4,
    pricePerNight: 4500,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    amenities: ['Swimming Pool', 'Free WiFi', 'Spa', 'Restaurant', 'Beach Access'],
    description: 'A serene beachside resort with lush gardens and modern amenities.',
  },
  {
    id: 2,
    name: 'Kerala Houseboat Premium',
    location: 'Alleppey',
    stars: 5,
    pricePerNight: 8500,
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&q=80',
    amenities: ['All Meals', 'AC Rooms', 'Guided Tour', 'Fishing', 'Sunset Views'],
    description: 'Luxury houseboat experience on the serene Kerala backwaters.',
  },
  {
    id: 3,
    name: 'Royal Heritage Haveli',
    location: 'Jaipur',
    stars: 5,
    pricePerNight: 12000,
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=600&q=80',
    amenities: ['Heritage Property', 'Pool', 'Cultural Shows', 'Rooftop Dining', 'Yoga'],
    description: 'A restored 18th-century haveli offering a royal Rajasthani experience.',
  },
  {
    id: 4,
    name: 'Snow Peak Mountain Lodge',
    location: 'Manali',
    stars: 3,
    pricePerNight: 3200,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
    amenities: ['Mountain View', 'Bonfire', 'Free WiFi', 'Room Service', 'Parking'],
    description: 'Cozy mountain lodge with stunning Himalayan views and warm hospitality.',
  },
];

export const DESTINATIONS = [
  { id: 1, name: 'Goa', tagline: 'Sun, Sand & Spirit', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80', toursCount: 4 },
  { id: 2, name: 'Kerala', tagline: "God's Own Country", image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80', toursCount: 3 },
  { id: 3, name: 'Rajasthan', tagline: 'Land of Kings', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80', toursCount: 5 },
  { id: 4, name: 'Himachal', tagline: 'Heaven on Earth', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', toursCount: 6 },
  { id: 5, name: 'Andaman', tagline: 'Emerald Isle Escape', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80', toursCount: 3 },
  { id: 6, name: 'Uttarakhand', tagline: 'Dev Bhoomi', image: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=600&q=80', toursCount: 4 },
];

// ─── React Query Hooks ─────────────────────────────────────────────────────
export function useTours(filters = {}) {
  return useQuery({
    queryKey: ['tours', filters],
    queryFn: async () => {
      if (!BASE_URL) return STATIC_TOURS;
      try {
        const params = new URLSearchParams(filters).toString();
        const res = await fetch(`${BASE_URL}/tours${params ? '?' + params : ''}`);
        if (!res.ok) return STATIC_TOURS;
        return res.json();
      } catch {
        return STATIC_TOURS;
      }
    },
  });
}

export function useTour(slug) {
  return useQuery({
    queryKey: ['tour', slug],
    queryFn: async () => {
      if (!BASE_URL) return STATIC_TOURS.find((t) => t.slug === slug) || null;
      try {
        const res = await fetch(`${BASE_URL}/tours/${slug}`);
        if (!res.ok) return STATIC_TOURS.find((t) => t.slug === slug) || null;
        return res.json();
      } catch {
        return STATIC_TOURS.find((t) => t.slug === slug) || null;
      }
    },
    enabled: !!slug,
  });
}

export function useHotels() {
  return useQuery({
    queryKey: ['hotels'],
    queryFn: async () => {
      if (!BASE_URL) return STATIC_HOTELS;
      try {
        const res = await fetch(`${BASE_URL}/hotels`);
        if (!res.ok) return STATIC_HOTELS;
        return res.json();
      } catch {
        return STATIC_HOTELS;
      }
    },
  });
}
