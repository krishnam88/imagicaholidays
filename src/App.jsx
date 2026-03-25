import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import Hotels from './pages/Hotels';
import Contact from './pages/Contact';
import Payments from './pages/Payments';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:slug" element={<TourDetail />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
