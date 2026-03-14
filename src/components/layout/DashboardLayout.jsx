import React, { useRef, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useApp } from '../../context/AppContext';
import { pageEnter } from '../../animations/gsapHelpers';
import Toast from '../common/Toast';

const DashboardLayout = ({ children }) => {
  const { toasts, removeToast } = useApp();
  const mainRef = useRef(null);

  useEffect(() => {
    pageEnter(mainRef.current);
  }, []);

  return (
    <div className="flex h-screen bg-background dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />
        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto p-4 lg:p-6"
          id="main-content"
        >
          {children}
        </main>
      </div>

      {/* Toast notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2" aria-live="polite">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </div>
  );
};

export default DashboardLayout;
