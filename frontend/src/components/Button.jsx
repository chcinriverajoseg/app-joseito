import React from 'react'
export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-600 text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

