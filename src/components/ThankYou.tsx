import { useEffect, useState } from 'react';
import { CheckCircle2, ArrowLeft } from './ui/icons';
import { Button } from './ui/button';

interface ThankYouData {
  name: string;
  email: string;
  phone: string;
  formType?: string;
}

export default function ThankYou() {
  const [userData, setUserData] = useState<ThankYouData | null>(null);

  useEffect(() => {
    // Get data from sessionStorage
    const data = sessionStorage.getItem('thankYouData');
    if (data) {
      setUserData(JSON.parse(data));
      // Clear the data after reading
      sessionStorage.removeItem('thankYouData');
    }

    // Google Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Thank You - Eastfield by Urbanest',
        page_location: window.location.href,
        page_path: window.location.pathname + window.location.hash,
      });
      
      // Track conversion event
      (window as any).gtag('event', 'conversion', {
        send_to: 'G-QRQ387LVY2',
        event_category: 'Form Submission',
        event_label: 'Enquiry Form Completed',
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-12 shadow-xl">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Thank You Message */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl text-black mb-4">
              Thank you{userData?.name ? `, ${userData.name}` : ''}!
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#c9980b] to-transparent mx-auto mb-6"></div>
            <p className="text-xl text-green-600 mb-4">
              ✓ Your enquiry has been submitted successfully
            </p>
            <p className="text-gray-700 text-lg">
              We'll contact you shortly to discuss your requirements for Eastfield by Urbanest Realty
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="border-2 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-black px-8 py-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Need immediate assistance? Call us at <a href="tel:+917090300066" className="text-[#c9980b] hover:underline">+91 70903 00066</a></p>
        </div>
      </div>
    </div>
  );
}
