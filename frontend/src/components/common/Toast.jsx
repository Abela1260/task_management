import React from 'react';
import { CheckCircleIcon, AlertCircleIcon, XMarkIcon, AlertTriangleIcon } from '../icons/Icons';

export const Toast = ({ toasts = [], onDismiss }) => {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircleIcon className="w-5 h-5 text-emerald-500" />,
          error: <AlertCircleIcon className="w-5 h-5 text-rose-500" />,
          warning: <AlertTriangleIcon className="w-5 h-5 text-amber-500" />,
          info: <CheckCircleIcon className="w-5 h-5 text-indigo-500" />,
        };

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between p-3.5 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 animate-fade-in"
          >
            <div className="flex items-center gap-3">
              {icons[toast.type] || icons.info}
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                  {toast.title}
                </p>
                {toast.message && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {toast.message}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
