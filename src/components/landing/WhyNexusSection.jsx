import React, { useEffect, useRef } from 'react';
import { ShieldCheck, WifiOff, FileLock2, BrainCircuit } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WhyNexusSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.why-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const points = [
    { icon: WifiOff, title: 'Offline Reliability', desc: 'Alerts trigger locally on your device even if you lose network connectivity.' },
    { icon: BrainCircuit, title: 'Smart Scoring', desc: 'Proprietary algorithm contextualizes missed doses based on medication importance.' },
    { icon: ShieldCheck, title: 'Caregiver Accounts', desc: 'Native bridging between patient accounts and authorized family supervisors.' },
    { icon: FileLock2, title: 'Bank-Grade Security', desc: 'End-to-end encryption ensures your health data remains strictly private.' }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-16 flex-col md:flex-row gap-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white max-w-sm">
            Why Nexus is different from the rest?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md">
            Most reminder apps are just glorified alarm clocks. Nexus is built from the ground up for healthcare compliance.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, i) => (
            <div key={i} className="why-card bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <pt.icon size={32} className="text-primary mb-6" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">{pt.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{pt.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyNexusSection;
