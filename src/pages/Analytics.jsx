import React, { useRef, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { WeeklyBarChart, AdherenceDonutChart } from '../components/analytics/AnalyticsChart';
import { mockAnalytics } from '../utils/mockData';
import { animateCards, animateCounter } from '../animations/gsapHelpers';
import { TrendingUp, CheckCircle, Clock, XCircle, Activity } from 'lucide-react';

const MetricCard = ({ label, value, icon: Icon, color, bg, suffix = '' }) => {
  const numRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      animateCounter(numRef.current, value, 0.2);
    }, 200);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="metric-card card p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
          <Icon size={18} className={color} />
        </div>
        <p className="text-sm text-text-secondary">{label}</p>
      </div>
      <div className="flex items-end gap-1">
        <span ref={numRef} className="text-3xl font-bold text-text-primary">0</span>
        {suffix && <span className="text-lg font-semibold text-text-secondary mb-0.5">{suffix}</span>}
      </div>
    </div>
  );
};

const Analytics = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      animateCards('.metric-card', 0.05);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const { adherenceScore, takenOnTime, takenLate, missedDoses } = mockAnalytics;

  const metrics = [
    { label: 'Adherence Score', value: adherenceScore, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary-light', suffix: '%' },
    { label: 'Taken On Time', value: takenOnTime, icon: CheckCircle, color: 'text-status-taken', bg: 'bg-emerald-50' },
    { label: 'Taken Late', value: takenLate, icon: Clock, color: 'text-status-pending', bg: 'bg-amber-50' },
    { label: 'Missed Doses', value: missedDoses, icon: XCircle, color: 'text-status-missed', bg: 'bg-red-50' },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Activity size={20} className="text-primary" />
          <h1 className="page-title">Adherence Analytics</h1>
        </div>
        <p className="page-subtitle">Track your medication adherence over time</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* Adherence banner */}
      <div className="card p-4 mb-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-semibold text-text-primary mb-0.5">Overall Adherence Rate</p>
            <p className="text-xs text-text-secondary">Based on the last 30 days of dose logs</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-32 h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
                style={{ width: `${adherenceScore}%` }}
              />
            </div>
            <span className="text-lg font-bold text-primary">{adherenceScore}%</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-text-primary mb-4">Weekly Adherence</h2>
          <WeeklyBarChart />
        </div>
        <div className="card p-5">
          <h2 className="text-sm font-semibold text-text-primary mb-4">Dose Distribution</h2>
          <AdherenceDonutChart />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;

