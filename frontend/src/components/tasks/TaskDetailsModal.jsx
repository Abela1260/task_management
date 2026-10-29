import React from 'react';
import { Modal } from '../common/Modal';
import { StatusBadge, PriorityBadge, CategoryBadge } from '../common/Badge';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import {
  CalendarIcon,
  CheckCircleIcon,
  CircleIcon,
  EditIcon,
  TrashIcon,
  ClockIcon,
  TagIcon,
  UserIcon,
} from '../icons/Icons';
import { formatDate, getDueDateStatus, STATUS_CONFIG } from '../../utils/constants';

export const TaskDetailsModal = ({
  isOpen,
  task,
  onClose,
  onEdit,
  onDelete,
  onToggleComplete,
  onStatusChange,
  onToggleSubtask,
}) => {
  if (!task) return null;

  const isCompleted = task.status === 'completed';
  const dueDateInfo = getDueDateStatus(task.dueDate, task.status);
  const subtasks = task.subtasks || [];
  const completedSubtasks = subtasks.filter((s) => s.completed).length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
            {task.id}
          </span>
          <CategoryBadge category={task.category} size="xs" />
        </div>
      }
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        {/* Title & Complete Checkbox */}
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => onToggleComplete(task.id)}
            className="mt-1 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer flex-shrink-0"
            title={isCompleted ? 'Mark incomplete' : 'Mark complete'}
          >
            {isCompleted ? (
              <CheckCircleIcon className="w-6 h-6 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
            ) : (
              <CircleIcon className="w-6 h-6 hover:text-indigo-600" />
            )}
          </button>
          <div>
            <h3
              className={`text-lg font-bold ${
                isCompleted
                  ? 'line-through text-slate-400 dark:text-slate-500'
                  : 'text-slate-900 dark:text-slate-100'
              }`}
            >
              {task.title}
            </h3>
            {task.createdAt && (
              <p className="text-xs text-slate-400 mt-1">
                Created on {formatDate(task.createdAt)}
              </p>
            )}
          </div>
        </div>

        {/* Quick Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/70 dark:border-slate-800 text-xs">
          {/* Status */}
          <div>
            <span className="text-[11px] text-slate-400 font-medium block mb-1">Status</span>
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              className="text-xs font-medium rounded-lg px-2 py-1 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
            >
              {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <span className="text-[11px] text-slate-400 font-medium block mb-1">Priority</span>
            <PriorityBadge priority={task.priority} size="sm" />
          </div>

          {/* Due Date */}
          <div>
            <span className="text-[11px] text-slate-400 font-medium block mb-1">Due Date</span>
            <div className="flex items-center gap-1.5 font-medium">
              <CalendarIcon className={`w-3.5 h-3.5 ${dueDateInfo.isOverdue ? 'text-rose-500' : 'text-slate-400'}`} />
              <span
                className={
                  dueDateInfo.isOverdue
                    ? 'text-rose-600 dark:text-rose-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300'
                }
              >
                {formatDate(task.dueDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Description
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed bg-white dark:bg-slate-800/30 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
            {task.description || 'No description provided.'}
          </p>
        </div>

        {/* Assignee Card */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Assignee
          </h4>
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <Avatar user={task.assignee} size="lg" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {task.assignee?.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {task.assignee?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Subtasks Checklist */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Checklist & Subtasks
            </h4>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {completedSubtasks} of {subtasks.length} done
            </span>
          </div>

          {subtasks.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No checklist items for this task.</p>
          ) : (
            <div className="space-y-1.5 bg-slate-50 dark:bg-slate-850 p-2 rounded-xl border border-slate-200/70 dark:border-slate-800">
              {subtasks.map((st) => (
                <label
                  key={st.id}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100/50 dark:hover:bg-slate-750 transition-colors cursor-pointer border border-slate-200/50 dark:border-slate-700/50"
                >
                  <input
                    type="checkbox"
                    checked={st.completed}
                    onChange={() => onToggleSubtask(task.id, st.id)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span
                    className={`text-xs ${
                      st.completed
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-200 font-medium'
                    }`}
                  >
                    {st.title}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <Button
            variant="danger"
            size="sm"
            icon={TrashIcon}
            onClick={() => {
              onDelete(task.id);
              onClose();
            }}
          >
            Delete Task
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={EditIcon}
              onClick={() => {
                onEdit(task);
                onClose();
              }}
            >
              Edit Task
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
