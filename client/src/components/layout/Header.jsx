// src/components/layout/Header.jsx
import NotificationBell from "./NotificationBell.jsx";

export default function Header({ user, onMenuClick }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-slate-700 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none sm:hidden"
        >
          ☰
        </button>
        <span className="shrink-0 text-lg font-bold">ApplyIQ</span>
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <NotificationBell />
        {user ? (
          <span className="min-w-0 truncate text-sm font-medium">
            {user.name}
          </span>
        ) : (
          <span className="shrink-0 text-sm text-gray-400">Guest</span>
        )}
      </div>
    </header>
  );
}
