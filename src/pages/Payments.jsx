/**
 * Payments page – Accepted payment methods and booking process overview.
 * Provides transparency to customers about how to pay and what to expect.
 */

import { Link } from 'react-router-dom'
import { CreditCard, Smartphone, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'

const PAYMENT_METHODS = [
  {
    icon: CreditCard,
    title: 'Credit / Debit Card',
    desc: 'Visa, MasterCard, RuPay and all major cards accepted. Secure 3D-verified checkout.',
  },
  {
    icon: Smartphone,
    title: 'UPI',
    desc: 'Pay instantly via Google Pay, PhonePe, Paytm, or any UPI-enabled app.',
  },
  {
    icon: Building2,
    title: 'Bank Transfer / NEFT',
    desc: 'Direct bank transfers for large group bookings. Contact us for account details.',
  },
]

const BOOKING_STEPS = [
  { step: 1, title: 'Submit Enquiry', desc: 'Fill in the contact or tour enquiry form on the website.' },
  { step: 2, title: 'Get a Customised Quote', desc: 'Our travel expert calls you within 24 hours with a tailored quote.' },
  { step: 3, title: 'Confirm & Pay Deposit', desc: 'Pay a 25% deposit to confirm your booking. Balance due 7 days before travel.' },
  { step: 4, title: 'Receive Booking Voucher', desc: 'Get a detailed itinerary and hotel vouchers directly to your email / WhatsApp.' },
  { step: 5, title: 'Travel & Enjoy!', desc: 'Our support team is available 24/7 throughout your trip.' },
]

export default function Payments() {
  return (
    <>
      <Navbar />

      {/* Page header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Payments & Booking</h1>
          <p className="text-white/80">Simple, secure, and transparent payment process</p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Security badge */}
        <div className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-2xl p-5">
          <ShieldCheck size={36} className="text-green-600 shrink-0" />
          <div>
            <p className="font-semibold text-green-800">100% Secure Payments</p>
            <p className="text-sm text-green-700 mt-0.5">
              All transactions are encrypted with industry-standard SSL/TLS. We never store your card details.
            </p>
          </div>
        </div>

        {/* Payment methods */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Accepted Payment Methods</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PAYMENT_METHODS.map((method) => {
              const MethodIcon = method.icon
              return (
                <div key={method.title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MethodIcon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{method.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* How booking works */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Booking Works</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-primary/20" aria-hidden="true" />

            <ol className="space-y-6">
              {BOOKING_STEPS.map(({ step, title, desc }) => (
                <li key={step} className="flex items-start gap-5">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {step}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Cancellation policy */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
          <ul className="space-y-3">
            {[
              'Cancellation 30+ days before travel: Full refund minus 5% processing fee',
              'Cancellation 15–29 days before travel: 50% refund',
              'Cancellation 7–14 days before travel: 25% refund',
              'Cancellation within 7 days of travel: No refund',
              'No-show: No refund',
            ].map((policy) => (
              <li key={policy} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                {policy}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Have questions about payment or need to make a group booking?</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-dark transition-colors"
          >
            Contact Our Team
          </Link>
        </div>
      </main>

      <Footer />
    </>
  )
}
