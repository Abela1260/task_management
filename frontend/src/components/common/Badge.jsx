import React from 'react';
import { STATUS_CONFIG, PRIORITY_CONFIG, CATEGORY_COLORS } from '../../utils/constants';

export const StatusBadge = ({ status, size = 'sm' }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.todo;
  const sizeClasses = size === 'xs' 
    ? 'px-2 py-0.5 text-xs font-medium' 
    : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full transition-colors ${config.badge} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};

export const PriorityBadge = ({ priority, size = 'sm' }) => {
  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.medium;
  const sizeClasses = size === 'xs' 
    ? 'px-2 py-0.5 text-xs font-medium' 
    : 'px-2.5 py-1 text-xs font-semibold';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full transition-colors ${config.badge} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};

export const CategoryBadge = ({ category, size = 'sm' }) => {
  const colorClass = CATEGORY_COLORS[category] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
  const sizeClasses = size === 'xs' 
    ? 'px-2 py-0.5 text-xs font-medium' 
    : 'px-2.5 py-0.5 text-xs font-medium';

  return (
    <span className={`inline-flex items-center rounded-md border font-medium ${colorClass} ${sizeClasses}`}>
      {category}
    </span>
  );
};
