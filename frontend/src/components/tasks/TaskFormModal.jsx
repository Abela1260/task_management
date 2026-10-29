import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { PlusIcon, TrashIcon, CheckIcon, CalendarIcon } from '../icons/Icons';
import { USERS, INITIAL_CATEGORIES } from '../../data/mockTasks';
import { STATUS_CONFIG, PRIORITY_CONFIG } from '../../utils/constants';

export const TaskFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  defaultStatus = 'todo',
}) => {
  const isEditing = !!initialData;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(defaultStatus);
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('Frontend');
  const [dueDate, setDueDate] = useState('');
  const [assigneeId, setAssigneeId] = useState(USERS[0].id);
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [errors, setErrors] = useState({});

  // Reset or populate form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title || '');
        setDescription(initialData.description || '');
        setStatus(initialData.status || 'todo');
        setPriority(initialData.priority || 'medium');
        setCategory(initialData.category || 'Frontend');
        setDueDate(initialData.dueDate || '');
        setAssigneeId(initialData.assignee?.id || USERS[0].id);
        setSubtasks(initialData.subtasks ? [...initialData.subtasks] : []);
      } else {
        setTitle('');
        setDescription('');
        setStatus(defaultStatus || 'todo');
        setPriority('medium');
        setCategory('Frontend');
        // Set default due date to 3 days from now
        const d = new Date();
        d.setDate(d.getDate() + 3);
        setDueDate(d.toISOString().split('T')[0]);
        setAssigneeId(USERS[0].id);
        setSubtasks([]);
      }
      setNewSubtaskTitle('');
      setErrors({});
    }
  }, [isOpen, initialData, defaultStatus]);

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const assignee = USERS.find((u) => u.id === assigneeId) || USERS[0];

    const taskPayload = {
      ...(initialData || {}),
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      category,
      dueDate,
      assignee,
      subtasks,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    onSubmit(taskPayload);
    onClose();
  };

  // Subtask management
  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    const newSubtask = {
      id: 'sub-' + Date.now() + Math.random().toString(36).substr(2, 4),
      title: newSubtaskTitle.trim(),
      completed: false,
    };
    setSubtasks([...subtasks, newSubtask]);
    setNewSubtaskTitle('');
  };

  const handleToggleSubtask = (subtaskId) => {
    setSubtasks(
      subtasks.map((s) => (s.id === subtaskId ? { ...s, completed: !s.completed } : s))
    );
  };

  const handleDeleteSubtask = (subtaskId) => {
    setSubtasks(subtasks.filter((s) => s.id !== subtaskId));
  };

  // Quick date pickers
  const setQuickDate = (daysFromNow) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    setDueDate(d.toISOString().split('T')[0]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Task' : 'Create New Task'}
      subtitle={isEditing ? `Update task details for ${initialData?.id}` : 'Fill in the details below to add a task'}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Title Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Task Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: null });
            }}
            placeholder="e.g. Implement responsive user settings panel"
            className={`w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-800 border rounded-xl focus:outline-none focus:ring-2 text-slate-900 dark:text-slate-100 transition-colors ${
              errors.title
                ? 'border-rose-500 focus:ring-rose-500'
                : 'border-slate-300 dark:border-slate-700 focus:ring-indigo-500'
            }`}
          />
          {errors.title && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.title}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide context, acceptance criteria, or relevant technical details..."
            className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 resize-none transition-colors"
          />
        </div>

        {/* 2-Column Selectors: Status & Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Status */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 cursor-pointer"
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
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 cursor-pointer"
            >
              <option value="urgent">🔴 Urgent (Highest priority)</option>
              <option value="high">🟠 High</option>
              <option value="medium">🔵 Medium (Normal)</option>
              <option value="low">⚪ Low</option>
            </select>
          </div>
        </div>

        {/* 2-Column: Category & Assignee */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Department / Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 cursor-pointer"
            >
              {INITIAL_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Assignee
            </label>
            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 cursor-pointer"
            >
              {USERS.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.role})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Due Date with Quick Presets */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Due Date
            </label>
            <div className="flex items-center gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => setQuickDate(0)}
                className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-1.5 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Today
              </button>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <button
                type="button"
                onClick={() => setQuickDate(1)}
                className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-1.5 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Tomorrow
              </button>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <button
                type="button"
                onClick={() => setQuickDate(7)}
                className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium px-1.5 py-0.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                In 1 Week
              </button>
            </div>
          </div>
          <div className="relative">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100 cursor-pointer"
            />
          </div>
        </div>

        {/* Subtasks Section */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Checklist / Subtasks ({subtasks.filter((s) => s.completed).length}/{subtasks.length})
          </label>
          
          {/* Add Subtask Input */}
          <div className="flex gap-2 mb-2.5">
            <input
              type="text"
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSubtask();
                }
              }}
              placeholder="Add a checklist item (press Enter)..."
              className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon={PlusIcon}
              onClick={handleAddSubtask}
            >
              Add
            </Button>
          </div>

          {/* Subtasks List */}
          {subtasks.length > 0 && (
            <div className="space-y-1.5 max-h-36 overflow-y-auto p-1.5 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800">
              {subtasks.map((st) => (
                <div
                  key={st.id}
                  className="flex items-center justify-between gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200/60 dark:border-slate-700/60 text-xs"
                >
                  <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={st.completed}
                      onChange={() => handleToggleSubtask(st.id)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span
                      className={`truncate ${
                        st.completed
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-700 dark:text-slate-300 font-medium'
                      }`}
                    >
                      {st.title}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleDeleteSubtask(st.id)}
                    className="text-slate-400 hover:text-rose-500 p-1"
                  >
                    <TrashIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
