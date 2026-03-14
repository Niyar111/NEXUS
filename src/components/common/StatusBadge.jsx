import React from 'react';
import { capitalize, getStatusClasses } from '../../utils/helpers';

const StatusBadge = ({ status, size = 'sm' }) => {
  const classes = getStatusClasses(status);
  const sizeClasses = size === 'sm' ? 'text-xs px-2.5 py-1' : 'text-sm px-3 py-1.5';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium border
        ${classes.bg} ${classes.text} ${classes.border} ${sizeClasses}`}
      aria-label={`Status: ${status}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${classes.dot}`} aria-hidden="true" />
      {capitalize(status)}
    </span>
  );
};

export default StatusBadge;
