// src/components/applications/WeeklyChart.jsx
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

export default function WeeklyChart({ data }) {
  return (
    <div className="h-72 w-full rounded-xl border border-slate-700 bg-slate-800 p-5">
      <p className="mb-4 text-sm text-gray-400">Applications per week</p>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <XAxis dataKey="week" stroke="#9ca3af" fontSize={12} />
          <YAxis allowDecimals={false} stroke="#9ca3af" fontSize={12} />
          <Tooltip
            cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "0.5rem",
              color: "#f8fafc",
            }}
          />
          <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
