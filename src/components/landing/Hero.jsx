import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Pill, CalendarClock } from 'lucide-react';
import { gsap } from 'gsap';

const Hero = () => {
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.from('.hero-elem', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.1
      });

      // Abstract shapes animation
      gsap.to('.shape-1', {
        y: -20,
        x: 20,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      gsap.to('.shape-2', {
        y: 30,
        x: -15,
        rotation: -5,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // UI Preview Float
      gsap.fromTo(imageRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: 'power3.out' }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300" ref={contentRef}>
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="shape-1 absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 blur-[80px]" />
        <div className="shape-2 absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-400/10 to-emerald-400/10 dark:from-blue-600/10 dark:to-emerald-600/10 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="max-w-2xl">
            <div className="hero-elem inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light text-sm font-medium mb-6 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Nexus v1.0 is now live
            </div>
            
            <h1 className="hero-elem text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
              Never Miss a <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Dose Again.
              </span>
            </h1>
            
            <p className="hero-elem text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-lg">
              Nexus is an intelligent medication adherence system that helps patients stay consistent with their treatment while giving caregivers complete peace of mind.
            </p>
            
            <div className="hero-elem flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all active:scale-95 shadow-lg shadow-primary/30">
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all active:scale-95">
                Learn More
              </a>
            </div>

            <div className="hero-elem mt-10 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-secondary" /> No credit card needed
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-secondary" /> HIPAA Compliant
              </div>
            </div>
          </div>

          {/* Visual UI Preview */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none" ref={imageRef}>
            <div className="relative rounded-2xl border border-slate-200/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40 p-2 backdrop-blur-xl shadow-2xl">
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg overflow-hidden flex flex-col h-[500px]">
                
                {/* Mock Header */}
                <div className="h-14 border-b border-slate-100 dark:border-slate-800 flex items-center px-4 justify-between bg-slate-50/50 dark:bg-slate-800/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-md" />
                </div>

                {/* Mock Body */}
                <div className="flex-1 p-6 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Today's Schedule</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">2 pending medications</p>
                    </div>
                  </div>

                  {/* Mock Cards */}
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                          <CheckCircle size={20} className="text-emerald-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Lisinopril 10mg</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">08:00 AM · Taken</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-primary/30 shadow-md shadow-primary/5 flex items-center justify-between transform -translate-x-2">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <CalendarClock size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Metformin 500mg</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">12:00 PM · With food</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-full">
                        Pending
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between opacity-70">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                          <Pill size={20} className="text-slate-500 dark:text-slate-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Atorvastatin 20mg</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">08:00 PM · Evening</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Decorative floating element */}
              <div className="absolute -right-6 top-24 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white text-emerald-600 dark:text-emerald-400">Adherence 95%</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Last 7 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
