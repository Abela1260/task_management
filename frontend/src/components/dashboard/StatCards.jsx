import React from 'react';
import {
  LayersIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertTriangleIcon,
  CircleIcon,
  AlertCircleIcon,
} from '../icons/Icons';

export const StatCards = ({ stats, activeFilter, onSelectFilter }) => {
  const cards = [
    {
      id: 'all',
      title: 'Total Tasks',
      value: stats.total,
      subtext: `${stats.completionRate}% completed`,
      icon: LayersIcon,
      color: 'indigo',
      activeBorder: 'ring-indigo-500 border-indigo-500',
      badgeClass: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300',
      iconBg: 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400',
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      value: stats.inProgress,
      subtext: `${Math.round((stats.inProgress / (stats.total || 1)) * 100)}% of workload`,
      icon: ClockIcon,
      color: 'blue',
      activeBorder: 'ring-blue-500 border-blue-500',
      badgeClass: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
      iconBg: 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
    },
    {
      id: 'todo',
      title: 'To Do',
      value: stats.todo,
      subtext: 'Pending kickoff',
      icon: CircleIcon,
      color: 'slate',
      activeBorder: 'ring-slate-500 border-slate-500',
      badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
      iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    },
    {
      id: 'completed',
      title: 'Completed',
      value: stats.completed,
      subtext: `${stats.completed}/${stats.total} tasks resolved`,
      icon: CheckCircleIcon,
      color: 'emerald',
      activeBorder: 'ring-emerald-500 border-emerald-500',
      badgeClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'urgent-high',
      title: 'Urgent & High',
      value: stats.urgent + stats.high,
      subtext: `${stats.urgent} critical priority`,
      icon: AlertTriangleIcon,
      color: 'amber',
      activeBorder: 'ring-amber-500 border-amber-500',
      badgeClass: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
      iconBg: 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400',
    },
    {
      id: 'overdue',
      title: 'Overdue',
      value: stats.overdue,
      subtext: stats.overdue > 0 ? 'Requires attention' : 'All on track',
      icon: AlertCircleIcon,
      color: 'rose',
      activeBorder: 'ring-rose-500 border-rose-500',
      badgeClass: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300',
      iconBg: 'bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {cards.map((card) => {
        const IconComponent = card.icon;
        const isSelected = activeFilter === card.id;

        return (
          <div
            key={card.id}
            onClick={() => onSelectFilter(card.id)}
            className={`cursor-pointer group relative p-4 rounded-xl bg-white dark:bg-slate-900 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
              isSelected
                ? `ring-2 ${card.activeBorder} shadow-sm`
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
                {card.title}
              </span>
              <div className={`p-1.5 rounded-lg ${card.iconBg} transition-transform group-hover:scale-110`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {card.value}
              </div>
            </div>

            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1 truncate">
              {card.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
};
