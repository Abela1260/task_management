import React from 'react';
import { TaskCard } from './TaskCard';
import { STATUS_CONFIG } from '../../utils/constants';
import { PlusIcon } from '../icons/Icons';

export const TaskBoard = ({
  tasks = [],
  onEditTask,
  onDeleteTask,
  onToggleComplete,
  onStatusChange,
  onTaskClick,
  onAddNewWithStatus,
}) => {
  const columns = [
    { id: 'todo', label: STATUS_CONFIG.todo.label, dot: STATUS_CONFIG.todo.dot },
    { id: 'in-progress', label: STATUS_CONFIG['in-progress'].label, dot: STATUS_CONFIG['in-progress'].dot },
    { id: 'review', label: STATUS_CONFIG.review.label, dot: STATUS_CONFIG.review.dot },
    { id: 'completed', label: STATUS_CONFIG.completed.label, dot: STATUS_CONFIG.completed.dot },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
      {columns.map((column) => {
        const columnTasks = tasks.filter((t) => t.status === column.id);

        return (
          <div
            key={column.id}
            className="flex flex-col rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 p-3 sm:p-3.5 border border-slate-200/60 dark:border-slate-800/60 min-h-[420px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200/60 dark:border-slate-800/60">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${column.dot}`} />
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  {column.label}
                </h3>
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  {columnTasks.length}
                </span>
              </div>

              {/* Quick Add in this status */}
              <button
                type="button"
                onClick={() => onAddNewWithStatus(column.id)}
                className="p-1 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                title={`Add task to ${column.label}`}
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Task Cards in Column */}
            <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
              {columnTasks.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-slate-200/80 dark:border-slate-800/80 rounded-xl my-2">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    No {column.label.toLowerCase()} tasks
                  </p>
                  <button
                    onClick={() => onAddNewWithStatus(column.id)}
                    className="mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    + Create one
                  </button>
                </div>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                    onToggleComplete={onToggleComplete}
                    onStatusChange={onStatusChange}
                    onClick={onTaskClick}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
