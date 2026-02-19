import React, { useEffect, useState } from 'react'
import { getMatchesApi } from '@/api/auth'
import Loader from '@/components/Loader'
import ErrorMessage from '@/components/ErrorMessage'
import { Link } from 'react-router-dom'

export default function MatchesPage() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getMatchesApi()
      .then(setMatches)
      .catch(() => setError('No se pudieron cargar los matches'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader label="Cargando matches..." />

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Tus Matches</h1>
      <ErrorMessage message={error} />
      {matches.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Aún no tienes matches.</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {matches.map((m) => {
            const id = m.chatId || m._id || m.partnerId
            return (
              <li key={id} className="rounded-2xl border p-4 bg-white dark:bg-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={m.profileImage || 'https://via.placeholder.com/64'} alt={m.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{m.name}</p>
                    {m.bio && <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">{m.bio}</p>}
                  </div>
                </div>
                <Link to={`/chat/${id}`} className="px-3 py-2 rounded-2xl bg-indigo-600 text-white text-sm">Chatear</Link>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
