// src/components/ui/Button.jsx
const variantStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-500 focus-visible:ring-blue-500",
  secondary:
    "bg-slate-700 text-slate-100 hover:bg-slate-600 focus-visible:ring-slate-400",
  danger: "bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-500",
};

export default function Button({ variant = "primary", children, ...props }) {
  return (
    <button
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
        variantStyles[variant] ?? ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
