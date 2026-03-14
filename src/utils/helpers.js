/**
 * Format time from "HH:MM" to "HH:MM AM/PM"
 */
export const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  return `${h.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

/**
 * Format frequency label
 */
export const formatFrequency = (freq) => {
  const map = {
    daily: 'Once Daily',
    twice_daily: 'Twice Daily',
    three_times: 'Three Times Daily',
    weekly: 'Weekly',
    as_needed: 'As Needed',
  };
  return map[freq] || freq;
};

/**
 * Get status color classes
 */
export const getStatusClasses = (status) => {
  switch (status) {
    case 'taken':
      return { bg: 'bg-emerald-50 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800', dot: 'bg-status-taken' };
    case 'pending':
      return { bg: 'bg-amber-50 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800', dot: 'bg-status-pending' };
    case 'missed':
      return { bg: 'bg-red-50 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', border: 'border-red-200 dark:border-red-800', dot: 'bg-status-missed' };
    default:
      return { bg: 'bg-slate-50 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-300', border: 'border-slate-200 dark:border-slate-700', dot: 'bg-slate-400 dark:bg-slate-500' };
  }
};

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format date to readable string
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

/**
 * Get today's date as YYYY-MM-DD
 */
export const getTodayString = () => new Date().toISOString().split('T')[0];

/**
 * Validate email format
 */
export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/**
 * Generate initials from name
 */
export const getInitials = (name) => {
  if (!name) return 'U';
  return name.split(' ').map((p) => p[0]).join('').toUpperCase().slice(0, 2);
};
