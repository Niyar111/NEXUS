import React, { useEffect, useRef } from 'react';
import { Pill, BellRing, TrendingUp, HandHeart } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line animation
      gsap.from('.step-line', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1
        },
        scaleY: 0,
        transformOrigin: 'top center',
        ease: 'none'
      });

      // Steps animation
      gsap.from('.step-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Add your medicines',
      desc: 'Input your prescriptions, dosages, and schedules into our intuitive dashboard.',
      icon: Pill
    },
    {
      num: '02',
      title: 'Receive smart reminders',
      desc: 'Get notified exactly when it\'s time, with actionable rich notifications.',
      icon: BellRing
    },
    {
      num: '03',
      title: 'Track adherence',
      desc: 'Mark doses as taken and watch your consistency score climb automatically.',
      icon: TrendingUp
    },
    {
      num: '04',
      title: 'Caregivers stay informed',
      desc: 'Authorized family members receive weekly reports and missed dose alerts.',
      icon: HandHeart
    }
  ];

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">How Nexus Works</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">Four simple steps to better health consistency.</p>
        </div>

        <div className="relative">
          {/* Vertical line connecting steps (hidden on small mobile) */}
          <div className="step-line hidden md:block absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className="step-card relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
                <div className="hidden md:flex relative z-10 w-20 h-20 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-800 items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-xl font-black text-slate-300 dark:text-slate-600">{step.num}</span>
                </div>
                
                <div className="flex-1 bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 w-full relative overflow-hidden group hover:border-primary/30 transition-colors">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <step.icon size={100} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">
                    <span className="md:hidden text-primary mr-2">{step.num}.</span>
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 relative z-10 max-w-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
