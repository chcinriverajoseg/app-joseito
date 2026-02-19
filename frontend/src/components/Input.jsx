import React from 'react'
export default function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm font-medium">{label}</span>}
      <input
        className={`w-full rounded-2xl border px-3 py-2 outline-none transition focus:ring-2 focus:ring-indigo-500 bg-white/90 dark:bg-gray-800/60 border-gray-300 dark:border-gray-700 ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </label>
  )
}
