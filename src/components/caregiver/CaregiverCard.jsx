import React from 'react';
import { UserPlus, User, Trash2 } from 'lucide-react';

const CaregiverCard = ({ caregiver, onDelete }) => {
  const { id, _id, name, email, relationship } = caregiver;
  const targetId = id || _id;

  return (
    <div className="cg-card card p-5 relative group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      {/* Decorative top border mapping to relationship */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-70" />
      
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 transition-colors">
            <User size={20} className="text-text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary text-base mb-0.5">{name}</h3>
            <p className="text-xs text-text-secondary">{email}</p>
          </div>
        </div>
        
        <button
          onClick={() => onDelete(targetId)}
          className="p-2 rounded-xl text-text-secondary opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-status-missed dark:hover:text-red-400 transition-all focus:opacity-100"
          aria-label={`Remove ${name}`}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-5 pt-4 border-t border-card-border flex items-center gap-2">
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-primary-light dark:bg-primary/20 text-primary dark:text-primary-light transition-colors">
          Relationship: {relationship || 'N/A'}
        </span>
      </div>
    </div>
  );
};

export default CaregiverCard;
