import React, { useEffect, useRef } from 'react';
import CaregiverCard from './CaregiverCard';
import { Users } from 'lucide-react';
import { gsap } from 'gsap';

const CaregiverList = ({ caregivers, loading, onDelete }) => {
  const listRef = useRef(null);

  useEffect(() => {
    if (caregivers.length > 0) {
      gsap.fromTo(
        '.cg-card',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [caregivers.length]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (caregivers.length === 0) {
    return (
      <div className="card p-12 text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary-light dark:bg-primary/20 flex items-center justify-center mx-auto mb-4 transition-colors">
          <Users size={24} className="text-primary dark:text-primary-light" />
        </div>
        <p className="font-medium text-text-primary mb-1">No caregivers added</p>
        <p className="text-sm text-text-secondary max-w-sm mx-auto">
          Add a trusted family member or caregiver to monitor your medication adherence.
        </p>
      </div>
    );
  }

  return (
    <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {caregivers.map((cg) => (
        <CaregiverCard key={cg.id || cg._id} caregiver={cg} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default CaregiverList;
