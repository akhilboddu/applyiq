// src/components/ui/Input.jsx
export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  options = [],
}) {
  const control = "rounded border px-3 py-2";
  const border = error ? "border-red-500" : "border-gray-200";

  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>

      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`${control} ${border}`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          className={`${control} ${border}`}
        />
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </label>
  );
}
