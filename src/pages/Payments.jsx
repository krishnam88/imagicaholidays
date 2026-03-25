import { Shield, CreditCard, Smartphone, Building2, Lock, CheckCircle } from 'lucide-react';

const PAYMENT_METHODS = [
  { Icon: CreditCard, label: 'Credit / Debit Card', description: 'Visa, Mastercard, RuPay' },
  { Icon: Smartphone, label: 'UPI Payment', description: 'GPay, PhonePe, Paytm, BHIM' },
  { Icon: Building2, label: 'Net Banking', description: 'All major Indian banks' },
  { Icon: Smartphone, label: 'EMI Options', description: 'No-cost EMI on select cards' },
];

const FAQS = [
  { q: 'Is my payment information secure?', a: 'Yes. We use 256-bit SSL encryption and comply with PCI-DSS standards. Your card details are never stored on our servers.' },
  { q: 'Can I pay in installments?', a: 'Yes! We offer flexible payment plans. Typically a 30% advance to confirm the booking and the balance 7 days before travel.' },
  { q: 'What is the cancellation & refund policy?', a: 'Cancellations made 15+ days before travel receive a full refund minus processing fees. Please contact our team for the complete policy.' },
  { q: 'How do I get a payment receipt?', a: 'A confirmation email with your receipt and booking details will be sent within 30 minutes of a successful payment.' },
];

export default function Payments() {
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-14 text-white text-center" style={{ backgroundColor: '#2F6F5E' }}>
        <h1 className="text-4xl font-bold mb-2">Secure Online Payment</h1>
        <p className="text-white/80 text-lg">Fast, safe, and hassle-free booking payments</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Security Badge */}
        <div className="flex items-center justify-center gap-3 bg-white rounded-2xl p-5 shadow-sm">
          <Lock className="h-6 w-6" style={{ color: '#2F6F5E' }} />
          <div>
            <p className="font-bold text-gray-900">100% Secure Transactions</p>
            <p className="text-sm text-gray-500">256-bit SSL encryption · PCI-DSS compliant</p>
          </div>
          <Shield className="h-8 w-8 text-green-500 ml-auto" />
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Accepted Payment Methods</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {PAYMENT_METHODS.map(({ Icon, label, description }) => (
              <div key={label} className="bg-white rounded-2xl p-5 shadow-sm text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(47,111,94,0.1)' }}>
                  <Icon className="h-6 w-6" style={{ color: '#2F6F5E' }} />
                </div>
                <p className="font-semibold text-gray-900 text-sm">{label}</p>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Steps */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">How to Pay</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            {[
              { step: 1, text: 'Browse our tour packages and choose your preferred holiday.' },
              { step: 2, text: 'Fill in the enquiry form or call us to get a final quote.' },
              { step: 3, text: 'Our team will share a secure payment link via WhatsApp or email.' },
              { step: 4, text: 'Complete the payment and receive instant booking confirmation.' },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: '#2F6F5E' }}>
                  {step}
                </div>
                <p className="text-gray-700 text-sm pt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-5 shadow-sm">
                <p className="font-semibold text-gray-900 mb-1 flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#2F6F5E' }} />
                  {q}
                </p>
                <p className="text-sm text-gray-600 ml-6">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Book Your Holiday?</h3>
          <p className="text-gray-500 text-sm mb-6">Contact our team to get a personalized quote and payment link.</p>
          <a
            href={`https://wa.me/${waNumber}?text=Hi! I want to make a payment for my booking.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
            style={{ backgroundColor: '#25D366' }}
          >
            Pay via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
