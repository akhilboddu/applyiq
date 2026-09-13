// src/components/ui/StatCard.jsx
import Badge from "./Badge.jsx";

export default function StatCard({ label, value, trend }) {
  const tone = trend === 0 ? "neutral" : trend > 0 ? "positive" : "negative";
  const arrow = trend === 0 ? "—" : trend > 0 ? "▲" : "▼";

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-1 text-3xl font-bold text-white">
        {value.toLocaleString()}
      </p>
      {typeof trend === "number" && (
        <div className="mt-3">
          <Badge tone={tone}>
            {arrow} {Math.abs(trend)}%
          </Badge>
        </div>
      )}
    </div>
  );
}
