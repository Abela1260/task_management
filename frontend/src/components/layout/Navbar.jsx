import React from 'react';
import { Button } from '../common/Button';
import { Avatar } from '../common/Avatar';
import {
  MenuIcon,
  PlusIcon,
  SunIcon,
  MoonIcon,
  RefreshIcon,
  BellIcon,
  SparklesIcon,
} from '../icons/Icons';
import { USERS } from '../../data/mockTasks';

export const Navbar = ({
  onOpenMobileMenu,
  onAddNewTask,
  isDarkMode,
  onToggleDarkMode,
  onResetData,
  stats,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Left: Mobile hamburger + Workspace info */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            aria-label="Open mobile menu"
          >
            <MenuIcon className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:flex p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <SparklesIcon className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">
                  Sprint Workspace
                </h1>
                <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Active Sprint
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                {stats.completed} of {stats.total} tasks completed ({stats.completionRate}%)
              </p>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Reset Mock Data Button */}
          <button
            type="button"
            onClick={onResetData}
            title="Reset to default mock data"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <RefreshIcon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Demo</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <SunIcon className="w-4 h-4 text-amber-400" />
            ) : (
              <MoonIcon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Notifications Indicator */}
          <div className="relative hidden sm:block">
            <button
              type="button"
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Notifications"
            >
              <BellIcon className="w-4 h-4" />
              {stats.overdue > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>
          </div>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          {/* New Task CTA */}
          <Button
            variant="primary"
            size="md"
            icon={PlusIcon}
            onClick={onAddNewTask}
            className="shadow-sm"
          >
            <span className="hidden xs:inline">New Task</span>
            <span className="xs:hidden">New</span>
          </Button>

          {/* Logged in User Avatar */}
          <div className="pl-1 hidden sm:block">
            <Avatar user={USERS[0]} size="md" />
          </div>
        </div>
      </div>
    </header>
  );
};
