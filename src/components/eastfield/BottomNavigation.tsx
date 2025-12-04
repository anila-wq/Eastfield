import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ArrowRight, X, MessageCircle, CheckCircle2 } from '../ui/icons';
import { submitForm } from '../../utils/form-submission';
import { toast } from 'sonner';

const BottomNavigation = () => {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await submitForm({
        name: formData.name,
        email: formData.email,
        phone: formData.number,
        message: ''
      }, 'enquiry', { redirect: true });
      
      // Form submission will automatically redirect to thank you page
      // No need to handle success state here
      if (!result.success) {
        toast.error('Submission Failed', {
          description: result.errors?.join(', ') || 'Please try again later or contact us directly.',
          duration: 5000,
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Something went wrong', {
        description: 'Please try again or contact us directly.',
        duration: 5000,
      });
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '919742200899'; // WhatsApp number (with country code, no + or spaces)
    const message = encodeURIComponent('Hi, I am interested in Eastfield by Urbanest Realty. Please share more details.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Fixed Bottom Navigation */}
      <div 
        className="flex flex-row gap-2 justify-center items-end fixed bottom-0 left-1/2 -translate-x-1/2 z-50 px-1"
        style={{
          paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))'
        }}
      >

        <Button 
          size="lg" 
          className="bg-black hover:bg-[#c9980b]/10 text-[#c9980b] hover:text-[#c9980b] px-6 py-4 font-bold rounded-full border-2 border-[#c9980b] transition-colors duration-200"
          onClick={() => setShowEnquiryForm(true)}
        >
          Enquire Now
        </Button>
        <Button 
          size="lg" 
          className="bg-black hover:bg-[#c9980b]/10 text-[#c9980b] hover:text-[#c9980b] px-6 py-4 font-semibold rounded-full border-2 border-[#c9980b] transition-colors duration-200"
          onClick={() => window.open('tel:+917090300066', '_self')}
        >
          Call Now
        </Button>
      </div>

      {/* Enquiry Form Modal */}
      <Dialog open={showEnquiryForm} onOpenChange={(open) => {
        setShowEnquiryForm(open);
        if (!open) setShowSuccess(false);
      }}>
        <DialogContent className="bg-gradient-to-br from-gray-900 to-black border-[#c9980b]/30 max-w-md mx-auto">
          {showSuccess ? (
            /* Success State */
            <>
              <DialogHeader className="relative">
                <button
                  onClick={() => {
                    setShowEnquiryForm(false);
                    setShowSuccess(false);
                    setFormData({ name: '', number: '', email: '' });
                  }}
                  className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white transition-colors duration-200 z-10"
                  aria-label="Close form"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <DialogTitle className="text-2xl font-bold text-white mb-2 pr-8">
                  Success!
                </DialogTitle>
              </DialogHeader>
              
              <div className="flex items-center justify-center py-4">
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-2 border-green-500/50 rounded-xl p-6 w-full backdrop-blur-sm">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="bg-green-500 rounded-full p-3">
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-white text-xl font-bold">
                        Thank you, {formData.name}!
                      </h3>
                      <div className="bg-white/10 rounded-lg p-4 space-y-2">
                        <p className="text-green-400 font-medium">
                          ✓ Your enquiry has been submitted successfully
                        </p>
                        <div className="text-gray-300 text-sm space-y-1">
                          <p>We'll contact you at:</p>
                          <p className="text-white font-medium">📱 {formData.number}</p>
                          <p className="text-white font-medium">✉️ {formData.email}</p>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Our team will reach out to you shortly
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        setShowEnquiryForm(false);
                        setShowSuccess(false);
                        setFormData({ name: '', number: '', email: '' });
                      }}
                      className="bg-gradient-to-r from-[#c9980b] to-[#b8860b] hover:from-[#c9980b]/90 hover:to-[#b8860b]/90 text-black font-bold rounded-lg px-6 py-2"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Form State */
            <>
              <DialogHeader className="relative">
                <button
                  onClick={() => setShowEnquiryForm(false)}
                  className="absolute top-0 right-0 p-2 text-gray-400 hover:text-white transition-colors duration-200 z-10"
                  aria-label="Close form"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <DialogTitle className="text-2xl font-bold text-white mb-2 pr-8">
                  Get In Touch
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  Fill out the form below and we'll get back to you shortly.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Full Name*</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#c9980b] focus:ring-[#c9980b]/20"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="number" className="text-white">Phone Number*</Label>
                  <Input
                    id="number"
                    type="tel"
                    value={formData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    placeholder="Enter your phone number"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#c9980b] focus:ring-[#c9980b]/20"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#c9980b] focus:ring-[#c9980b]/20"
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#c9980b] to-[#c9980b] hover:from-[#c9980b]/80 hover:to-[#c9980b]/80 text-black font-bold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                  </Button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BottomNavigation;
