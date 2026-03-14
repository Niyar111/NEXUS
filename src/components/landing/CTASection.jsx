import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-elem', {
        scrollTrigger: { trigger: ctaRef.current, start: 'top 80%' },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out'
      });
    }, ctaRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ctaRef} className="py-24 bg-gradient-to-br from-primary to-blue-700 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white opacity-5 rounded-full pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white opacity-5 rounded-full pointer-events-none blur-3xl" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="cta-elem text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
          Take Control of Your Medication Today
        </h2>
        <p className="cta-elem text-xl text-blue-100 mb-10 max-w-2xl mx-auto opacity-90">
          Join thousands of patients and caregivers who rely on Nexus to handle the complexity of treatment adherence.
        </p>
        
        <div className="cta-elem flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register" className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-95 shadow-lg">
            Get Started for Free
          </Link>
          <Link to="/login" className="bg-blue-800 text-white border border-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-900 transition-all active:scale-95">
            Log In to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
