import React from 'react';
import { TaskRow } from './TaskRow';
import { EmptyState } from '../common/EmptyState';

export const TaskList = ({
  tasks = [],
  onEditTask,
  onDeleteTask,
  onToggleComplete,
  onStatusChange,
  onTaskClick,
  onAddNew,
  onClearFilters,
  hasActiveFilters,
}) => {
  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks match your filters"
        description="Try clearing your search query, selecting another category, or creating a new task."
        actionLabel="Create New Task"
        onAction={onAddNew}
        secondaryActionLabel={hasActiveFilters ? 'Clear Filters' : undefined}
        onSecondaryAction={hasActiveFilters ? onClearFilters : undefined}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
      {/* Table Header (hidden on mobile, visible on desktop) */}
      <div className="hidden sm:flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        <div className="flex-1">Task Details</div>
        <div className="flex items-center justify-end gap-4 flex-shrink-0">
          <div className="w-20 text-center">Priority</div>
          <div className="w-28 text-left">Status</div>
          <div className="w-24 text-left">Due Date</div>
          <div className="w-8 text-center">Assignee</div>
          <div className="w-14 text-right pr-2">Actions</div>
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {tasks.map((task) => (
          <TaskRow
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onToggleComplete={onToggleComplete}
            onStatusChange={onStatusChange}
            onClick={onTaskClick}
          />
        ))}
      </div>
    </div>
  );
};
