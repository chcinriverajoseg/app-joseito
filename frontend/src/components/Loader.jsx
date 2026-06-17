import React from 'react'
export default function Loader({ label = 'Cargando...' }) {
  return (
    <div className="flex items-center gap-3 p-4">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  )
}

