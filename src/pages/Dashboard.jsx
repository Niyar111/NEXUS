import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import MedicineCard from '../components/medicine/MedicineCard';
import { animateCards } from '../animations/gsapHelpers';
import { Pill, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, bg }) => (
  <div className="card p-4 flex items-center gap-4">
    <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
      <Icon size={20} className={color} />
    </div>
    <div>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      <p className="text-xs text-text-secondary">{label}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { medicines } = useApp();
  const { user } = useAuth();
  const cardsRef = useRef(null);

  const taken = medicines.filter((m) => m.status === 'taken').length;
  const pending = medicines.filter((m) => m.status === 'pending').length;
  const missed = medicines.filter((m) => m.status === 'missed').length;

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  useEffect(() => {
    const timer = setTimeout(() => {
      animateCards('.med-card', 0.1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: 'Total Today', value: medicines.length, icon: Pill, color: 'text-primary dark:text-primary-light', bg: 'bg-primary-light dark:bg-primary/20' },
    { label: 'Taken', value: taken, icon: CheckCircle, color: 'text-status-taken dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Pending', value: pending, icon: Clock, color: 'text-status-pending dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Missed', value: missed, icon: XCircle, color: 'text-status-missed dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp size={18} className="text-primary" />
          <h1 className="page-title">Today's Medicines</h1>
        </div>
        <p className="page-subtitle">{today} · Hello, {user?.name?.split(' ')[0]}!</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Quick message */}
      {pending > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl px-4 py-3 mb-6 transition-colors duration-300">
          <Clock size={16} className="text-status-pending dark:text-amber-400 flex-shrink-0" />
          <p className="text-sm text-amber-700 dark:text-amber-300">
            You have <span className="font-semibold">{pending} pending</span> medication{pending > 1 ? 's' : ''} today. Stay on track!
          </p>
        </div>
      )}

      {/* Medicine cards */}
      <div ref={cardsRef}>
        <h2 className="text-sm font-semibold text-text-primary mb-3">All Medications</h2>
        {medicines.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary-light dark:bg-primary/20 flex items-center justify-center mx-auto mb-4 transition-colors">
              <Pill size={24} className="text-primary dark:text-primary-light" />
            </div>
            <p className="font-medium text-text-primary mb-1">No medicines added</p>
            <p className="text-sm text-text-secondary">Add your first medicine to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {medicines.map((med, i) => (
              <MedicineCard key={med.id} medicine={med} index={i} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

