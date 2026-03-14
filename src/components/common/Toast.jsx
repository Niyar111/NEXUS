import React, { useEffect, useRef } from 'react';
import { CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { gsap } from 'gsap';

const icons = {
  success: <CheckCircle size={16} className="text-status-taken" />,
  error: <AlertTriangle size={16} className="text-status-missed" />,
  info: <Info size={16} className="text-primary" />,
  warning: <AlertTriangle size={16} className="text-status-pending" />,
};

const bgColors = {
  success: 'border-l-status-taken bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-700',
  error: 'border-l-status-missed bg-red-50 dark:bg-red-900/20 dark:border-red-700',
  info: 'border-l-primary bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700',
  warning: 'border-l-status-pending bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700',
};

const Toast = ({ toast, onClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
  }, []);

  const handleClose = () => {
    gsap.to(ref.current, {
      x: 60,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={`flex items-start gap-3 min-w-72 max-w-sm pl-4 pr-3 py-3 bg-white rounded-xl shadow-card-hover border border-card-border border-l-4 ${bgColors[toast.type] || bgColors.info}`}
    >
      <span className="mt-0.5 flex-shrink-0">{icons[toast.type] || icons.info}</span>
      <p className="text-sm text-text-primary flex-1">{toast.message}</p>
      <button
        onClick={handleClose}
        className="p-0.5 rounded text-text-secondary hover:text-text-primary transition-colors"
        aria-label="Close notification"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;
