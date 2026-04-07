import React, { useEffect, useState } from 'react'
import { getConversationsApi } from '@/api/auth'
import Loader from '@/components/Loader'
import ErrorMessage from '@/components/ErrorMessage'
import { Link } from 'react-router-dom'


export default function ChatPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getConversationsApi()
      .then(setItems)
      .catch(() => setError('No se pudo cargar tus chats'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader label="Cargando chats..." />

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Tus chats</h1>
      <ErrorMessage message={error} />
      {items.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Aún no tienes conversaciones.</p>
      ) : (
        <ul className="divide-y rounded-2xl border bg-white dark:bg-gray-800">
          {items.map((c) => {
            const id = c.chatId || c.partnerId || c._id
            return (
              <li key={id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <img src={c.partner?.profileImage || 'https://via.placeholder.com/48'} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{c.partner?.name || 'Usuario'}</p>
                    {c.lastMessage && <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">{c.lastMessage.text}</p>}
                  </div>
                </div>
                <Link to={`/chat/${id}`} className="px-3 py-2 rounded-2xl bg-indigo-600 text-white text-sm">Abrir</Link>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
