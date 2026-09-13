// src/components/ui/Badge.jsx
const statusStyles = {
  Saved: "bg-slate-500/20 text-slate-400",
  Applied: "bg-blue-500/20 text-blue-400",
  Screening: "bg-yellow-500/20 text-yellow-400",
  Interview: "bg-purple-500/20 text-purple-400",
  Offer: "bg-green-500/20 text-green-400",
  Rejected: "bg-red-500/20 text-red-400",
  Technical: "bg-indigo-500/20 text-indigo-400",
};

const toneStyles = {
  positive: "bg-green-500/20 text-green-400",
  negative: "bg-red-500/20 text-red-400",
  neutral: "bg-slate-500/20 text-slate-400",
};

export default function Badge({ status, tone, children }) {
  const styles = tone ? toneStyles[tone] : statusStyles[status];
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
        styles ?? ""
      }`}
    >
      {children ?? status}
    </span>
  );
}
