import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import LeadForm from '../components/common/LeadForm';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { useLeadCapture } from '../hooks/useLeadCapture';

export default function Contact() {
  const { submit, isSubmitting, isSuccess, isDuplicate, reset } = useLeadCapture();
  const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-14 text-white text-center" style={{ backgroundColor: '#2F6F5E' }}>
        <h1 className="text-4xl font-bold mb-2">Get In Touch</h1>
        <p className="text-white/80 text-lg">We'd love to plan your perfect holiday</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-5">
                {[
                  { Icon: MapPin, label: 'Address', value: '123 Travel Lane, Mumbai, Maharashtra 400001' },
                  { Icon: Phone, label: 'Phone', value: `+${waNumber}` },
                  { Icon: Mail, label: 'Email', value: 'info@imagicaholidays.com' },
                  { Icon: Clock, label: 'Working Hours', value: 'Mon–Sat: 9 AM – 7 PM' },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(47,111,94,0.1)' }}>
                      <Icon className="h-5 w-5" style={{ color: '#2F6F5E' }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
                      <p className="text-gray-800 font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${waNumber}?text=Hi! I'd like to enquire about a holiday package.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-4 rounded-xl text-white font-semibold"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle className="h-5 w-5" />
              <div>
                <p className="text-sm font-bold">WhatsApp Us Directly</p>
                <p className="text-xs text-white/80">Fastest response guaranteed</p>
              </div>
            </a>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden h-48 bg-gray-200">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60340.11022388574!2d72.82457!3d18.96!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce01e88f4c89%3A0x280d09db6f8fa001!2sMumbai!5e0!3m2!1sen!2sin!4v1000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-6">Fill out the form and our team will get back to you within 30 minutes.</p>
              <LeadForm
                onSubmit={submit}
                isSubmitting={isSubmitting}
                showDestination
                showDate
                showTravelers
                showMessage
                submitLabel="Send Enquiry"
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal isOpen={isSuccess || isDuplicate} isDuplicate={isDuplicate} onClose={reset} />
    </div>
  );
}
