import React, { useState } from 'react';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../common/Badge';
import { Avatar } from '../common/Avatar';
import {
  CalendarIcon,
  CheckCircleIcon,
  CircleIcon,
  EditIcon,
  TrashIcon,
  CheckSquareIcon,
  MoreVerticalIcon,
} from '../icons/Icons';
import { getDueDateStatus, formatDate, STATUS_CONFIG } from '../../utils/constants';

export const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  onStatusChange,
  onClick,
}) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const isCompleted = task.status === 'completed';
  const dueDateInfo = getDueDateStatus(task.dueDate, task.status);

  // Subtasks progress
  const subtasks = task.subtasks || [];
  const completedSubtasks = subtasks.filter((s) => s.completed).length;
  const subtasksProgress = subtasks.length > 0 ? Math.round((completedSubtasks / subtasks.length) * 100) : 0;

  return (
    <div
      className={`group relative flex flex-col justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-200 hover:shadow-md ${
        isCompleted
          ? 'border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 opacity-90'
          : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700/60'
      }`}
    >
      <div>
        {/* Top Meta: Checkbox + ID + Badges + Actions */}
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete(task.id);
              }}
              title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
              className="text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              {isCompleted ? (
                <CheckCircleIcon className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
              ) : (
                <CircleIcon className="w-5 h-5 hover:text-indigo-600" />
              )}
            </button>
            <span className="text-[11px] font-mono font-medium text-slate-600 dark:text-slate-400">
              {task.id}
            </span>
            <CategoryBadge category={task.category} size="xs" />
          </div>

          <div className="flex items-center gap-1">
            <PriorityBadge priority={task.priority} size="xs" />
            
            {/* Quick Actions Dropdown / Buttons */}
            <div className="flex items-center opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
                className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                title="Edit task"
              >
                <EditIcon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id);
                }}
                className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                title="Delete task"
              >
                <TrashIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Task Title */}
        <h4
          onClick={() => onClick(task)}
          className={`text-sm font-semibold cursor-pointer transition-colors leading-snug mb-1.5 ${
            isCompleted
              ? 'line-through text-slate-400 dark:text-slate-500'
              : 'text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400'
          }`}
        >
          {task.title}
        </h4>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {task.description}
          </p>
        )}

        {/* Subtasks Progress Bar (if any) */}
        {subtasks.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
              <span className="flex items-center gap-1 font-medium">
                <CheckSquareIcon className="w-3 h-3 text-slate-400" />
                Subtasks
              </span>
              <span>
                {completedSubtasks}/{subtasks.length} ({subtasksProgress}%)
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                style={{ width: `${subtasksProgress}%` }}
                className={`h-full rounded-full transition-all duration-300 ${
                  subtasksProgress === 100 ? 'bg-emerald-500' : 'bg-indigo-500'
                }`}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer: Due date + Status selector + Assignee */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
        {/* Due Date Indicator */}
        <div className="flex items-center gap-1.5">
          <CalendarIcon className={`w-3.5 h-3.5 ${dueDateInfo.isOverdue ? 'text-rose-500' : 'text-slate-400'}`} />
          <span
            className={`text-[11px] font-medium ${
              dueDateInfo.isOverdue
                ? 'text-rose-600 dark:text-rose-400 font-semibold'
                : dueDateInfo.isDueSoon
                ? 'text-amber-600 dark:text-amber-400 font-semibold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {dueDateInfo.text || formatDate(task.dueDate)}
          </span>
        </div>

        {/* Status Dropdown / Assignee */}
        <div className="flex items-center gap-2">
          {/* Quick status dropdown */}
          <select
            value={task.status}
            onChange={(e) => {
              e.stopPropagation();
              onStatusChange(task.id, e.target.value);
            }}
            className="text-[11px] font-medium rounded-lg px-2 py-0.5 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
          >
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>

          {/* Assignee Avatar */}
          <Avatar user={task.assignee} size="sm" />
        </div>
      </div>
    </div>
  );
};
