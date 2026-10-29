import React from 'react';

export const Avatar = ({ user, size = 'md', showName = false, className = '' }) => {
  if (!user) return null;

  const sizeClasses = {
    xs: 'w-5 h-5 text-[10px]',
    sm: 'w-6 h-6 text-xs',
    md: 'w-7 h-7 text-xs',
    lg: 'w-9 h-9 text-sm font-semibold',
  }[size] || 'w-7 h-7 text-xs';

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div
        title={`${user.name} (${user.role})`}
        className={`${sizeClasses} ${user.color || 'bg-indigo-600'} rounded-full text-white flex items-center justify-center font-medium shadow-sm ring-2 ring-white dark:ring-slate-900 select-none flex-shrink-0`}
      >
        {user.avatar || user.name.slice(0, 2).toUpperCase()}
      </div>
      {showName && (
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate leading-tight">
            {user.name}
          </span>
          {user.role && (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-tight">
              {user.role}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const AvatarGroup = ({ users = [], max = 3, size = 'sm' }) => {
  const visibleUsers = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="flex items-center -space-x-1.5 overflow-hidden">
      {visibleUsers.map((u, i) => (
        <Avatar key={u.id || i} user={u} size={size} />
      ))}
      {remaining > 0 && (
        <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-semibold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
          +{remaining}
        </div>
      )}
    </div>
  );
};
