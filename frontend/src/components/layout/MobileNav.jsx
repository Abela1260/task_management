import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { XMarkIcon } from '../icons/Icons';

export const MobileNav = ({
  isOpen,
  onClose,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  stats,
  categoryCounts,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Sidebar Drawer */}
      <div className="relative flex flex-col w-72 max-w-[85vw] h-full bg-white dark:bg-slate-900 shadow-2xl z-10 animate-fade-in">
        {/* Mobile Close Button */}
        <div className="absolute top-4 right-3 z-20">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <Sidebar
          statusFilter={statusFilter}
          onStatusChange={(status) => {
            onStatusChange(status);
            onClose();
          }}
          categoryFilter={categoryFilter}
          onCategoryChange={(cat) => {
            onCategoryChange(cat);
            onClose();
          }}
          stats={stats}
          categoryCounts={categoryCounts}
          className="w-full border-r-0"
        />
      </div>
    </div>
  );
};
