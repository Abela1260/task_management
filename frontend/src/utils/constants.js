export const STATUS_CONFIG = {
  todo: {
    label: 'To Do',
    badge: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700',
    dot: 'bg-slate-400',
    columnBg: 'bg-slate-50/70 dark:bg-slate-900/50',
    columnBorder: 'border-slate-200/80 dark:border-slate-800',
    accentColor: 'slate',
  },
  'in-progress': {
    label: 'In Progress',
    badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
    dot: 'bg-blue-500',
    columnBg: 'bg-blue-50/30 dark:bg-blue-950/20',
    columnBorder: 'border-blue-200/60 dark:border-blue-800/60',
    accentColor: 'blue',
  },
  review: {
    label: 'In Review',
    badge: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
    dot: 'bg-purple-500',
    columnBg: 'bg-purple-50/30 dark:bg-purple-950/20',
    columnBorder: 'border-purple-200/60 dark:border-purple-800/60',
    accentColor: 'purple',
  },
  completed: {
    label: 'Completed',
    badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    dot: 'bg-emerald-500',
    columnBg: 'bg-emerald-50/30 dark:bg-emerald-950/20',
    columnBorder: 'border-emerald-200/60 dark:border-emerald-800/60',
    accentColor: 'emerald',
  },
};

export const PRIORITY_CONFIG = {
  urgent: {
    label: 'Urgent',
    badge: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
    color: 'text-rose-600 dark:text-rose-400',
    dot: 'bg-rose-500',
    level: 4,
  },
  high: {
    label: 'High',
    badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    color: 'text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500',
    level: 3,
  },
  medium: {
    label: 'Medium',
    badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
    color: 'text-blue-600 dark:text-blue-400',
    dot: 'bg-blue-500',
    level: 2,
  },
  low: {
    label: 'Low',
    badge: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700',
    color: 'text-slate-500 dark:text-slate-400',
    dot: 'bg-slate-400',
    level: 1,
  },
};

export const CATEGORY_COLORS = {
  Design: 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800',
  Frontend: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border-sky-200 dark:border-sky-800',
  Backend: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
  DevOps: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800',
  Marketing: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  Product: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200 dark:border-teal-800',
};

export const formatDate = (dateString) => {
  if (!dateString) return 'No due date';
  try {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateString;
  }
};

export const getDueDateStatus = (dueDate, status) => {
  if (!dueDate || status === 'completed') return { isOverdue: false, isDueSoon: false, text: '' };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const due = new Date(dueDate + 'T00:00:00');
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { isOverdue: true, isDueSoon: false, text: `${Math.abs(diffDays)}d overdue` };
  } else if (diffDays === 0) {
    return { isOverdue: false, isDueSoon: true, text: 'Due today' };
  } else if (diffDays === 1) {
    return { isOverdue: false, isDueSoon: true, text: 'Due tomorrow' };
  } else if (diffDays <= 3) {
    return { isOverdue: false, isDueSoon: true, text: `Due in ${diffDays}d` };
  }
  return { isOverdue: false, isDueSoon: false, text: '' };
};
