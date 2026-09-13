// src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="border-t border-slate-700 px-6 py-4">
      <p className="text-sm text-gray-400">
        &copy; {new Date().getFullYear()} ApplyIQ. All rights reserved.
      </p>
    </footer>
  );
}
