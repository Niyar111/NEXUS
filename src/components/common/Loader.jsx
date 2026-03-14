import React from 'react';

const Loader = ({ fullScreen = false, message = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <span className="text-white text-lg font-bold">N</span>
          </div>
          <div>
            <p className="font-bold text-text-primary text-lg">Nexus</p>
            <p className="text-sm text-text-secondary">Intelligent Medication System</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-sm text-text-secondary mt-4">{message}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
