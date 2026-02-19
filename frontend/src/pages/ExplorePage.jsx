import React, { useEffect, useState } from 'react'
import { getExploreUsersApi, likeUserApi } from '@/api/auth'
import Loader from '@/components/Loader'
import UserCard from '@/components/UserCard'
import ErrorMessage from '@/components/ErrorMessage'

export default function ExplorePage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getExploreUsersApi()
      .then(setUsers)
      .catch(() => setError('No se pudo cargar la lista'))
      .finally(() => setLoading(false))
  }, [])

  const handleLike = async (id) => {
    try {
      await likeUserApi(id)
      setUsers((arr) => arr.filter((u) => u._id !== id))
    } catch (e) {
      setError('No se pudo enviar el like')
    }
  }

  if (loading) return <Loader label="Cargando perfiles..." />

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Explorar</h1>
      <ErrorMessage message={error} />
      {users.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No hay más usuarios por ahora.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((u) => (
            <UserCard key={u._id} user={u} onLike={handleLike} />
          ))}
        </div>
      )}
    </section>
  )
}
