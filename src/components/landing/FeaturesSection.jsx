import React, { useEffect, useRef } from 'react';
import { CalendarClock, Zap, Activity, HeartHandshake } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feat-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(1.7)'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: CalendarClock,
      title: 'Smart Medication Scheduling',
      desc: 'Easily input complex regimens including daily, weekly, or "as needed" dosages.',
      color: 'text-blue-500',
      bg: 'bg-blue-100 dark:bg-blue-900/40'
    },
    {
      icon: Zap,
      title: 'Intelligent Reminder Engine',
      desc: 'Persistent but non-annoying notifications ensuring you never swipe away a critical alert.',
      color: 'text-amber-500',
      bg: 'bg-amber-100 dark:bg-amber-900/40'
    },
    {
      icon: Activity,
      title: 'Adherence Analytics',
      desc: 'Visualize your consistency over time with insightful charts that help build better habits.',
      color: 'text-emerald-500',
      bg: 'bg-emerald-100 dark:bg-emerald-900/40'
    },
    {
      icon: HeartHandshake,
      title: 'Caregiver Monitoring',
      desc: 'Automatically alert designated family members if a critical medication is marked as missed.',
      color: 'text-purple-500',
      bg: 'bg-purple-100 dark:bg-purple-900/40'
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-primary dark:text-primary-light font-semibold tracking-wide uppercase text-sm mb-3">Solution</h2>
          <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Meet Nexus</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400">Everything you need to manage medications safely and effortlessly, housed in one beautiful dashboard.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feat, i) => (
            <div key={i} className="feat-card flex gap-6 p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${feat.bg}`}>
                <feat.icon size={28} className={feat.color} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feat.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
