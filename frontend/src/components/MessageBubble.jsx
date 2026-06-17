
import React from 'react'
export default function MessageBubble({ me, text, time }) {
  return (
    <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${me ? 'ml-auto bg-indigo-600 text-white' : 'mr-auto bg-gray-200 dark:bg-gray-700 dark:text-gray-100'}`}>
      <p>{text}</p>
      {time && <span className="mt-1 block text-[10px] opacity-75">{new Date(time).toLocaleTimeString()}</span>}
    </div>
  )
}
