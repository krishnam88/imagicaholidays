import { CheckCircle, X, MessageCircle } from 'lucide-react';

export default function ConfirmationModal({ isOpen, isDuplicate, onClose, whatsappNumber }) {
  const waNumber = whatsappNumber || import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          {isDuplicate ? (
            <>
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FEF3C7' }}>
                <MessageCircle className="h-8 w-8" style={{ color: '#D97706' }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Already Registered!</h3>
              <p className="text-gray-600 text-sm mb-6">
                We already have your details. Our team will get in touch with you shortly.
                You can also reach us directly on WhatsApp.
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#D1FAE5' }}>
                <CheckCircle className="h-8 w-8" style={{ color: '#2F6F5E' }} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enquiry Received! 🎉</h3>
              <p className="text-gray-600 text-sm mb-6">
                Thank you! Our travel expert will call you within 30 minutes.
                For instant assistance, chat with us on WhatsApp.
              </p>
            </>
          )}

          <div className="space-y-3">
            <a
              href={`https://wa.me/${waNumber}?text=Hi! I just submitted an enquiry on your website.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-white text-sm font-semibold"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
