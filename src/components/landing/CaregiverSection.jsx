import React, { useEffect, useRef } from 'react';
import { ShieldCheck, UserCheck, HeartPulse } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CaregiverSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cg-text', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        x: -40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
      });
      
      gsap.from('.cg-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        x: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    { icon: ShieldCheck, title: 'Missed dose alerts', desc: 'Instant SMS or push notifications if a critical window is missed.' },
    { icon: UserCheck, title: 'Remote monitoring', desc: 'Securely check adherence charts from anywhere in the world.' },
    { icon: HeartPulse, title: 'Peace of mind', desc: 'Know your parents or patients are following their prescriptions.' }
  ];

  return (
    <section id="caregivers" ref={sectionRef} className="py-24 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="cg-text text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">Care Beyond Reminders</h2>
            <p className="cg-text text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Nexus connects patients with their caregivers so missed medications never go unnoticed. Create a support network that steps in only when needed.
            </p>
            <div className="space-y-6">
              {features.map((feat, i) => (
                <div key={i} className="cg-text flex gap-4 items-start">
                  <div className="mt-1 w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center flex-shrink-0 shadow-sm text-primary">
                    <feat.icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{feat.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            {/* Visual Caregiver Mockup */}
            <div className="cg-card bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 absolute z-20 left-0 bottom-[-40px] max-w-sm w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Alert: Missed Dose</p>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Dad missed his 8:00 AM Lisinopril. Would you like to call him?</p>
              <div className="flex gap-3">
                <button className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-2 rounded-xl text-sm font-medium">Dismiss</button>
                <button className="flex-1 bg-primary text-white py-2 rounded-xl text-sm font-medium">Call Dad</button>
              </div>
            </div>
            
            <div className="cg-card bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-700 ml-12 pb-24">
              <h4 className="font-bold text-slate-900 dark:text-white mb-4">Patient Network</h4>
              <div className="space-y-4">
                {[1,2,3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                      <div>
                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-1" />
                        <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800 rounded" />
                      </div>
                    </div>
                    {i === 1 ? (
                      <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-medium rounded-full">Good</span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 font-medium rounded-full">Warning</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaregiverSection;
