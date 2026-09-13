// src/components/applications/ApplicationCard.jsx
import Badge from "../ui/Badge.jsx";

export default function ApplicationCard({ app }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-600 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <h2 className="min-w-0 truncate text-base font-semibold text-white">
          {app.companyName}
        </h2>
        <Badge status={app.status} />
      </div>

      <p className="mt-1 text-sm text-gray-300">{app.role}</p>

      {app.location && (
        <p className="mt-3 text-sm text-gray-400">{app.location}</p>
      )}

      <p className="mt-4 border-t border-slate-700 pt-3 text-xs text-gray-500">
        Applied {new Date(app.appliedDate).toLocaleDateString()}
      </p>
    </div>
  );
}
