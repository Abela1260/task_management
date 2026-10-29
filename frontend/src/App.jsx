import React, { useState } from 'react';
import { useTaskManager } from './hooks/useTaskManager';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { StatCards } from './components/dashboard/StatCards';
import { AnalyticsOverview } from './components/dashboard/AnalyticsOverview';
import { TaskFilterBar } from './components/tasks/TaskFilterBar';
import { TaskBoard } from './components/tasks/TaskBoard';
import { TaskList } from './components/tasks/TaskList';
import { TaskFormModal } from './components/tasks/TaskFormModal';
import { TaskDetailsModal } from './components/tasks/TaskDetailsModal';
import { ConfirmModal } from './components/tasks/ConfirmModal';
import { Toast } from './components/common/Toast';
import { EmptyState } from './components/common/EmptyState';
import { ChevronDownIcon } from './components/icons/Icons';
import './App.css';

function App() {
  const {
    filteredTasks,
    stats,
    categoryCounts,
    // Filter controls
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
    // Operations
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
    // Layout & Theme
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isDarkMode,
    toggleDarkMode,
    // Toasts
    toasts,
    dismissToast,
  } = useTaskManager();

  const [showAnalytics, setShowAnalytics] = useState(true);

  // Quick stat filter handler
  const handleStatCardClick = (filterId) => {
    if (statusFilter === filterId) {
      setStatusFilter('all');
    } else {
      setStatusFilter(filterId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onAddNewTask={() => openCreateModal('todo')}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onResetData={() => setIsConfirmResetOpen(true)}
        stats={stats}
      />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <Sidebar
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          stats={stats}
          categoryCounts={categoryCounts}
          className="hidden lg:flex"
        />

        {/* Mobile Navigation Drawer */}
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          stats={stats}
          categoryCounts={categoryCounts}
        />

        {/* Main Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header Banner & Analytics Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                  Sprint Overview & Board
                </h2>
                {categoryFilter !== 'all' && (
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    Category: {categoryFilter}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Manage, prioritize, and track sprint deliverables in real-time.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAnalytics(!showAnalytics)}
              className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
            >
              <span>{showAnalytics ? 'Hide Analytics' : 'Show Analytics'}</span>
              <ChevronDownIcon
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  showAnalytics ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Interactive Stat Cards */}
          <section aria-label="Task Statistics">
            <StatCards
              stats={stats}
              activeFilter={statusFilter}
              onSelectFilter={handleStatCardClick}
            />
          </section>

          {/* Collapsible Analytics Overview */}
          {showAnalytics && (
            <section aria-label="Analytics Overview" className="animate-fade-in">
              <AnalyticsOverview stats={stats} />
            </section>
          )}

          {/* Task Filtering & Controls Bar */}
          <section aria-label="Task Filters">
            <TaskFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityChange={setPriorityFilter}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              stats={stats}
              onClearFilters={clearAllFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </section>

          {/* Task Board / List Content */}
          <section aria-label="Task Management View" className="pb-12">
            {filteredTasks.length === 0 ? (
              <EmptyState
                title="No tasks match your criteria"
                description="We couldn't find any tasks matching your current search query or filter options."
                actionLabel="Create New Task"
                onAction={() => openCreateModal(statusFilter === 'all' ? 'todo' : statusFilter)}
                secondaryActionLabel={hasActiveFilters ? 'Clear All Filters' : undefined}
                onSecondaryAction={hasActiveFilters ? clearAllFilters : undefined}
              />
            ) : viewMode === 'board' ? (
              <TaskBoard
                tasks={filteredTasks}
                onEditTask={openEditModal}
                onDeleteTask={(id) => setConfirmDeleteId(id)}
                onToggleComplete={toggleComplete}
                onStatusChange={updateTaskStatus}
                onTaskClick={(task) => setDetailsTask(task)}
                onAddNewWithStatus={(status) => openCreateModal(status)}
              />
            ) : (
              <TaskList
                tasks={filteredTasks}
                onEditTask={openEditModal}
                onDeleteTask={(id) => setConfirmDeleteId(id)}
                onToggleComplete={toggleComplete}
                onStatusChange={updateTaskStatus}
                onTaskClick={(task) => setDetailsTask(task)}
                onAddNew={() => openCreateModal('todo')}
                onClearFilters={clearAllFilters}
                hasActiveFilters={hasActiveFilters}
              />
            )}
          </section>
        </main>
      </div>

      {/* Task Form Modal (Add or Edit) */}
      <TaskFormModal
        isOpen={modalState.isOpen}
        onClose={closeFormModal}
        onSubmit={(taskData) => {
          if (modalState.mode === 'create') {
            createTask(taskData);
          } else {
            updateTask(taskData);
          }
        }}
        initialData={modalState.task}
        defaultStatus={modalState.defaultStatus}
      />

      {/* Task Details Drawer/Modal */}
      <TaskDetailsModal
        isOpen={!!detailsTask}
        task={detailsTask}
        onClose={() => setDetailsTask(null)}
        onEdit={(task) => openEditModal(task)}
        onDelete={(id) => setConfirmDeleteId(id)}
        onToggleComplete={toggleComplete}
        onStatusChange={updateTaskStatus}
        onToggleSubtask={toggleSubtask}
      />

      {/* Confirm Task Deletion Modal */}
      <ConfirmModal
        isOpen={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => {
          if (confirmDeleteId) deleteTask(confirmDeleteId);
        }}
        title="Delete this task?"
        message="This task will be permanently removed from your workspace. This action cannot be undone."
        confirmLabel="Yes, Delete"
        variant="danger"
      />

      {/* Confirm Reset Demo Data Modal */}
      <ConfirmModal
        isOpen={isConfirmResetOpen}
        onClose={() => setIsConfirmResetOpen(false)}
        onConfirm={resetToMockData}
        title="Reset to Sample Demo Data?"
        message="This will reset all tasks, categories, and checklist items back to the original sample dataset."
        confirmLabel="Reset Data"
        variant="primary"
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
