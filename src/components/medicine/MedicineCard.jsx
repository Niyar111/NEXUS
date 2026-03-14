import React, { useRef, useEffect } from 'react';
import { Clock, Pill, ChevronRight, Check, AlarmClock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTime, formatFrequency } from '../../utils/helpers';
import StatusBadge from '../common/StatusBadge';

const MedicineCard = ({ medicine, index = 0 }) => {
  const { markTaken, snoozeMedicine } = useApp();
  const cardRef = useRef(null);

  const { id, name, dosage, time, frequency, instructions, status, category } = medicine;

  const categoryColors = {
    Diabetes: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    'Blood Pressure': 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    Cholesterol: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    Heart: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    Supplement: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  };

  return (
    <div
      ref={cardRef}
      className="med-card card p-5 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 group"
      data-medicine-id={id}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-light dark:bg-primary/20 flex items-center justify-center flex-shrink-0 transition-colors">
            <Pill size={18} className="text-primary dark:text-primary-light" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary text-sm leading-tight">{name}</h3>
            <p className="text-xs text-text-secondary mt-0.5">{dosage}</p>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Details */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
          <Clock size={13} />
          <span>{formatTime(time)}</span>
        </div>
        <div className="text-xs text-text-secondary">
          {formatFrequency(frequency)}
        </div>
        {category && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[category] || 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
            {category}
          </span>
        )}
      </div>

      {instructions && (
        <p className="text-xs text-text-secondary bg-slate-50 dark:bg-slate-900/50 rounded-lg px-3 py-2 mb-4 border border-card-border">
          {instructions}
        </p>
      )}

      {/* Actions */}
      {status !== 'taken' && (
        <div className="flex gap-2">
          <button
            onClick={() => markTaken(id)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-secondary/10 dark:bg-secondary/20 hover:bg-secondary text-secondary dark:text-emerald-400 hover:text-white text-xs font-medium py-2 rounded-xl border border-secondary/20 dark:border-secondary/30 hover:border-secondary transition-all duration-200 active:scale-95"
            id={`mark-taken-${id}`}
            aria-label={`Mark ${name} as taken`}
          >
            <Check size={14} />
            Mark Taken
          </button>
          <button
            onClick={() => snoozeMedicine(id)}
            className="flex items-center justify-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-xs font-medium px-3 py-2 rounded-xl border border-amber-200 dark:border-amber-800/50 transition-all duration-200 active:scale-95"
            id={`snooze-${id}`}
            aria-label={`Snooze ${name} reminder`}
          >
            <AlarmClock size={14} />
            Snooze
          </button>
        </div>
      )}

      {status === 'taken' && (
        <div className="flex items-center gap-1.5 text-xs text-status-taken dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl px-3 py-2 border border-emerald-100 dark:border-emerald-800/50">
          <Check size={13} />
          <span>Taken successfully</span>
        </div>
      )}
    </div>
  );
};

export default MedicineCard;
