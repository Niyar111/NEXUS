import React, { useEffect } from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import Hero from '../components/landing/Hero';
import ProblemSection from '../components/landing/ProblemSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorks from '../components/landing/HowItWorks';
import CaregiverSection from '../components/landing/CaregiverSection';
import AnalyticsPreview from '../components/landing/AnalyticsPreview';
import WhyNexusSection from '../components/landing/WhyNexusSection';
import CTASection from '../components/landing/CTASection';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  // Ensure the page always starts at the top when navigated to
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-white dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden selection:bg-primary selection:text-white">
      <LandingNavbar />
      <main>
        <Hero />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorks />
        <CaregiverSection />
        <AnalyticsPreview />
        <WhyNexusSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
