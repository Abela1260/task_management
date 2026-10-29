import React from 'react';
import {
  LayersIcon,
  CircleIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  FolderIcon,
  BarChartIcon,
  CheckSquareIcon,
} from '../icons/Icons';
import { Avatar } from '../common/Avatar';
import { USERS, INITIAL_CATEGORIES } from '../../data/mockTasks';

export const Sidebar = ({
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  stats,
  categoryCounts = {},
  className = '',
}) => {
  const mainNavItems = [
    { id: 'all', label: 'All Tasks', icon: LayersIcon, count: stats.total },
    { id: 'todo', label: 'To Do', icon: CircleIcon, count: stats.todo, color: 'text-slate-400' },
    { id: 'in-progress', label: 'In Progress', icon: ClockIcon, count: stats.inProgress, color: 'text-blue-500' },
    { id: 'review', label: 'In Review', icon: CheckSquareIcon, count: stats.review, color: 'text-purple-500' },
    { id: 'completed', label: 'Completed', icon: CheckCircleIcon, count: stats.completed, color: 'text-emerald-500' },
    { id: 'urgent-high', label: 'Urgent & High', icon: AlertTriangleIcon, count: stats.urgent + stats.high, color: 'text-rose-500' },
  ];

  return (
    <aside
      className={`w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between h-full select-none ${className}`}
    >
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <LayersIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-none">
              TaskFlow
            </h2>
            <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
              Modern Task Management
            </span>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {/* Main Status Views */}
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Pipeline Views
            </p>
            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = statusFilter === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onStatusChange(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <IconComponent className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : item.color || 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Department / Category Filter */}
          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Departments
              </p>
              {categoryFilter !== 'all' && (
                <button
                  onClick={() => onCategoryChange('all')}
                  className="text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            <nav className="space-y-0.5">
              {INITIAL_CATEGORIES.filter((c) => c !== 'All').map((cat) => {
                const isCatActive = categoryFilter === cat;
                const count = categoryCounts[cat] || 0;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => onCategoryChange(isCatActive ? 'all' : cat)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-all ${
                      isCatActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <FolderIcon className={`w-3.5 h-3.5 ${isCatActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span className="truncate">{cat}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* User Card at bottom */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
          <div className="relative">
            <Avatar user={USERS[0]} size="md" />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
              {USERS[0].name}
            </p>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 truncate">
              {USERS[0].role}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
