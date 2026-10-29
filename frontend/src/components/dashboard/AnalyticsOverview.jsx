import React from 'react';
import { TrendingUpIcon, BarChartIcon } from '../icons/Icons';
import { STATUS_CONFIG, PRIORITY_CONFIG } from '../../utils/constants';

export const AnalyticsOverview = ({ stats, categoryStats = [] }) => {
  const total = stats.total || 1;

  // Percentage calculations
  const todoPct = Math.round((stats.todo / total) * 100);
  const inProgressPct = Math.round((stats.inProgress / total) * 100);
  const reviewPct = Math.round((stats.review / total) * 100);
  const completedPct = Math.round((stats.completed / total) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Overall Progress & Status Distribution */}
      <div className="lg:col-span-2 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <TrendingUpIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Project Velocity & Status Breakdown
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Real-time task distribution across pipeline stages
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {stats.completionRate}%
            </span>
            <span className="block text-[11px] text-slate-400 font-medium">Resolution Rate</span>
          </div>
        </div>

        {/* Multi-segmented Progress Bar */}
        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex my-3">
          <div
            style={{ width: `${completedPct}%` }}
            title={`Completed: ${stats.completed} (${completedPct}%)`}
            className="bg-emerald-500 transition-all duration-500"
          />
          <div
            style={{ width: `${inProgressPct}%` }}
            title={`In Progress: ${stats.inProgress} (${inProgressPct}%)`}
            className="bg-blue-500 transition-all duration-500"
          />
          <div
            style={{ width: `${reviewPct}%` }}
            title={`In Review: ${stats.review} (${reviewPct}%)`}
            className="bg-purple-500 transition-all duration-500"
          />
          <div
            style={{ width: `${todoPct}%` }}
            title={`To Do: ${stats.todo} (${todoPct}%)`}
            className="bg-slate-300 dark:bg-slate-600 transition-all duration-500"
          />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400">Completed:</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              {stats.completed} ({completedPct}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-slate-600 dark:text-slate-400">In Progress:</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              {stats.inProgress} ({inProgressPct}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span className="text-slate-600 dark:text-slate-400">Review:</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              {stats.review} ({reviewPct}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="text-slate-600 dark:text-slate-400">To Do:</span>
            <span className="font-semibold text-slate-900 dark:text-slate-200">
              {stats.todo} ({todoPct}%)
            </span>
          </div>
        </div>
      </div>

      {/* Priority Distribution */}
      <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <BarChartIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Priority Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Workload urgency breakdown
              </p>
            </div>
          </div>

          <div className="space-y-2.5 mt-4">
            {[
              { key: 'urgent', label: 'Urgent', count: stats.urgent, color: 'bg-rose-500', barBg: 'bg-rose-100 dark:bg-rose-950/50' },
              { key: 'high', label: 'High', count: stats.high, color: 'bg-amber-500', barBg: 'bg-amber-100 dark:bg-amber-950/50' },
              { key: 'medium', label: 'Medium', count: stats.medium, color: 'bg-blue-500', barBg: 'bg-blue-100 dark:bg-blue-950/50' },
              { key: 'low', label: 'Low', count: stats.low, color: 'bg-slate-400', barBg: 'bg-slate-100 dark:bg-slate-800' },
            ].map((p) => {
              const pct = Math.round((p.count / total) * 100);
              return (
                <div key={p.key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${p.color}`} />
                      {p.label}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {p.count} <span className="text-[10px] text-slate-400">({pct}%)</span>
                    </span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full ${p.barBg} overflow-hidden`}>
                    <div
                      style={{ width: `${pct}%` }}
                      className={`h-full ${p.color} rounded-full transition-all duration-300`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
