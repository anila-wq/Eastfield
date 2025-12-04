import { Suspense, lazy, useState, useEffect } from 'react';
import Header from './components/eastfield/Header';
import Hero from './components/eastfield/Hero';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toaster } from './components/ui/sonner';
import ThankYou from './components/ThankYou';

// Success Box Forms - Updated Nov 4, 2025

// Import core components directly to avoid loading delays
import DocumentsSection from './components/eastfield/DocumentsSection';
import SectionNavigation from './components/eastfield/SectionNavigation';
import ProjectOverview from './components/eastfield/ProjectOverview';
import AboutUrbanest from './components/eastfield/AboutUrbanest';
import BottomNavigation from './components/eastfield/BottomNavigation';
import ScrollButtons from './components/eastfield/ScrollButtons';
import FloatingWhatsApp from './components/eastfield/FloatingWhatsApp';

// Lazy load only heavy components with timeout protection
const Gallery = lazy(() => 
  Promise.race([
    import('./components/eastfield/Gallery'),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Component load timeout')), 10000)
    )
  ]).catch(() => import('./components/LoadingFallback'))
);

const Location = lazy(() => 
  Promise.race([
    import('./components/eastfield/Location'),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Component load timeout')), 10000)
    )
  ]).catch(() => import('./components/LoadingFallback'))
);

const FAQ = lazy(() => 
  Promise.race([
    import('./components/eastfield/FAQ'),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Component load timeout')), 10000)
    )
  ]).catch(() => import('./components/LoadingFallback'))
);

const Footer = lazy(() => 
  Promise.race([
    import('./components/eastfield/Footer'),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Component load timeout')), 10000)
    )
  ]).catch(() => import('./components/LoadingFallback'))
);

// Enhanced loading fallback
const LoadingDiv = ({ section = "content" }: { section?: string }) => (
  <div className="min-h-[200px] bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="text-white text-sm mb-2">Loading {section}...</div>
      <div className="w-8 h-8 border-2 border-[#c9980b] border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  </div>
);

function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'thankyou'>('home');

  useEffect(() => {
    // Initialize Google Analytics
    const initGoogleAnalytics = () => {
      // Check if gtag script is already loaded
      if ((window as any).gtag) return;

      // Add Google Analytics script
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-QRQ387LVY2';
      document.head.appendChild(gtagScript);

      // Add gtag config script
      const gtagConfigScript = document.createElement('script');
      gtagConfigScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-QRQ387LVY2');
      `;
      document.head.appendChild(gtagConfigScript);
    };

    initGoogleAnalytics();
  }, []);

  useEffect(() => {
    // Check if we're on the thank you page
    const checkPage = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;
      
      if (hash === '#thankyou' || pathname.includes('/thankyou') || pathname.includes('/thank-you')) {
        setCurrentPage('thankyou');
      } else {
        setCurrentPage('home');
      }
    };

    checkPage();

    // Listen for hash changes
    window.addEventListener('hashchange', checkPage);
    window.addEventListener('popstate', checkPage);

    return () => {
      window.removeEventListener('hashchange', checkPage);
      window.removeEventListener('popstate', checkPage);
    };
  }, []);

  useEffect(() => {
    // Allow initial components to render first (only for home page)
    if (currentPage === 'home') {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  // Show Thank You page
  if (currentPage === 'thankyou') {
    return (
      <div className="min-h-screen bg-black text-white">
        <ThankYou />
        <Toaster position="top-center" richColors closeButton />
      </div>
    );
  }

  // Show main landing page
  return (
    <div className="min-h-screen bg-black text-white">
      <ErrorBoundary name="Header">
        <Header />
      </ErrorBoundary>
      
      <main className="pb-0 mb-0">
        <ErrorBoundary name="Hero">
          <Hero />
        </ErrorBoundary>
        
        <ErrorBoundary name="Documents">
          <DocumentsSection />
        </ErrorBoundary>
        
        <ErrorBoundary name="Navigation">
          <SectionNavigation />
        </ErrorBoundary>
        
        <ErrorBoundary name="Project Overview">
          <ProjectOverview />
        </ErrorBoundary>
        
        {/* Load heavy components only after initial render */}
        {!isInitialLoad && (
          <>
            <ErrorBoundary name="Gallery">
              <Suspense fallback={<LoadingDiv section="gallery" />}>
                <Gallery />
              </Suspense>
            </ErrorBoundary>
            
            <ErrorBoundary name="Location">
              <Suspense fallback={<LoadingDiv section="location" />}>
                <Location />
              </Suspense>
            </ErrorBoundary>
            
            <ErrorBoundary name="FAQ">
              <Suspense fallback={<LoadingDiv section="FAQ" />}>
                <FAQ />
              </Suspense>
            </ErrorBoundary>
          </>
        )}
        
        <ErrorBoundary name="About Urbanest">
          <AboutUrbanest />
        </ErrorBoundary>
        
        <ErrorBoundary name="Footer">
          <Suspense fallback={<LoadingDiv section="footer" />}>
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </main>
      
      {/* Fixed Bottom Navigation */}
      <ErrorBoundary name="Bottom Navigation">
        <BottomNavigation />
      </ErrorBoundary>
      
      {/* Scroll Buttons */}
      <ErrorBoundary name="Scroll Buttons">
        <ScrollButtons />
      </ErrorBoundary>
      
      {/* Floating WhatsApp Button */}
      <ErrorBoundary name="Floating WhatsApp">
        <FloatingWhatsApp />
      </ErrorBoundary>
      
      {/* Toast Notifications */}
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}

export default App;