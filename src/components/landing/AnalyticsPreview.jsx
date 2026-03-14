import React, { useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const data = [
  { name: 'Mon', adherence: 40 },
  { name: 'Tue', adherence: 30 },
  { name: 'Wed', adherence: 60 },
  { name: 'Thu', adherence: 45 },
  { name: 'Fri', adherence: 70 },
  { name: 'Sat', adherence: 85 },
  { name: 'Sun', adherence: 92 },
];

const AnalyticsPreview = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.chart-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        y: 40, opacity: 0, duration: 1, ease: 'power3.out'
      });
      
      gsap.from('.stat-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
        y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="analytics" ref={sectionRef} className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Understand Your Habits</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Nexus transforms your daily actions into beautiful, easy-to-read insights that help you stay on track.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 chart-card bg-slate-50 dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg">Weekly Adherence Score</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm">You've improved by 15% this week!</p>
              </div>
              <p className="text-3xl font-black text-primary">92%</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#CBD5E1" strokeOpacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    itemStyle={{ color: '#0F172A', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="adherence" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <div className="stat-card bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">45</p>
              <p className="text-emerald-800 dark:text-emerald-300 font-medium text-sm">Doses Taken On Time</p>
            </div>
            <div className="stat-card bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-800 text-center">
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">8</p>
              <p className="text-amber-800 dark:text-amber-300 font-medium text-sm">Doses Taken Late</p>
            </div>
            <div className="stat-card bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100 dark:border-red-800 text-center">
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">11</p>
              <p className="text-red-800 dark:text-red-300 font-medium text-sm">Missed Doses</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsPreview;
