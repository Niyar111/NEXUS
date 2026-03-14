import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg mb-4">
            <span className="text-white text-xl font-bold">N</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary dark:text-white">Nexus</h1>
          <p className="text-text-secondary dark:text-slate-400 text-sm mt-1">Intelligent Medication System</p>
        </div>

        <div className="card p-8 shadow-card-hover">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
