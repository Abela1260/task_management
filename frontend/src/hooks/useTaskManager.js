import { useState, useMemo, useEffect, useCallback } from 'react';
import { INITIAL_TASKS, USERS } from '../data/mockTasks';
import { PRIORITY_CONFIG, getDueDateStatus } from '../utils/constants';

const STORAGE_KEY = 'TASKFLOW_LOCAL_STATE_TASKS';
const THEME_KEY = 'TASKFLOW_THEME_DARK';

export const useTaskManager = () => {
  // Initialize tasks from localStorage or default mock data
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Local state fallback
    }
    return INITIAL_TASKS;
  });

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch {
      // Default to false or system
    }
    return false;
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('due-asc');
  const [viewMode, setViewMode] = useState('board'); // 'board' or 'list'

  // Modal & Drawer UI states
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'create', // 'create' or 'edit'
    task: null,
    defaultStatus: 'todo',
  });

  const [detailsTask, setDetailsTask] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((title, message, type = 'success') => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Ignore storage errors
    }
  }, [tasks]);

  // Dark Mode class synchronization
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem(THEME_KEY, JSON.stringify(isDarkMode));
    } catch {
      // Ignore
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = tasks.length;
    let completed = 0;
    let inProgress = 0;
    let review = 0;
    let todo = 0;
    let urgent = 0;
    let high = 0;
    let medium = 0;
    let low = 0;
    let overdue = 0;

    tasks.forEach((t) => {
      if (t.status === 'completed') completed++;
      else if (t.status === 'in-progress') inProgress++;
      else if (t.status === 'review') review++;
      else if (t.status === 'todo') todo++;

      if (t.priority === 'urgent') urgent++;
      else if (t.priority === 'high') high++;
      else if (t.priority === 'medium') medium++;
      else if (t.priority === 'low') low++;

      const dueInfo = getDueDateStatus(t.dueDate, t.status);
      if (dueInfo.isOverdue) overdue++;
    });

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      inProgress,
      review,
      todo,
      urgent,
      high,
      medium,
      low,
      overdue,
      completionRate,
    };
  }, [tasks]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = {};
    tasks.forEach((t) => {
      if (t.category) {
        counts[t.category] = (counts[t.category] || 0) + 1;
      }
    });
    return counts;
  }, [tasks]);

  // Filtered & Sorted Tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Status filter
        if (statusFilter === 'urgent-high') {
          if (task.priority !== 'urgent' && task.priority !== 'high') return false;
        } else if (statusFilter === 'overdue') {
          const due = getDueDateStatus(task.dueDate, task.status);
          if (!due.isOverdue) return false;
        } else if (statusFilter !== 'all' && task.status !== statusFilter) {
          return false;
        }

        // Priority filter
        if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
          return false;
        }

        // Category filter
        if (categoryFilter !== 'all' && task.category !== categoryFilter) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchTitle = task.title.toLowerCase().includes(query);
          const matchDesc = task.description?.toLowerCase().includes(query);
          const matchCategory = task.category?.toLowerCase().includes(query);
          const matchAssignee = task.assignee?.name?.toLowerCase().includes(query);
          const matchId = task.id?.toLowerCase().includes(query);

          if (!matchTitle && !matchDesc && !matchCategory && !matchAssignee && !matchId) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'due-asc') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        }
        if (sortBy === 'due-desc') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return b.dueDate.localeCompare(a.dueDate);
        }
        if (sortBy === 'priority-desc') {
          const pA = PRIORITY_CONFIG[a.priority]?.level || 0;
          const pB = PRIORITY_CONFIG[b.priority]?.level || 0;
          return pB - pA;
        }
        if (sortBy === 'priority-asc') {
          const pA = PRIORITY_CONFIG[a.priority]?.level || 0;
          const pB = PRIORITY_CONFIG[b.priority]?.level || 0;
          return pA - pB;
        }
        if (sortBy === 'created-desc') {
          return (b.createdAt || '').localeCompare(a.createdAt || '');
        }
        if (sortBy === 'title-asc') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [tasks, statusFilter, priorityFilter, categoryFilter, searchQuery, sortBy]);

  const hasActiveFilters =
    statusFilter !== 'all' ||
    priorityFilter !== 'all' ||
    categoryFilter !== 'all' ||
    searchQuery.trim() !== '';

  const clearAllFilters = useCallback(() => {
    setStatusFilter('all');
    setPriorityFilter('all');
    setCategoryFilter('all');
    setSearchQuery('');
  }, []);

  // CRUD Actions
  const createTask = useCallback((taskData) => {
    // Generate next ID
    const maxIdNum = tasks.reduce((max, t) => {
      const match = t.id.match(/\d+/);
      const num = match ? parseInt(match[0], 10) : 100;
      return num > max ? num : max;
    }, 100);

    const newTask = {
      ...taskData,
      id: `TASK-${maxIdNum + 1}`,
      createdAt: new Date().toISOString().split('T')[0],
      subtasks: taskData.subtasks || [],
    };

    setTasks((prev) => [newTask, ...prev]);
    addToast('Task Created', `"${newTask.title}" added to your workspace.`, 'success');
  }, [tasks, addToast]);

  const updateTask = useCallback((updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t))
    );

    // Also update detail modal if currently open
    setDetailsTask((current) =>
      current && current.id === updatedTask.id ? { ...current, ...updatedTask } : current
    );

    addToast('Task Updated', `Changes to "${updatedTask.title}" saved.`, 'info');
  }, [addToast]);

  const deleteTask = useCallback((taskId) => {
    const target = tasks.find((t) => t.id === taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));

    if (detailsTask && detailsTask.id === taskId) {
      setDetailsTask(null);
    }

    addToast('Task Deleted', target ? `"${target.title}" was removed.` : 'Task deleted.', 'warning');
  }, [tasks, detailsTask, addToast]);

  const updateTaskStatus = useCallback((taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updated = { ...t, status: newStatus };
          // If marked completed, mark all subtasks completed
          if (newStatus === 'completed' && updated.subtasks) {
            updated.subtasks = updated.subtasks.map((s) => ({ ...s, completed: true }));
          }
          return updated;
        }
        return t;
      })
    );

    // Update details modal if open
    setDetailsTask((curr) => {
      if (curr && curr.id === taskId) {
        return { ...curr, status: newStatus };
      }
      return curr;
    });

    addToast('Status Updated', `Task moved to ${newStatus}.`, 'info');
  }, [addToast]);

  const toggleComplete = useCallback((taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const willBeCompleted = t.status !== 'completed';
          const newStatus = willBeCompleted ? 'completed' : 'in-progress';
          const updatedSubtasks = (t.subtasks || []).map((s) => ({
            ...s,
            completed: willBeCompleted,
          }));

          addToast(
            willBeCompleted ? 'Task Completed' : 'Task Reopened',
            `"${t.title}" is now ${willBeCompleted ? 'completed' : 'in-progress'}.`,
            willBeCompleted ? 'success' : 'info'
          );

          const updated = {
            ...t,
            status: newStatus,
            subtasks: updatedSubtasks,
          };

          if (detailsTask && detailsTask.id === taskId) {
            setDetailsTask(updated);
          }

          return updated;
        }
        return t;
      })
    );
  }, [detailsTask, addToast]);

  const toggleSubtask = useCallback((taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedSubtasks = (t.subtasks || []).map((s) =>
            s.id === subtaskId ? { ...s, completed: !s.completed } : s
          );
          const allCompleted = updatedSubtasks.length > 0 && updatedSubtasks.every((s) => s.completed);

          const updated = {
            ...t,
            subtasks: updatedSubtasks,
            status: allCompleted ? 'completed' : t.status,
          };

          if (detailsTask && detailsTask.id === taskId) {
            setDetailsTask(updated);
          }

          return updated;
        }
        return t;
      })
    );
  }, [detailsTask]);

  const resetToMockData = useCallback(() => {
    setTasks(INITIAL_TASKS);
    clearAllFilters();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    addToast('Demo Data Reset', 'Workspace has been restored to default sample data.', 'info');
  }, [clearAllFilters, addToast]);

  // Modal open helpers
  const openCreateModal = (defaultStatus = 'todo') => {
    setModalState({
      isOpen: true,
      mode: 'create',
      task: null,
      defaultStatus,
    });
  };

  const openEditModal = (task) => {
    setModalState({
      isOpen: true,
      mode: 'edit',
      task,
      defaultStatus: task.status,
    });
  };

  const closeFormModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    tasks,
    filteredTasks,
    stats,
    categoryCounts,
    // Filters & views
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    hasActiveFilters,
    clearAllFilters,
    // CRUD
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    toggleComplete,
    toggleSubtask,
    resetToMockData,
    // Modals
    modalState,
    openCreateModal,
    openEditModal,
    closeFormModal,
    detailsTask,
    setDetailsTask,
    confirmDeleteId,
    setConfirmDeleteId,
    isConfirmResetOpen,
    setIsConfirmResetOpen,
    // Mobile navigation
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    // Theme
    isDarkMode,
    toggleDarkMode,
    // Toasts
    toasts,
    dismissToast,
  };
};
