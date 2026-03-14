import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProblemSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.prob-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const stats = [
    {
      value: '50%',
      title: 'Of patients forget medications',
      desc: 'Half of all prescribed medications are not taken as directed, leading to complications.'
    },
    {
      value: '1 in 4',
      title: 'Struggle with complex schedules',
      desc: 'Patients with chronic conditions find it highly difficult to manage overlapping treatments.'
    },
    {
      value: 'Zero',
      title: 'Visibility for loved ones',
      desc: 'Caregivers often have no way to verify if their family members have taken crucial doses.'
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            The Problem With Medication Adherence
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Current reminder apps just beep and disappear. They don't account for real human behavior, complex regimens, or the need for a support network.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="prob-card p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary mb-4">
                {stat.value}
              </p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{stat.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
