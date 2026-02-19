import React from 'react'
export default function ErrorMessage({ message }) {
  if (!message) return null
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">
      {message}
    </div>
  )
}
