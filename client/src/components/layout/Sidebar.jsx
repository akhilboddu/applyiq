// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/applications", label: "Applications" },
  { to: "/kanban", label: "Kanban" },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 min-h-screen w-56 shrink-0 border-r border-slate-700 bg-slate-800 p-4 transition-transform sm:static sm:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <p className="px-3 pb-4 text-lg font-bold text-white">ApplyIQ</p>

        <nav className="grid gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive
                    ? "bg-slate-700 text-white"
                    : "text-gray-400 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
