// src/components/layout/NotificationBell.jsx
import { useState } from "react";
import { useSocket } from "../../context/SocketContext.jsx";

export default function NotificationBell() {
  const { notifications, unreadCount, markAllRead } = useSocket();
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((open) => !open);
    markAllRead();
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        className="relative rounded-lg p-1 text-gray-400 transition-colors hover:bg-slate-700 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-lg border border-slate-700 bg-slate-800 p-2 shadow-lg">
          {notifications.length === 0 ? (
            <p className="px-2 py-3 text-sm text-gray-400">No notifications yet.</p>
          ) : (
            <ul className="flex flex-col gap-1">
              {notifications.map((notification) => (
                <li
                  key={`${notification.id}-${notification.at}`}
                  className="rounded px-2 py-2 text-sm hover:bg-slate-700"
                >
                  <p className="text-white">
                    Moved to <span className="font-semibold">{notification.status}</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(notification.at).toLocaleTimeString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
