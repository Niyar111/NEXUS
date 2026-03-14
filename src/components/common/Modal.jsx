import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(
        dialogRef.current,
        { opacity: 0, y: -20, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(dialogRef.current, {
      opacity: 0, y: -10, scale: 0.98, duration: 0.2, ease: 'power2.in',
      onComplete: onClose,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === overlayRef.current && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={dialogRef}
        className={`bg-card rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto border border-card-border`}
      >
        <div className="flex items-center justify-between p-5 border-b border-card-border">
          <h2 id="modal-title" className="text-base font-semibold text-text-primary">{title}</h2>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-text-secondary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
