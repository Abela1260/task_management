import React from 'react';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../common/Badge';
import { Avatar } from '../common/Avatar';
import {
  CalendarIcon,
  CheckCircleIcon,
  CircleIcon,
  EditIcon,
  TrashIcon,
  CheckSquareIcon,
} from '../icons/Icons';
import { getDueDateStatus, formatDate, STATUS_CONFIG } from '../../utils/constants';

export const TaskRow = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  onStatusChange,
  onClick,
}) => {
  const isCompleted = task.status === 'completed';
  const dueDateInfo = getDueDateStatus(task.dueDate, task.status);
  const subtasks = task.subtasks || [];
  const completedSubtasks = subtasks.filter((s) => s.completed).length;

  return (
    <div
      onClick={() => onClick(task)}
      className={`group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:px-4 sm:py-3 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer gap-3 sm:gap-4 ${
        isCompleted ? 'bg-slate-50/50 dark:bg-slate-900/40 opacity-80' : ''
      }`}
    >
      {/* Left section: Checkbox, Title, Category, Subtasks count */}
      <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleComplete(task.id);
          }}
          className="text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer flex-shrink-0 mt-0.5 sm:mt-0"
        >
          {isCompleted ? (
            <CheckCircleIcon className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
          ) : (
            <CircleIcon className="w-5 h-5 hover:text-indigo-600" />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-[11px] font-mono font-medium text-slate-600 dark:text-slate-400">
              {task.id}
            </span>
            <CategoryBadge category={task.category} size="xs" />
            {subtasks.length > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                <CheckSquareIcon className="w-3 h-3 text-slate-500" />
                {completedSubtasks}/{subtasks.length}
              </span>
            )}
          </div>
          <p
            className={`text-sm font-semibold truncate ${
              isCompleted
                ? 'line-through text-slate-400 dark:text-slate-500'
                : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            {task.title}
          </p>
        </div>
      </div>

      {/* Right section: Priority, Status selector, Due Date, Assignee, Actions */}
      <div
        className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 flex-shrink-0 text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Priority Badge */}
        <div className="w-20 text-center flex-shrink-0">
          <PriorityBadge priority={task.priority} size="xs" />
        </div>

        {/* Status Dropdown */}
        <div className="w-28 flex-shrink-0">
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className="w-full text-xs font-medium rounded-lg px-2 py-1 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div className="w-24 flex items-center gap-1 text-[11px] flex-shrink-0">
          <CalendarIcon className={`w-3.5 h-3.5 ${dueDateInfo.isOverdue ? 'text-rose-500' : 'text-slate-400'}`} />
          <span
            className={`truncate font-medium ${
              dueDateInfo.isOverdue
                ? 'text-rose-600 dark:text-rose-400 font-bold'
                : dueDateInfo.isDueSoon
                ? 'text-amber-600 dark:text-amber-400 font-semibold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {dueDateInfo.text || formatDate(task.dueDate)}
          </span>
        </div>

        {/* Assignee */}
        <div className="w-8 flex justify-center flex-shrink-0">
          <Avatar user={task.assignee} size="sm" />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Edit task"
          >
            <EditIcon className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Delete task"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
