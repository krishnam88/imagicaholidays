/**
 * App – Root routing component for Imagica Holidays.
 *
 * All pages are lazy-loaded for optimal bundle splitting.
 * A Suspense boundary shows a minimal spinner while the chunk loads.
 */

import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

// Lazy-load pages for code splitting
const Home       = lazy(() => import('./pages/Home.jsx'))
const Tours      = lazy(() => import('./pages/Tours.jsx'))
const TourDetail = lazy(() => import('./pages/TourDetail.jsx'))
const Hotels     = lazy(() => import('./pages/Hotels.jsx'))
const Contact    = lazy(() => import('./pages/Contact.jsx'))
const Payments   = lazy(() => import('./pages/Payments.jsx'))

/** Minimal full-page loading fallback */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="loader-spinner" role="status" aria-label="Loading page" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/tours"         element={<Tours />} />
        <Route path="/tours/:id"     element={<TourDetail />} />
        <Route path="/hotels"        element={<Hotels />} />
        <Route path="/contact"       element={<Contact />} />
        <Route path="/payments"      element={<Payments />} />
        {/* Catch-all: redirect unknown paths to home */}
        <Route path="*"              element={<Home />} />
      </Routes>
    </Suspense>
  )
}
