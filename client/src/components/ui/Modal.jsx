// src/components/ui/Modal.jsx
export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 grid place-items-center bg-black/50 p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-xl border border-slate-700 bg-slate-800 p-6"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold text-white">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg px-2 py-1 text-gray-400 transition-colors hover:bg-slate-700 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
